// "If-else"
type DayPlanning<Day> = Day extends "Saturday" | "Sunday"
  ? {
      toEat: string
      relaxingActivity: string
    }
  : {
      toEat: string
      workItemToDo: string
    }

type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday"
type WeekPlanning = {
  [TDay in Day]: DayPlanning<TDay>
}
/*
 *
 *
 *
 */

type UserUnion =
  | {
      type: "LoggedIn"
      userName: string
    }
  | {
      type: "LoggedOut"
    }
type GetUserName = <U extends UserUnion>(
  user: U
) => U["type"] extends "LoggedIn" ? string : undefined

// This way we say we have a variable of this type
declare const getUserName: GetUserName

const a = getUserName({ type: "LoggedIn", userName: "Jens" })
a
// ^?
const b = getUserName({ type: "LoggedOut" })
b
// ^?

/*
 *
 *
 *
 */

type Company = {
  companyName: string
  hiring: boolean
  founded: Date
}
type StringifiedCompany = {
  [Key in keyof Company]: Company[Key] extends boolean
    ? "true" | "false"
    : Company[Key] extends Date
    ? string
    : Company[Key]
}

/*
 *
 *
 *
 */
// What if we "call" a generic/conditional with a union?
// Make sure to also read the "Errata" file!
type NumberOrString<T> = T extends "foo"
  ? number
  : T extends "bar"
  ? string
  : never

type A = NumberOrString<"foo">
type B = NumberOrString<"bar">
type C = NumberOrString<"qux">
type D = NumberOrString<"foo" | "bar">
type E = NumberOrString<"bar" | "foo">
type F = NumberOrString<"foo" | "qux">
type G = NumberOrString<"bar" | "qux">
type H = NumberOrString<"foo" | "bar" | "qux">

/*
 *
 *
 *
 */
type NumberInUnit<Unit> = {
  value: number
  unit: Unit
}

type InKiloGrams = NumberInUnit<"kilogram">
type InPounds = NumberInUnit<"pound">

type Weight = NumberInUnit<"kilogram" | "pound">
type Weight2 = NumberInUnit<"kilogram"> | NumberInUnit<"pound">
type Weight3 = InKiloGrams | InPounds

// See also the Errata!
