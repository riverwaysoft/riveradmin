export function assertValidBuildTarget<T extends object>(
  param: unknown,
  environments: T
): asserts param is keyof T {
  if (typeof param !== 'string' || !Object.keys(environments).includes(param)) {
    throw new Error(
      `You should specify build target. Valid values: ${Object.keys(environments).join(', ')}`
    );
  }
}
