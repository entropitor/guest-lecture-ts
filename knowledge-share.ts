namespace DiscriminatedUnion_PositionalArguments {
  type UserUnion2 = ["LoggedIn", BasicTypes.UserRecord] | ["Anonymous"]

  const handleUserUnion2 = (userUnion: UserUnion2) => {
    switch (userUnion[0]) {
      case "Anonymous":
        return 0
      case "LoggedIn":
        // We can correctly access userState[1] here
        return userUnion[1].name.length
      default:
        // If we comment out one of the branches above
        // we get a type error
        return DiscriminatedUnion.unreachable(userUnion)
    }
  }
}

namespace Generics {
  // ManualArray === builtin Array
  type ManualArray<T> = T[]

  const a = [2, 4, 6]
  a.map((num) => num ** 2)

  const b = [2, "4", 6]
  // typeof b = string | number
  // @ts-expect-error The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
  b.map((num) => num ** 2)

  // Reducer
  type Reducer<State, Action> = (state: State, action: Action) => State
  // with constraints:
  type ReducerSafer<State, Action extends { type: string }> = (
    state: State,
    action: Action
  ) => State
}

namespace UtilityTypes {
  // typeof
  type ManualConfig = {
    readonly env: "production"
  }

  const config = { env: "production" } as const
  // Config === ManualConfig
  type Config = typeof config

  // keyof
  type ManualConfigKeys = "env"
  // ConfigKeys === ManualConfigKeys
  type ConfigKeys = keyof Config

  // Pick & Omit
  type User = {
    createdAt: Date
    email: string
    hasActiveSubscription: boolean
    id: number
    name: string
  }
  type GdprSafeUser = Pick<User, "id" | "hasActiveSubscription" | "createdAt">
  type AnonimizedUser = Omit<User, "name" | "email">
  // GdprSafeUser === AnonimizedUser;

  // "valueof"
  type Name = User["name"]
  type Values = User[keyof User]

  // "valueof" (array)
  type Position = [name: string, x: number, y: number]
  type PositionName = Position[0]
  type PositionX = Position[1]
  type ValuesOfArray = Position[number]

  // Parameters & ReturnType
  type UserState = {
    email: string
    name: string
  }

  type UserAction =
    | {
        name: string
        type: "SET_NAME"
      }
    | { email: string; type: "SET_EMAIL" }

  export const userReducer = (state: UserState, action: UserAction) => {
    switch (action.type) {
      case "SET_NAME":
        return { ...state, name: action.name }
      case "SET_EMAIL":
        return { ...state, email: action.email }
      default:
        return DiscriminatedUnion.unreachable(action)
    }
  }

  type ReducerParameters = Parameters<typeof userReducer>

  // Action === UserAction
  type Action = ReducerParameters[1]

  // State === UserState
  type State = ReducerParameters[0]

  // StillState === UserState
  type StillState = ReturnType<typeof userReducer>
}

namespace MappedTypes {
  type Environment = "production" | "staging" | "development"
  type UrlForEnvironment = {
    [env in Environment]: string
  }

  const reducers = { user: UtilityTypes.userReducer }
  type CombinedState = {
    [reducer in keyof typeof reducers]: ReturnType<typeof reducers[reducer]>
  }
}

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
