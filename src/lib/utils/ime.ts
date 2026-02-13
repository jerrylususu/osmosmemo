export function normalizeTagInputAfterComposition(inputValue: string, valueBeforeComposition: string) {
  if (!inputValue.startsWith(valueBeforeComposition)) {
    return inputValue;
  }

  const compositionChunk = inputValue.slice(valueBeforeComposition.length);
  const segmentedAndPlainMatch = compositionChunk.match(/^([a-z](?:['’][a-z])+)([a-z]+)$/i);

  if (segmentedAndPlainMatch) {
    const [, segmented, plain] = segmentedAndPlainMatch;
    if (segmented.replace(/['’]/g, "").toLocaleLowerCase() === plain.toLocaleLowerCase()) {
      return `${valueBeforeComposition}${plain}`;
    }
  }

  const segmentedOnlyMatch = compositionChunk.match(/^[a-z](?:['’][a-z])+$/i);
  if (segmentedOnlyMatch) {
    return `${valueBeforeComposition}${compositionChunk.replace(/['’]/g, "")}`;
  }

  return inputValue;
}
