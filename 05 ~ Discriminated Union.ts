type DiceEyes = 1 | 2 | 3 | 4 | 5 | 6
type Suit = "Hearts" | "Diamond" | "Spade" | "Clubs"

enum DiceEyesAsEnum {
  One = 1,
  Two,
  Three,
  Four,
  Five,
  Six,
}
enum SuitAsEnum {
  Hearts = "H",
  Diamond = "D",
  Spade = "S",
  Clubs = "C",
}

/*
 *
 *
 *
 */

export type UserUnion =
  | {
      type: "LoggedIn"
      user: {
        name: string
      }
    }
  | {
      type: "LoggedOut"
    }

const anonymous: UserUnion = { type: "LoggedOut" }
const user: UserUnion = { type: "LoggedIn", user: { name: "Homer" } }

/*
 *
 *
 *
 */
const unreachable = (_arg: never) => {
  throw new Error("Should not be reachable")
}
const getUserNameLength = (userUnion: UserUnion) => {
  switch (userUnion.type) {
    case "LoggedOut":
      return 0
    case "LoggedIn":
      // We can correctly access userUnion.user here
      return userUnion.user.name.length
    default:
      // If we comment out one of the branches above
      // we get a type error
      return unreachable(userUnion)
  }
}
