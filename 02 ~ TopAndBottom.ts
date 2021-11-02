const parse = (arg: any) => {
  return parseInt(arg, 10)
}
parse
// ^?
parse(3)
parse("3") // works
parse("foo") // throws error!
parse(false) // throws error!

// =============================================================

const betterParse = (arg: unknown) => {
  // If we pass arg to parseInt we get a type error
  // parseInt(arg, 10)

  if (typeof arg === "string") {
    return parseInt(arg, 10)
  }

  // We have to choose what to do if it is not a string
  return null
}
betterParse
// ^?
betterParse(3)
betterParse("3")
betterParse("foo")
betterParse(false)

// =============================================================

const explode = (): never => {
  throw new Error("Boom")
}
