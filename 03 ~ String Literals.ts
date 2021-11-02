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

/*
 *
 *
 *
 *
 *
 */

const f = ["Jens", "Jeroen"]
f
// ^?

f[0] = "Pieter"
f.push("Frank")

const g = ["Jens", "Jeroen"] as const
g
// ^?

g[0] = "Pieter"
g.push("Frank")

const h = ["Jens" as const, "Jeroen" as const]
h
// ^?

h[0] = "Pieter"
h[0] = "Jeroen"
h.push("Frank")
