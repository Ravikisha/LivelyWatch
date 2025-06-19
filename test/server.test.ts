import { startServer } from "../src/server";
import { afterAll, beforeAll, test, expect } from "vitest";
import http from "http";
import fs from "fs";
import path from "path";

const TEST_PORT = 4567;
const ROOT = path.join(__dirname, "fixtures");

let server: http.Server;

beforeAll(() => {
  startServer({
    port: TEST_PORT,
    root: ROOT,
    host: "localhost",
    open: false,
    https: false,
    spa: false,
    watch: ["**/*"],
    cssInject: false
  } as any);
});

afterAll(() => {
  
});

test("serves static HTML files", async () => {
  const res = await fetch(`http://localhost:${TEST_PORT}/index.html`);
  const text = await res.text();
  expect(text).toMatch(/<html>/);
});
