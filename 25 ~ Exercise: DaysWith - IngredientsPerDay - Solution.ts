// Task: Given an ingredient, say on which day you can eat it
// To help: start with figuring out which meals use this ingredient
type Menu = {
  Monday: ["Steak and lettuce", "Codd and tomatoes"]
  Tuesday: ["Chicken and carrots", "Peas and carrots"]
  Wednesday: ["Fish and chips", "Turkey and stuffing"]
  Thursday: ["Sushi and rice", "Wok and noodles"]
  Friday: ["Lamb and tomatoes", "Salmon and cheese"]
  Saturday: ["Spaghetti and pesto", "Penne and arrabiata"]
  Sunday: ["Fries and ketchup", "Fries and mayonnaise"]
}

/*
 *
 *
 *
 */

type IngredientsOn<Day extends keyof Menu> =
  Menu[Day][number] extends `${infer Main} and ${infer Side}`
    ? Main | Side
    : never

// type IngredientsOnMonday = "Steak" | "lettuce" | "Codd" | "tomatoes"
type IngredientsOnMonday = IngredientsOn<"Monday">
// type IngredientsOnSunday = "Fries" | "ketchup" | "mayonnaise"
type IngredientsOnSunday = IngredientsOn<"Sunday">

/*
 *
 *
 *
 */
type DaysWith<I extends string> = {
  [Day in keyof Menu]: I extends IngredientsOn<Day> ? Day : never
}[keyof Menu]

// type DaysWithSteak = "Monday"
type DaysWithSteak = DaysWith<"Steak">
// type DaysWithFries = "Sunday"
type DaysWithFries = DaysWith<"Fries">
// type DaysWithTomatoes = "Monday" | "Friday"
type DaysWithTomatoes = DaysWith<"tomatoes">
// type DaysWithHummus = never
type DaysWithHummus = DaysWith<"hummus">
