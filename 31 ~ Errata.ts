// During the lecture, I told that generics were distributive with regards to union types. This is wrong.
// It is in fact conditional types that are distributive with regards to union types:
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types.
//
// Generics are NOT necessarily distributive, e.g. Array<number | string> is not the same as Array<number> | Array<string>.
//
// Another example can be found below:
// (Source: https://stackoverflow.com/questions/62084836/what-does-it-mean-for-a-type-to-distribute-over-unions)
type Fruit =
  | { species: "banana"; curvature: number }
  | { species: "apple"; color: string }

/* Non distributive */
type KeysNonDistributive<T> = keyof T
// type FruitKeysNonDistributive = "species"
type FruitKeysNonDistributive = KeysNonDistributive<Fruit>

type KeysDistributive<T> = T extends any ? keyof T : never
// type FruitKeysDistributive = "species" | "curvature" | "color"
type FruitKeysDistributive = KeysDistributive<Fruit>
