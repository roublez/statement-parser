import { TextItem } from "pdfjs-dist/types/src/display/api";
import PdfParsableFile from "../../../parsers/PdfParsableFile";
import BankStatementConverter from "../../BankStatementConverter";
import { isCurrencyString, isDate } from "../../helpers";

/**
 * Responsible for converting pdf parsed data from DKB statements.
 */
export default class DKBConverter extends BankStatementConverter<PdfParsableFile, Array<TextItem>> {

    /**
     * Constructs the DKBConverter object
     * @param parsable The parsable file to convert
     */
    constructor (parsable: PdfParsableFile) {
        super(parsable);
    }

    /**
     * Checks whether the converter can convert the parsable
     * @returns Whether the converter can convert the parsable
     */
    public canConvert () : boolean {
        const data = this.parsable.data();

        //
        // The first text content of the first page of a DKB bank statement is the all-caps name of the bank
        if (data.length > 0 && data[0].contents.length > 0 && data[0].contents[0].str === 'DEUTSCHE KREDITBANK AG') {
            return true;
        }

        return false;
    }

    /**
     * Chunks the data into transactions context sets
     * @returns The prepared context
     */
    public prepareToConvert () : Array<Array<TextItem>> {
        return [];
    }

    /**
     * Gets the date of the transaction
     * @param context The parsed data context
     * @returns The date of the transaction
     */
    public getBookedAt (context: Array<TextItem>) : string|null {
        return null;
    }

    /**
     * Gets the amount of the transaction
     * @param context The parsed data context
     * @returns The amount of the transaction
     */
    public getAmount (context: Array<TextItem>) : string {
        return '';
    }

    /**
     * Gets the name of the transaction
     * @param context The parsed data context
     * @returns The name of the transaction
     */
    public getName (context: Array<TextItem>) : string {
        return '';
    }

    /**
     * Gets the description of the transaction
     * @param context The parsed data context
     * @returns The description of the transaction
     */
    public getDescription (context: Array<TextItem>) : string|null {
        return null;
    }
}
