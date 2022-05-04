// Should be used only for debugging purposes to see the real structure of a type
export type Dump<T> = {} & { [P in keyof T]: T[P] };
