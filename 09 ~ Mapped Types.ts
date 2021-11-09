type Environment = "production" | "staging" | "development"
// "For-each"
type UrlForEnvironment = {
  [env in Environment]: string
}

const urls: UrlForEnvironment = {
  production: "https://google.com",
  staging: "https://duckduckgo.com",
  development: "https://bing.com",
}

/*
 *
 *
 *
 */

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

// For each day, choose any of the available items
// --> For-each + valueof
type ChoosenMenu = {
  [Day in keyof Menu]: Menu[Day][number]
}
