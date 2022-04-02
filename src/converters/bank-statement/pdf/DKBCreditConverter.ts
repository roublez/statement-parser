import { TextItem } from "pdfjs-dist/types/src/display/api";
import PdfParsableFile from "../../../parsers/PdfParsableFile";
import BankStatementConverter from "../../BankStatementConverter";
import { isCurrencyString, isDate } from "../../helpers";

/**
 * Responsible for converting pdf parsed data from DKB credit card.
 */
export default class DKBCreditConverter extends BankStatementConverter<PdfParsableFile, Array<TextItem>> {

    /**
     * Constructs the DKBCreditConverter object
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

        //
        // DKB credit card statements have at least once a reference to their own website.
        for (const page of this.parsable.data()) {
            for (const item of page.contents) {
                if (item.str === 'www.DKB.de') {
                    return true;
                }
            }
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
