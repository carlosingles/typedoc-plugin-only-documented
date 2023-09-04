import { FooType, foo } from './documentedFunction';

export function usesFoo(): FooType {
  return foo();
}