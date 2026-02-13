import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";
import { resolveValueAtCompositionEnd } from "../ime";

describe("resolveValueAtCompositionEnd", () => {
  it("reconstructs value from pre-composition snapshot and composition data", () => {
    deepStrictEqual(
      resolveValueAtCompositionEnd({
        currentValue: "r'e'a'dread",
        compositionData: "read",
        snapshot: { value: "", selectionStart: 0, selectionEnd: 0 },
      }),
      "read"
    );
  });

  it("replaces selected range captured at composition start", () => {
    deepStrictEqual(
      resolveValueAtCompositionEnd({
        currentValue: "ignored",
        compositionData: "tag",
        snapshot: { value: "my-old-value", selectionStart: 3, selectionEnd: 6 },
      }),
      "my-tag-value"
    );
  });

  it("keeps current value when composition data is empty", () => {
    deepStrictEqual(
      resolveValueAtCompositionEnd({
        currentValue: "project-read",
        compositionData: "",
        snapshot: { value: "project-", selectionStart: 8, selectionEnd: 8 },
      }),
      "project-read"
    );
  });

  it("keeps current value when snapshot is missing", () => {
    deepStrictEqual(
      resolveValueAtCompositionEnd({
        currentValue: "project-read",
        compositionData: "read",
        snapshot: null,
      }),
      "project-read"
    );
  });
});
