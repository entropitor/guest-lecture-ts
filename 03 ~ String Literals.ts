let a = "Guest Lecture"
a
// ^?

const b = "Guest Lecture"
b
// ^?

/*
 *
 *
 *
 *
 *
 */

const c = {
  companyName: "DataCamp",
  hiring: true,
}
c
// ^?

c.companyName = "KU Leuven"

const d = {
  companyName: "DataCamp",
  hiring: true,
} as const
d
// ^?

d.companyName = "KU Leuven"

/*
 *
 *
 *
 *
 *
 */

const e = () => {
  if (d.companyName === "KU Leuven") {
    // This will never be true, and TS knowns it
    return true
  }
  return false
}
