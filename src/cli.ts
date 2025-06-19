#!/usr/bin/env node
import { Command } from "commander";
import { startServer } from "./server";

const program = new Command();

program
  .name("lively")
  .description("A live-reloading development server")
  .version("1.0.0")
  .option("-p, --port <number>", "Port to run the server on", "3000")
  .option("--host <host>", "Host to bind", "localhost")
  .option("-o, --open", "Open the browser automatically", false)
  .option("-d, --dir <path>", "Directory to serve", process.cwd())
  .option("--no-css-inject", "Disable CSS hot-reload injection", false)
  .option("--watch <glob>", "Glob pattern to watch", "**/*")
  .option("--ignore <glob>", "Glob pattern to ignore", "")
  .option("--spa", "Enable SPA fallback to index.html", false)
  .option("--entry-file <file>", "Fallback file for SPA routing", "index.html")
  .option("--https", "Enable HTTPS", false)
  .option("--cert <path>", "Path to SSL certificate", "")
  .option("--key <path>", "Path to SSL key", "")
  .option(
    "--proxy <route:target...>",
    "Define proxy routes in format /api:http://localhost:5000",
    (val, acc: string[] = []) => acc.concat([val]),
    []
  )
  .parse(process.argv);

const options = program.opts();

const proxyRoutes: Record<string, string> = {};
for (const rule of options.proxy) {
  const [route, target] = rule.split(":");
  if (route && target) proxyRoutes[route] = target;
}
options.proxy = proxyRoutes;

startServer({
  port: parseInt(options.port, 10),
  host: options.host,
  open: options.open,
  root: options.dir,
  watch: options.watch,
  ignore: options.ignore,
  spa: options.spa,
  entryFile: options.entryFile,
  cssInject: options.cssInject,
  https: options.https,
  cert: options.cert || "",
  key: options.key || "",
  proxy: options.proxy,
});
