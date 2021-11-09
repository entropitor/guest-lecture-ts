const greet = (name: string) => {
  // "Template literal":
  return `Hello ${name}`
}

/*
 *
 *
 *
 */

type Presenter = "Jeroen" | "Jens"
type Style = "boring" | "interesting"
type StyledPresenters = `${Style} ${Presenter}`

/*
 *
 *
 *
 */

type StyleFrom<Presenter> = Presenter extends `${infer Style} ${string}`
  ? Style
  : never

type NameFrom<Presenter> = Presenter extends `${string} ${infer Name}`
  ? Name
  : never

type A = StyleFrom<"boring Jens">
type B = NameFrom<"boring Jens">

/*
 *
 *
 *
 */

const menu = {
  Monday: ["Steak and lettuce", "Codd and lettuce"],
  Tuesday: ["Chicken and carrots", "Peas and carrots"],
  Wednesday: ["Fish and chips", "Turkey and stuffing"],
  Thursday: ["Sushi and rice", "Wok and noodles"],
  Friday: ["Lamb and tomatoes", "Salmon and cheese"],
  Saturday: ["Spaghetti and pesto", "Penne and arrabiata"],
  Sunday: ["Fries and ketchup", "Fries and mayonnaise"],
} as const
type Menu = typeof menu

type MainIngredients = {
  [Day in keyof Menu]: Menu[Day][number] extends `${infer T} and ${string}`
    ? T
    : never
}

// Sometimes it helps to write it in pieces:
type MainIngredient<MenuItem> = MenuItem extends `${infer Main} and ${string}`
  ? Main
  : never
type PossibleValues<T extends readonly any[]> = T[number]
type MainIngredients2 = {
  [Day in keyof Menu]: MainIngredient<PossibleValues<Menu[Day]>>
}
