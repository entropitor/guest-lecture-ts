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

type TransformMeal<Meal extends string> = any

type StructuredSteak = TransformMeal<"Steak and lettuce">

type TransformedMenu = {
  [Day in keyof Menu]: TransformMeal<Menu[Day][number]>
}
