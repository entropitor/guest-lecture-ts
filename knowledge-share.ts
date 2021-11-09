namespace ConditionalTypes {
  type EnvDependantConfig<Env> = Env extends "production" | "staging"
    ? {
        mainUrl: string
      }
    : {
        mainUrl: string
        someLocalhostConfig: number
      }

  type GetUserId = <U extends DiscriminatedUnion.UserUnion>(
    user: U
  ) => U["type"] extends "LoggedIn" ? number : undefined

  type User = BasicTypes.UserRecord

  type UserSerialized = {
    [key in keyof User]: User[key] extends Date ? string : User[key]
  }

  type UserSerializedAdvanced = {
    [key in keyof User]: User[key] extends Date
      ? string
      : User[key] extends boolean
      ? "true" | "false"
      : User[key]
  }

  type MainIngredients = {
    [Day in keyof Menu]: Menu[Day] extends `${infer T} and ${string}`
      ? T
      : never
  }
}

namespace Infer {
  type PromiseOf<T> = T extends Promise<infer S> ? S : never
  type PromiseOfSafe<T extends Promise<any>> = T extends Promise<infer S>
    ? S
    : never

  type FooOf<A> = A extends { foo: infer S } ? S : never
  type Foo = FooOf<{ foo: number }>
}

namespace TemplateLiterals {
  type Color = "red" | "green" | "blue"
  type BorderStyle = "solid" | "dashed"
  type Border = `1px ${BorderStyle} ${Color}`

  type ColorFromBorder<MyBorder> =
    MyBorder extends `1px ${infer BorderStyle} ${infer Color}` ? Color : never
}
namespace ReturnType {
  // Let's implement "ReturnType"
  const foo = () => 42
  type CustomReturnType<T> = any
  type FooReturn = CustomReturnType<typeof foo>
  namespace solution {
    type CustomReturnType<T extends (...args: any[]) => any> = T extends (
      ...args: any[]
    ) => infer R
      ? R
      : never
    type FooReturn = CustomReturnType<typeof foo>
  }
}
namespace DiscriminatedUnionConstructors {
  // Constructor functions for Discriminated Unions can give positional arugments when constructing, avoiding boilerplate
  // However, this would require boilerplate on the type level. Not after this Knowledge share!
  type Required_FooResult =
    | {
        type: "GotSomeFoos"
        value: {
          nbFoos: number
        }
      }
    | {
        error: string
        type: "GotAnError"
      }
  // Example constructors
  const FooResult = {
    error: (error: string) => ({ error, type: "GotAnError" }),
    ok: (value: { nbFoos: number }) => ({ type: "GotSomeFoos", value }),
  }
  // TODO!
  type DiscriminatedUnionOf<T> = any
  type FooResult = DiscriminatedUnionOf<typeof FooResult>
  namespace solution {
    type DiscriminatedUnionOf<
      T extends {
        [key: string]: (...args: any[]) => any
      }
    > = {
      [method in keyof T]: ReturnType<T[method]>
    }[keyof T]
    type FooResult = DiscriminatedUnionOf<typeof FooResult>
    // Make sure to also add the 'as const' to the FooResult object
  }
}
namespace UrlParts {
  // Imagine an string 'api/workspaces/:workspaceId/:publicationId'
  // retrieve all url params (starting with ':') from that string...
  // ... on the type level!
  type MyUrl = "api/workspaces/:workspaceId/:publicationId"
  type Parts<Url> = any
  type MyParts = Parts<MyUrl>
  type Params<Parts> = any
  type MyParams = Params<MyParts>
  type ParamsObject<Url> = any
  type MyParamsObject = ParamsObject<MyUrl>
  namespace solution {
    type Parts<Url> = Url extends `${infer Head}/${infer Tail}`
      ? [Head, ...Parts<Tail>]
      : [Url]
    type MyParts = Parts<MyUrl>

    type Params<Parts extends string[]> = {
      [index in keyof Parts]: Parts[index] extends `:${infer ParamName}`
        ? ParamName
        : never
    }[number]
    type MyParams = Params<MyParts>

    type ParamsObject<Url extends string> = {
      [Param in Params<Parts<Url>>]: string
    }
    type MyParamsObject = ParamsObject<MyUrl>
  }
}

// Make sure to cover the distribution of generic function application
type Weight = InKiloGrams | InPounds
type Weight2 = NumberInUnit<"kilogram" | "pound">
type Weight3 = NumberInUnit<"kilogram"> | NumberInUnit<"pound">

// Things to potentially cover later
// Pick & Omit?
// Parameters & ReturnType
