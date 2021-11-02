/** Typeof */
const ourCompany = { companyName: "DataCamp", hiring: true }
type Company = typeof ourCompany
// type Config = { companyName: string; hiring: boolean }

/** Keyof */
type CompanyKeys = keyof Company
// type CompanyKeys = "companyName" | "hiring"

/*
 *
 *
 *
 */

/** "ValueOf" (arrays) */
type Position = [/* name */ string, /* x */ number, /* y */ number]
type PositionName = Position[0] // string
type PositionX = Position[1] // number
type PossibleValuesOfArray = Position[number] // string | number

/*
 *
 *
 *
 */

/** "ValueOf" (objects) */
type User = {
  createdAt: Date
  email: string
  hasActiveSubscription: boolean
  id: number
  name: string
}

type Name = User["name"]
type PossibleValuesOfUserFields = User[keyof User]
