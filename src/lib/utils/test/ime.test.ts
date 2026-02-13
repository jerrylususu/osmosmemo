import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";
import { normalizeTagInputAfterComposition } from "../ime";

describe("normalizeTagInputAfterComposition", () => {
  it("normalizes segmented + duplicated plain text produced by ime mode switching", () => {
    deepStrictEqual(normalizeTagInputAfterComposition("r'e'a'dread", ""), "read");
  });

  it("normalizes segmented composition chunk", () => {
    deepStrictEqual(normalizeTagInputAfterComposition("project-r'e'a'd", "project-"), "project-read");
  });

  it("keeps unrelated values unchanged", () => {
    deepStrictEqual(normalizeTagInputAfterComposition("project-read", "project-"), "project-read");
  });
});
