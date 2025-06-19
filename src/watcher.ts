import chokidar from "chokidar";
import { broadcastReload, broadcastCSSReload } from "./server";
import { LivelyOptions } from "./types";
import path from "path";

export function startWatcher(options: LivelyOptions) {
  const watcher = chokidar.watch(options.watch, {
    ignored: options.ignore || undefined,
    ignoreInitial: true,
    cwd: options.root,
  });

  watcher.on("raw", (event, file, details) => {
    const ext = path.extname(file);
    console.log(`[watcher] Event: ${event}, File: ${file}`);

    if (event === "change") {
      if (ext === ".css" && options.cssInject) {
        broadcastCSSReload();
      } else {
        broadcastReload();
      }
    } else if (event === "rename" || event === "unlink" || event === "add") {
      broadcastReload();
    }
  });
}
