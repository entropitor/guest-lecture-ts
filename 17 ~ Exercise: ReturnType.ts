// Let's implement "ReturnType"
const foo = () => 42

type ReturnTypeOf<T> = any

// This should equal "number"
type FooReturn = ReturnTypeOf<typeof foo>
// @ts-expect-error This should throw a type error
type HelloWorldReturn = ReturnTypeOf<"hello world">
