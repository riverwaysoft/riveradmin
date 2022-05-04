// Converts form type to form errors type
// In the new type keys are taken from the form type, values are string error messages
// See tests for details
export type FormErrors<T> = Partial<Record<keyof T, string>>;
