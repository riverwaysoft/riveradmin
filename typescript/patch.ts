export type Patch<T, K> = Omit<T, keyof K> & K;
