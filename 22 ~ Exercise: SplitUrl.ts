// Task: convert a url into its parts and retrieve url parameters
const homeUrl = "/"
const contactUrl = "/about-us/contact"
const companyUrl = "/company/:companyName"
const companyJobUrl = "/company/:companyName/job/:jobId"

// Some Things you might need:

// You can extend a tuple
type Tuple = [string, number]
type ExtendTuple = [boolean, ...Tuple]
// type ExtendTuple = [boolean, string, number]

type X = "foo" | "bar" | "foobar"
// You can rename in mapped types using 'as'
type Renamed = {
  [Key in X as `renamed-${Key}`]: string
}
// type Renamed = {
//     "renamed-foo": string;
//     "renamed-bar": string;
//     "renamed-foobar": string;
// }
// Rename to "never" to remove a field
type RenamedAndRemoveSome = {
  [Key in X as Key extends `foo${infer _}` ? `renamed-${Key}` : never]: string
}
// type RenamedAndRemoveSome = {
//     "renamed-foo": string;
//     "renamed-foobar": string;
// }

/*
 *
 *
 *
 */

type UrlParts<Url extends string> = any

// type HomeUrlParts = [""]
type HomeUrlParts = UrlParts<typeof homeUrl>
// type ContactUrlParts = ["about-us", "contact"]
type ContactUrlParts = UrlParts<typeof contactUrl>
// type CompanyUrlParts = ["company", ":companyName"]
type CompanyUrlParts = UrlParts<typeof companyUrl>
// type CompanyJobUrlParts = ["company", ":companyName", "job", ":jobId"]
type CompanyJobUrlParts = UrlParts<typeof companyJobUrl>

/*
 *
 *
 *
 */

type UrlParameters<Url extends string> = any

// type UrlParametersForHome = {}
type UrlParametersForHome = UrlParameters<typeof homeUrl>

// type UrlParametersForContact = {}
type UrlParametersForContact = UrlParameters<typeof contactUrl>

// type UrlParametersForCompanyUrl = {
//     companyName: string;
// }
type UrlParametersForCompanyUrl = UrlParameters<typeof companyUrl>

// type UrlParametersForCompanyJobUrl = {
//     companyName: string;
//     jobId: string;
// }
type UrlParametersForCompanyJobUrl = UrlParameters<typeof companyJobUrl>
