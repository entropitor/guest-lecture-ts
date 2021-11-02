let a = 3
a
// ^?

let b = "Guest Lecture"
b
// ^?

let c: boolean = false
c
// ^?

let d = ["Jens", "Jeroen"]
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
interface Company2 {
  companyName: string
  hiring: boolean
}
let f2: Company2 = f
f2
// ^?

let meaningOfLife = () => 42
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
