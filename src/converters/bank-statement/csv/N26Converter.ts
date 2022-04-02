import CsvParsableFile from "../../../parsers/CsvParsableFile";
import BankStatementConverter from "../../BankStatementConverter";

/**
 * Responsible for converting csv parsed data from N26 statements.
 */
export default class N26Converter extends BankStatementConverter<CsvParsableFile, Array<string>> {

    /**
     * Constructs the N26Converter object
     * @param parsable The parsable file to convert
     */
    constructor (parsable: CsvParsableFile) {
        super(parsable);
    }

    /**
     * Removes the first line of the csv content and normlizes the data
     * @returns The rows of the CSV file
     */
    public prepareToConvert () : Array<Array<string>> {
        let rows = this.parsable.data();
        rows.shift();

        return rows;
    }

    /**
     * Gets the date of the transaction
     * @param context The parsed data context
     * @returns The date of the transaction
     */
    public getBookedAt (context: string[]) : string|null {
        return context[0];
    }

    /**
     * Gets the amount of the transaction
     * @param context The parsed data context
     * @returns The amount of the transaction
     */
    public getAmount (context: string[]) : string {
        return context[5];
    }

    /**
     * Gets the name of the transaction
     * @param context The parsed data context
     * @returns The name of the transaction
     */
    public getName (context: string[]) : string {
        return context[1];
    }

    /**
     * Gets the description of the transaction
     * @param context The parsed data context
     * @returns The description of the transaction
     */
    public getDescription (context: string[]) : string|null {

        //
        // N26 usually uses "-" in their description columns when there is no description
        if (context[4].length === 0 || context[4] === '-') {
            return null;
        }

        return context[4];
    }
}
