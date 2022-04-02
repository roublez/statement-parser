import { TextContentItem } from "pdfjs-dist";
import PdfParsableFile from "../../parsers/PdfParsableFile";
import BankStatementConverter from "../BankStatementConverter";

/**
 * Responsible for converting pdf parsed data from N26 statements.
 */
export default class N26PdfConverter extends BankStatementConverter<PdfParsableFile, Array<TextContentItem>> {

    /**
     * Constructs the N26PdfConverter object
     * @param parsable The parsable file to convert
     */
    constructor (parsable: PdfParsableFile) {
        super(parsable);
    }

    public prepareToConvert () : Array<Array<TextContentItem>> {
        this.parsable.data().forEach(page => {
            page.contents.forEach(item => {
                console.log(item);
            });
        })
        return [];
    }

    /**
     * Gets the date of the transaction
     * @param context The parsed data context
     * @returns The date of the transaction
     */
    public getBookedAt (context: Array<TextContentItem>) : string|null {
        return null;
    }

    /**
     * Gets the amount of the transaction
     * @param context The parsed data context
     * @returns The amount of the transaction
     */
    public getAmount (context: Array<TextContentItem>) : string {
        return 'null';
    }

    /**
     * Gets the name of the transaction
     * @param context The parsed data context
     * @returns The name of the transaction
     */
    public getName (context: Array<TextContentItem>) : string {
        return 'null';
    }

    /**
     * Gets the description of the transaction
     * @param context The parsed data context
     * @returns The description of the transaction
     */
    public getDescription (context: Array<TextContentItem>) : string|null {
        return null;
    }

    /**
     * Gets the category of the transaction (if part of the document)
     * @param context The parsed data context
     * @returns The category of the transaction
     */
    public getCategory (context: Array<TextContentItem>) : string|null {
        return null;
    }
}
