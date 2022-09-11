import { TextItem } from "pdfjs-dist/types/src/display/api";
import PDFParsableFile from "../../../parsers/PDFParsableFile";
import BankStatementConverter from "../../BankStatementConverter";
import { isCurrencyString, isDate } from "../../helpers";

/**
 * Responsible for converting pdf parsed data from N26 statements.
 */
export default class N26Converter extends BankStatementConverter<PDFParsableFile, Array<TextItem>> {

    /**
     * Constructs the N26Converter object
     * @param parsable The parsable file to convert
     */
    constructor (parsable: PDFParsableFile) {
        super(parsable);
    }

    /**
     * Checks whether the converter can convert the parsable
     * @returns Whether the converter can convert the parsable
     */
    public canConvert () : boolean {

        //
        // N26 Statements have the following satulation on the last page of the statement
        for (const page of this.parsable.data()) {
            for (const item of page.contents) {
                if (item.str === 'Your N26 Team') {
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
        const data = this.parsable.data();
        const maxPageNumber = Math.max(...data.map(page => page.pageNumber));

        let transactions: Array<Array<TextItem>> = [];

        this.parsable.data().forEach(page => {
            let hotspots = {
                pageNumbering: 0,
                descriptionHeader: 0,
                dateHeader: 0,
                amountHeader: 0,
                bankStatementHeader: 0
            };

            //
            // Determine the indicies of the headers
            for (let itemIndex = 0; itemIndex < page.contents.length; itemIndex++) {
                const item = page.contents[itemIndex];

                //
                // Determine the last index of the items with the page numbering
                if (item.str === maxPageNumber.toString()
                    && itemIndex >= 2
                    && page.contents[itemIndex - 1].str === '/'
                    && page.contents[itemIndex - 2].str === page.pageNumber.toString()) {
                    hotspots.pageNumbering = itemIndex;
                }

                if (hotspots.pageNumbering > 0 && item.str === 'Description' && itemIndex > hotspots.pageNumbering) {
                    hotspots.descriptionHeader = itemIndex;
                }

                if (hotspots.descriptionHeader > 0 && item.str === 'Booking Date' && itemIndex > hotspots.descriptionHeader) {
                    hotspots.dateHeader = itemIndex;
                }

                if (hotspots.dateHeader > 0 && item.str === 'Amount' && itemIndex > hotspots.dateHeader) {
                    hotspots.amountHeader = itemIndex;
                }

                if (hotspots.amountHeader > 0 && item.str.startsWith('Bank Statement Nr.') && itemIndex > hotspots.amountHeader) {
                    hotspots.bankStatementHeader = itemIndex;
                }
            }

            //
            // Cutoff the data to the relevant parts
            const start = hotspots.amountHeader + 1;
            const end = hotspots.bankStatementHeader;
            if (start === 0 || end === 0 || start > end) {
                return;
            }

            const cutoff = page.contents.slice(start, end);

            //
            // The font height for the amount text
            const amountHeight = 13.8;

            let transactionBeginIndex = 0;
            for (let itemIndex = 0; itemIndex < cutoff.length; itemIndex++) {
                const item = cutoff[itemIndex];

                //
                // If we have no transaction begin index, we need to find the start of a new transaction
                if (transactionBeginIndex === -1) {
                    if (item.str.length > 0 && item.height === amountHeight && !item.hasEOL) {
                        transactionBeginIndex = itemIndex;
                        continue;
                    }
                }

                //
                // If we have a transaction begin index we want to find the end of the transaction
                if (transactionBeginIndex !== -1 && isCurrencyString(item.str) && ! isDate(item.str)) {
                    const range = cutoff.slice(transactionBeginIndex, itemIndex + 1);
                    transactions.push(range);

                    transactionBeginIndex = -1;
                    continue;
                }
            }
        });

        return transactions;
    }

    /**
     * Gets the date of the transaction
     * @param context The parsed data context
     * @returns The date of the transaction
     */
    public getBookedAt (context: Array<TextItem>) : string|null {
        const dates = context.filter(item => isDate(item.str));
        return dates.length > 0 ? dates[0].str : null;
    }

    /**
     * Gets the amount of the transaction
     * @param context The parsed data context
     * @returns The amount of the transaction
     */
    public getAmount (context: Array<TextItem>) : string {
        const amounts = context.filter(item => isCurrencyString(item.str) && ! isDate(item.str));
        return amounts.length > 0 ? amounts[0].str.replaceAll(/[^\,\.\-\d]/g, '') : '';
    }

    /**
     * Gets the name of the transaction
     * @param context The parsed data context
     * @returns The name of the transaction
     */
    public getName (context: Array<TextItem>) : string {
        return context[0].str;
    }

    /**
     * Gets the description of the transaction
     * @param context The parsed data context
     * @returns The description of the transaction
     */
    public getDescription (context: Array<TextItem>) : string|null {
        const description = context.slice(1)
            .filter(item => !isDate(item.str) && !isCurrencyString(item.str))
            .map(item => item.str)
            .join('\n');

        return description.length > 0 ? description : null;
    }
}
