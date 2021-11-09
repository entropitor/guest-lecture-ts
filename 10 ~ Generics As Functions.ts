// Generics are functions
type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday"
type WeekOf<T> = {
  [day in Day]: T
}

// const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
// const weekOf = (t) => {
//   const result = {}
//   for(day of days) {
//     result[day] = t
//   }
//   return result
// }

type WeekMenu = WeekOf<{
  breakfast: string
  lunch: string
  dinner: string
}>

type WeekWeather = WeekOf<{
  temperature: number
  prediction: "sunny" | "cloudy" | "rainy"
}>

/*
 *
 *
 *
 */

type ValueFor<T> = number
type Keys = "a" | "b"

// Mapped type is somewhat like calling a function in parallell for all possible keys and collecting the results
type MappedType = {
  [Key in Keys]: ValueFor<Key>
  //             ^^^^^^^^^^^^^ "Function" that we call for every Key
}
