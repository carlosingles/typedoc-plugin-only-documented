/**
 * This function has been documented and should be in the output.
 * @documented
 */
export function foo(): FooType {
  return { someMap: '123', description: 123 };
}

/**
 * This type has not been documented and should not be in the output
 */
type PrivateType = {
  description: number;
};

/**
 * A documented type
 * @documented
 */
export type FooType = {
  someMap: string;
  description: number;
};