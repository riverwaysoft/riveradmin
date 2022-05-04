// Extracts only numeric values from an Enum
// See tests for details
export const enumValues = <T>(e: T): T[keyof T][] => {
  return Object.values(e).filter((value) => typeof value === 'number');
};

export const enumStringValues = <T>(e: T): T[keyof T][] => {
  return Object.values(e);
};
