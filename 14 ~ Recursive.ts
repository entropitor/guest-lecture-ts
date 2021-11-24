// While loops through recursion

const weatherAsString =
  "Monday:Sunny,Tuesday:Rainy,Wednesday:Cloudy,Thursday:Sunny,Friday:Snowy,Saturday:Cloudy,Sunday:Sunny" as const
type ParsePrediction<T extends string> =
  T extends `${infer Day}:${infer Weather}` ? [Day, Weather] : never

type ParsedPrediction = ParsePrediction<"Monday:Sunny">

// While there is a comma
type ParseWeather<T extends string> =
  T extends `${infer Prediction},${infer Rest}`
    ? ParsePrediction<Prediction> | ParseWeather<Rest>
    : ParsePrediction<T>

type ParsedAsUnion = ParseWeather<typeof weatherAsString>

type AsRecord<T extends [string, string]> = {
  [Key in T[0]]: T extends [Key, infer Value] ? Value : never
}

type Parsed = AsRecord<ParsedAsUnion>
