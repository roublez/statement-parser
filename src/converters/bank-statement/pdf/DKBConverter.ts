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
        let transactions: Array<Array<TextItem>> = [];

        this.parsable.data().forEach(page => {
            let startIndex = -1;
            let endIndex = -1;

            //
            // Determine the indicies of the headers
            for (let itemIndex = 0; itemIndex < page.contents.length; itemIndex++) {
                const item = page.contents[itemIndex];

                //
                // The transactions have the text 'Wir haben für Sie gebucht', then an empty line, and then the transaction
                // therefore the start index is 2 items after the text 'Wir haben für Sie gebucht'
                if (item.str === 'Wir haben für Sie gebucht') {
                    startIndex = itemIndex + 2;
                    continue;
                }

                //
                // The transaction listing on a page ends with the following items:
                // ""
                // "ALTER KONTOSTAND"
                // "NEUER KONTOSTAND"
                if (itemIndex > startIndex && item.str === 'ALTER KONTOSTAND') {
                    const previousItem = page.contents[itemIndex - 1];
                    const nextItem = page.contents[itemIndex + 1];
                    if (previousItem.str.length === 0 && nextItem.str === 'NEUER KONTOSTAND') {
                        endIndex = itemIndex - 1;
                        break;
                    }
                }
            }

            //
            // - If no start index was found the page does not have any transactions
            // - If an end index was found, but the start was determined after the end index the page has no conventional listing
            if (startIndex === -1 || (endIndex !== -1 && startIndex > endIndex)) {
                return;
            }

            //
            // If the endIndex was not found, use "undefined" to take all items until the end of the list
            const cutoff = page.contents.slice(startIndex, endIndex === -1 ? undefined : endIndex);

            let transactionBeginIndex = 0;
            for (let itemIndex = 0; itemIndex < cutoff.length; itemIndex++) {
                const item = cutoff[itemIndex];

                //
                // If the item found is a dkb date, the it may be the start of a new transaction.
                // Transactions begin with the following item sequence: dkb-date, empty, dkb-date, empty
                if (this.isFormattedDkbDate(item.str) && cutoff.length > (itemIndex + 3)) {
                    const nextItem = cutoff[itemIndex + 1];
                    const secondNextItem = cutoff[itemIndex + 2];
                    const thirdNextItem = cutoff[itemIndex + 3];

                    if (nextItem.str.length === 0 && this.isFormattedDkbDate(secondNextItem.str) && thirdNextItem.str.length === 0) {

                        if (itemIndex === 0) {
                            continue;
                        }

                        //
                        // We found the start of a new transaction so we need to cutoff from the last begin until the previous item
                        const range = cutoff.slice(transactionBeginIndex, itemIndex);
                        transactions.push(range);

                        //
                        // Set the new transaction begin index
                        transactionBeginIndex = itemIndex;
                        continue;
                    }
                }
            }

            //
            // After iteration we need to add the last chunk of items (the last transaction of the list)
            const range = cutoff.slice(transactionBeginIndex);
            transactions.push(range);
        });

        return transactions;
    }

    /**
     * Gets the date of the transaction
     * @param context The parsed data context
     * @returns The date of the transaction
     */
    public getBookedAt (context: Array<TextItem>) : string|null {
        return context[0].str;
    }

    /**
     * Gets the amount of the transaction
     * @param context The parsed data context
     * @returns The amount of the transaction
     */
    public getAmount (context: Array<TextItem>) : string {
        const isIncome = context[4].str === 'Zahlungseingang';
        return (isIncome ? '' : '-') + context[context.length -1 ].str;
    }

    /**
     * Gets the name of the transaction
     * @param context The parsed data context
     * @returns The name of the transaction
     */
    public getName (context: Array<TextItem>) : string {
        return context[5].str;
    }

    /**
     * Gets the description of the transaction
     * @param context The parsed data context
     * @returns The description of the transaction
     */
    public getDescription (context: Array<TextItem>) : string|null {
        return context.filter((item, index) => index === 4 || (index > 5 && index < context.length - 1))
            .map(item => item.str)
            .join('\n') + '\nWertstellung: ' + context[2].str;
    }

    /**
     * Checks if the string is a DKB bank statement formatted date (DD.MM.)
     * @param string The string to check
     * @returns True if the string is a DKB bank statement formatted date
     */
    private isFormattedDkbDate (string: string) : boolean {
        return /^\d{2}\.\d{2}\.$/.test(string);
    }
}
