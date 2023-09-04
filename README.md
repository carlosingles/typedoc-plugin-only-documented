# typedoc-plugin-only-documented

A plugin for [TypeDoc](https://github.com/TypeStrong/typedoc) that enables an opt-in approach for generating documentation by adding a `@documented` modifier and only including symbols that have this modifier.

## Installation

```bash
npm i -D typedoc-plugin-only-documented
```

## Example

```ts
/**
 * This function has been @documented and will be in the output.
 * @documented
 */
export function foo(): number {
  return 123;
}

/**
 * This type has not been @documented and will not be in the output
 */
export type PrivateType = {
  value: number;
};
```
