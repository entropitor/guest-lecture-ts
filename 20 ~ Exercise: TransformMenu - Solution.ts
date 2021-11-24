// Task: convert the menu into a more structured type (an object with {main: string, side: string})
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

type TransformMeal<Meal extends string> =
  Meal extends `${infer Main} and ${infer Side}`
    ? { main: Main; side: Side }
    : never

type StructuredSteak = TransformMeal<"Steak and lettuce">

type TransformedMenu = {
  [Day in keyof Menu]: TransformMeal<Menu[Day][number]>
}
