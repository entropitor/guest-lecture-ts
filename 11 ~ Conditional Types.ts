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
