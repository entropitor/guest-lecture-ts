const square = (x: number) => x ** 2

const a = [2, 4, 6]
a.map((x) => square(x))

const b = [2, "4", 6]
b.map((x) => square(x))

a
//^?
b
//^?

type Numbers = number[]
type Numbers2 = Array<number>

type NumberInUnit<Unit> = {
  value: number
  unit: Unit
}

type InKiloGrams = NumberInUnit<"kilogram">
type InPounds = NumberInUnit<"pound">

const oneKilogram: InKiloGrams = {
  value: 1,
  unit: "kilogram",
}
const onePound: InPounds = {
  value: 1,
  unit: "pound",
}
const oneKilogramTypo: InKiloGrams = {
  value: 1,
  unit: "kilgram",
}

/*
 *
 *
 *
 */
type NumberInWeightUnit<WeightUnit extends "kilogram" | "pound"> = {
  value: number
  unit: WeightUnit
}

type InKiloGrams2 = NumberInWeightUnit<"kilogram">
type InLiter = NumberInWeightUnit<"liter">
