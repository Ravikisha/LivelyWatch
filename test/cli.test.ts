import { program } from "../src/cli";
import { test, expect } from "vitest";

test("CLI accepts --port", async () => {
  const opts = program.parse(["node","dist/cli.js", "--port", "9999"])
  expect(opts.opts().port).toBe("9999");
});
