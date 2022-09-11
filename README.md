## Add a new converter
1.  Create a new converter file:

The new converter file must be located at the following path, where **entityType** is either `bank-statement` or `portfolio-activity` and **fileType** is one of the supported file types (currently `csv` or `pdf`). The converter must have a descriptive and unique name, such as *AcmeBankConverter.ts*.
`src/converters/{entityType}/{fileType}/{name}Converter.ts`

An institution can have multiple converters if the institution has for example different account statement exports. Each converter will check against the file and will be used, if it is the only converter that matches.

2. Add the converter to the list of supported ones.

In `src/converters/index.ts` is a list of supported converters. Add the name to the correct list.

3. Prepare the contents of the file

The converter must implement a specified set of functions to handle the file. A converter has a readonly property `parsable` to access the parsed file. This is an example for a CSV bank statement converter (A PDF bank statement converter would user the `PDFParsableFile` as the first generic type). The the second generic tyoe `Context` must be the type we expect and item to be. In a CSV file this is usually an array of strings (list of column values per row).
```ts
export default class GenericConverter extends BankStatementConverter<CSVParsableFile, Context> {

    // Determines if the converter can convert the parsed file
    public canConvert () : boolean

    // Prepares the parsed file and cleans up headers, footers and other verbose data
    public prepareToConvert () : Array<Context>

    // Use the context to retrieve the value for the column
    public getBookedAt (context: Context) : string|null
    public getAmount (context: Context) : string
    public getName (context: Context) : string
    public getDescription (context: Context) : string|null
    // ...
}
```
