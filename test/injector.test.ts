import { injectReloadScript } from "../src/injector";
import { expect, test } from "vitest";

const html = `
<!DOCTYPE html>
<html>
<head><title>Test</title></head>
<body><h1>Hello</h1></body>
</html>
`;

test("injects websocket reload script into HTML", () => {
  const result = injectReloadScript(html);
  expect(result).toMatch(/new WebSocket/);
  expect(result).toContain("</body>");
});
