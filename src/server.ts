import connect from "connect";
import serveStatic from "serve-static";
import http from "http";
import https from "https";
import path from "path";
import fs from "fs";
import open from "open";
import { WebSocketServer } from "ws";
import type { WebSocket } from "ws";
import { createProxyMiddleware } from "http-proxy-middleware";

import { injectReloadScript } from "./injector";
import { startWatcher } from "./watcher";
import { LivelyOptions } from "./types";

let sockets: WebSocket[] = [];

let server: http.Server | https.Server;

export function startServer(options: LivelyOptions) {
  const app = connect();
  const { https: useHttps, cert, key } = options;

  // 1. Inject reload script middleware BEFORE static serve
  app.use((req, res, next) => {
    console.log(`[injector] Processing request: ${req.url}`);
    const ext = path.extname(req.url || "").toLowerCase();
    if (ext === ".html" || ext === ".svg") {
      const filePath = path.join(options.root, req.url || "/");
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        let content = fs.readFileSync(filePath, "utf-8");
        const modified = injectReloadScript(content);
        res.setHeader(
          "Content-Type",
          ext === ".svg" ? "image/svg+xml" : "text/html"
        );
        res.end(modified);
        return;
      }
    }
    next();
  });

  // 2. Setup proxy routes (if any)
  if (options.proxy && Object.keys(options.proxy).length > 0) {
    for (const [route, target] of Object.entries(options.proxy)) {
      console.log(`[proxy] ${route} → ${target}`);
      app.use(
        route,
        createProxyMiddleware({
          target,
          changeOrigin: true
        })
      );
    }
  }

  // 3. Serve static content
  app.use(serveStatic(options.root));

  // 4. SPA fallback
  if (options.spa) {
    app.use((req, res) => {
      const fallbackPath = path.join(options.root, options.entryFile);
      if (fs.existsSync(fallbackPath)) {
        let content = fs.readFileSync(fallbackPath, "utf-8");
        const modified = injectReloadScript(content);
        res.setHeader("Content-Type", "text/html");
        res.end(modified);
      } else {
        res.statusCode = 404;
        res.end("SPA entry file not found.");
      }
    });
  }

  // 5. HTTP or HTTPS server
  if (useHttps) {
    const sslOptions: https.ServerOptions = {
      cert: fs.readFileSync(cert || path.join(__dirname, "default-cert.pem")),
      key: fs.readFileSync(key || path.join(__dirname, "default-key.pem")),
    };
    server = https.createServer(sslOptions, app);
  } else {
    server = http.createServer(app);
  }

  // 6. WebSocket server
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("[WebSocket] New client connected");
    sockets.push(ws);
    ws.on("close", () => {
      sockets = sockets.filter((s) => s !== ws);
    });
    ws.on("error", (error) => {
      console.error("[WebSocket] Error:", error);
    });
  });

  // 7. Start server + file watcher
  server.listen(options.port, options.host, () => {
    const protocol = useHttps ? "https" : "http";
    console.log(`Lively running at ${protocol}://${options.host}:${options.port}`);
    if (options.open) open(`${protocol}://${options.host}:${options.port}/index.html`);
    startWatcher(options);
  });

  // 8. Export reload function for watcher
  exportReloadBroadcaster(() => {
    for (const ws of sockets) {
      if (ws.readyState === ws.OPEN) {
        ws.send("reload");
      }
    }
  });
}

let reloadCallback: () => void;

function exportReloadBroadcaster(fn: () => void) {
  reloadCallback = fn;
}

export function broadcastReload() {
  reloadCallback?.();
}

export function broadcastCSSReload() {
  for (const ws of sockets) {
    if (ws.readyState === ws.OPEN) {
      ws.send("reload-css");
    }
  }
}


export function getServerSockets() {
  return sockets;
}

export function stopServer() {
  return new Promise<void>((resolve, reject) => {
    if (sockets.length > 0) {
      sockets.forEach((ws) => ws.close());
      sockets = [];
    }
    server.close((err) => {
      if (err) return reject(err);
      console.log("Server stopped.");
      resolve();
    });
  });
}