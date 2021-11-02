let a = 3
a
// ^?

let b = "Guest Lecture"
b
// ^?

let c: boolean = false
c
// ^?

const d = ["Jens", "Jeroen"]
d
// ^?

let e = {
  companyName: "DataCamp",
  hiring: true,
}
e
// ^?

type Company = {
  companyName: string
  hiring: boolean
}
let f: Company = {
  companyName: "DataCamp",
  hiring: true,
}
f
// ^?

const meaningOfLife = () => 42
meaningOfLife
// ^?

function g(nb: number) {
  if (nb % 2 === 0) {
    return "foo"
  }
  return "bar"
}
g
// ^?
