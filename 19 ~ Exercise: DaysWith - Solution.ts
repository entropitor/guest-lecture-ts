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

type PossibleChoices = Menu[keyof Menu]
type AllMeals = ValueOf<PossibleChoices>

type IsIngredientOf<
  Ingredient extends string,
  Meal
> = Meal extends `${Ingredient} and ${string}`
  ? true
  : Meal extends `${string} and ${Ingredient}`
  ? true
  : false
type MealsWithIngredient<Ingredient extends string> = {
  [Meal in AllMeals]: IsIngredientOf<Ingredient, Meal> extends true
    ? Meal
    : never
}[AllMeals]

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

type ServesMealOnDay<Meal, Day extends keyof Menu> = {
  [MealForDay in ValueOf<Menu[Day]>]: Meal extends MealForDay ? Day : never
}[ValueOf<Menu[Day]>]

type X = ServesMealOnDay<"Fries and ketchup", "Sunday">
type Y = ServesMealOnDay<"Steak and lettuce", "Monday">
type Z = ServesMealOnDay<"Steak and lettuce", "Tuesday">

type DaysWith<Ingredient extends string> = {
  [Day in keyof Menu]: ServesMealOnDay<MealsWithIngredient<Ingredient>, Day>
}[keyof Menu]

// type DaysWithSteak = "Monday"
type DaysWithSteak = DaysWith<"Steak">
// type DaysWithFries = "Sunday"
type DaysWithFries = DaysWith<"Fries">
// type DaysWithTomatoes = "Monday" | "Friday"
type DaysWithTomatoes = DaysWith<"tomatoes">
// type DaysWithHummus = never
type DaysWithHummus = DaysWith<"hummus">
