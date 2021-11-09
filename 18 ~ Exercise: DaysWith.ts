// Task: Given an ingredient, say on which day you can eat it
// To help: start with figuring out which meals use this ingredient
const menu = {
  Monday: ["Steak and lettuce", "Codd and tomatoes"],
  Tuesday: ["Chicken and carrots", "Peas and carrots"],
  Wednesday: ["Fish and chips", "Turkey and stuffing"],
  Thursday: ["Sushi and rice", "Wok and noodles"],
  Friday: ["Lamb and tomatoes", "Salmon and cheese"],
  Saturday: ["Spaghetti and pesto", "Penne and arrabiata"],
  Sunday: ["Fries and ketchup", "Fries and mayonnaise"],
} as const
type Menu = typeof menu
type ValueOf<T extends readonly any[]> = T[number]
/*
 *
 *
 *
 */

type MealsWithIngredient<Ingredient extends string> = any

// type MealsWithSteak = "Steak and lettuce"
type MealsWithSteak = MealsWithIngredient<"Steak">
// type MealsWithFries = "Fries and ketchup" | "Fries and mayonnaise"
type MealsWithFries = MealsWithIngredient<"Fries">
// type MealsWithTomatoes = "Codd and tomatoes" | "Lamb and tomatoes"
type MealsWithTomatoes = MealsWithIngredient<"tomatoes">
// type MealsWithHummus = never
type MealsWithHummus = MealsWithIngredient<"hummus">

/*
 *
 *
 *
 */
type DaysWith<I extends string> = any

// type DaysWithSteak = "Monday"
type DaysWithSteak = DaysWith<"Steak">
// type DaysWithFries = "Sunday"
type DaysWithFries = DaysWith<"Fries">
// type DaysWithTomatoes = "Monday" | "Friday"
type DaysWithTomatoes = DaysWith<"tomatoes">
// type DaysWithHummus = never
type DaysWithHummus = DaysWith<"hummus">
