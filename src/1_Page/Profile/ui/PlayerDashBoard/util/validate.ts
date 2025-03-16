export const hasChanges = (
  original: Record<string, unknown>,
  updated: Record<string, unknown>
): boolean => {
  return JSON.stringify(original) !== JSON.stringify(updated);
};
