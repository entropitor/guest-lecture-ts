type ValueOfArray<T> = T extends Array<infer Value> ? Value : never

type A = ValueOfArray<Array<number>>
type B = ValueOfArray<Array<number | string>>
type C = ValueOfArray<Array<number> | Array<string>>
type D = ValueOfArray<string>
type E = ValueOfArray<Array<number> | string>

/*
 *
 *
 *
 */

type SafeValueOfArray<T extends Array<any>> = T extends Array<infer Value>
  ? Value
  : never

type F = SafeValueOfArray<Array<number>>
type G = SafeValueOfArray<Array<number | string>>
type H = SafeValueOfArray<Array<number> | Array<string>>
type I = SafeValueOfArray<string>
type J = SafeValueOfArray<Array<number> | string>

/*
 *
 *
 *
 */

type FooOf<T> = T extends { foo: infer S } ? S : never
type Foo = FooOf<{ foo: number }>
