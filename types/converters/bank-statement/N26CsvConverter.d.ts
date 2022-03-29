import CsvParsableFile from "../../parsers/CsvParsableFile";
import BankStatementConverter from "../BankStatementConverter";
/**
 * Responsible for converting csv parsed data from N26 statements.
 */
export default class N26CsvConverter extends BankStatementConverter<CsvParsableFile, Array<string>> {
    /**
     * Constructs the N26CsvConverter object
     * @param parsable The parsable file to convert
     */
    constructor(parsable: CsvParsableFile);
    /**
     * Removes the first line of the csv content and normlizes the data
     * @returns The rows of the CSV file
     */
    prepareToConvert(): Array<Array<string>>;
    /**
     * Gets the date of the transaction
     * @param context The parsed data context
     * @returns The date of the transaction
     */
    getBookedAt(context: string[]): string | null;
    /**
     * Gets the amount of the transaction
     * @param context The parsed data context
     * @returns The amount of the transaction
     */
    getAmount(context: string[]): string;
    /**
     * Gets the name of the transaction
     * @param context The parsed data context
     * @returns The name of the transaction
     */
    getName(context: string[]): string;
    /**
     * Gets the description of the transaction
     * @param context The parsed data context
     * @returns The description of the transaction
     */
    getDescription(context: string[]): string | null;
    /**
     * Gets the category of the transaction (if part of the document)
     * @param context The parsed data context
     * @returns The category of the transaction
     */
    getCategory(context: string[]): string | null;
}
