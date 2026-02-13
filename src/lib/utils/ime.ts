export type CompositionSnapshot = {
  value: string;
  selectionStart: number;
  selectionEnd: number;
};

export function getCompositionSnapshot(input: HTMLInputElement): CompositionSnapshot {
  const selectionStart = input.selectionStart ?? input.value.length;
  const selectionEnd = input.selectionEnd ?? input.value.length;

  return {
    value: input.value,
    selectionStart,
    selectionEnd,
  };
}

export function resolveValueAtCompositionEnd({
  currentValue,
  compositionData,
  snapshot,
}: {
  currentValue: string;
  compositionData: string;
  snapshot: CompositionSnapshot | null;
}) {
  if (!snapshot) {
    return currentValue;
  }

  if (compositionData.length === 0) {
    return currentValue;
  }

  const { value, selectionStart, selectionEnd } = snapshot;
  if (selectionStart < 0 || selectionEnd < selectionStart || selectionEnd > value.length) {
    return currentValue;
  }

  return `${value.slice(0, selectionStart)}${compositionData}${value.slice(selectionEnd)}`;
}
