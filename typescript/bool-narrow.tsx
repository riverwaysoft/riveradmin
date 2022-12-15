// Allows to narrow function's return type by using user-defined type guard
export const boolNarrow = <T extends any>(arg?: T | null): arg is T => !!arg;
