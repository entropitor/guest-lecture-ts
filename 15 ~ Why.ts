// Why do we compute types from other types?
// Is it practical? Or is this just some academic bullshit?
// The answer: this example comes from our codebase (only slightly adapted here to remove some more complex parts)
// This is related to the exercise SplitUrl which is an exercise that literally comes from our codebase.
//
// Image a function that takes a url like "/company/:companyName" and some parameters like {companyName: "DataCamp"}
// and returns the url with parameters filled in like "/company/DataCamp"
//
// How would we type this?

// A naive implementation might be like the following:
// (With Record<string, string> just be any "map"/"object" with string keys and string values)
const fillInUrl = (url: string, parameters: Record<string, string>): string => {
  // TODO implement this function, we are just interested in the type annotations
  return ""
}

// And we would use it like
const datacampUrl = fillInUrl("/company/:companyName", {
  companyName: "DataCamp",
})

// This works fine and there are no problems, however, we can pass wrong arguments to the function
// and we would only know at compile time
const typoInParameters = fillInUrl("/company/:companyName", {
  // Notice the missing "y" in company
  companName: "DataCamp",
})

// or we can even pass empty arguments, even though our url requires a companyName
const noParameters = fillInUrl("/company/:companyName", {})

/*
 *
 *
 *
 */

// By using generics and computed types we could improve

// For now we only hardcode the given url, in Exercise "SplitUrl" you will implement this for any url
type UrlParameters<Url extends string> = Url extends "/company/:companyName"
  ? { companyName: string }
  : Record<string, string>

// By using a generic on a function, we ask typescript, try to infer the most specific type that the url parameter has,
// so we can use it for type computation and annotate other types, like the argument "parameters"
const fillInUrlSafe = <Url extends string>(
  url: Url,
  parameters: UrlParameters<Url>
): string => {
  // TODO implement this function, we are just interested in the type annotations
  return ""
}

const datacampUrlSafe = fillInUrlSafe("/company/:companyName", {
  companyName: "DataCamp",
})

// A typo? A type error!
const typoInParametersSafe = fillInUrlSafe("/company/:companyName", {
  // Notice the missing "y" in company
  companName: "DataCamp",
})

// A forgotten parameter? A type error!
const noParametersSafe = fillInUrlSafe("/company/:companyName", {})

// So by using type inference and computed types,
// we can make certain things type safe that are typically (in most languages) impossible to be type-safe
