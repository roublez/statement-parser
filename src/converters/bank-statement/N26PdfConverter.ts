import { TextItem } from "pdfjs-dist/types/src/display/api";
import PdfParsableFile from "../../parsers/PdfParsableFile";
import BankStatementConverter from "../BankStatementConverter";

/**
 * Responsible for converting pdf parsed data from N26 statements.
 */
export default class N26PdfConverter extends BankStatementConverter<PdfParsableFile, Array<TextItem>> {

    /**
     * Constructs the N26PdfConverter object
     * @param parsable The parsable file to convert
     */
    constructor (parsable: PdfParsableFile) {
        super(parsable);
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
            let dateIndex = 0;
            let amountIndex = 0;
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
                if (transactionBeginIndex !== -1) {
                    const previousItem = itemIndex > 0 ? cutoff[itemIndex - 1] : null;
                    const nextItem = itemIndex < (cutoff.length - 1) ? cutoff[itemIndex + 1] : null;
                    const hasEmptyPreviousItem = previousItem && previousItem.str === '' && previousItem.height === 0 && !previousItem.hasEOL;
                    const hasEmptyNextItemWithEOL = nextItem && nextItem.str === '' && nextItem.height === 0 && nextItem.hasEOL;
                    const isRegularAmount = hasEmptyPreviousItem && item.height === amountHeight && item.hasEOL;
                    const isLastAmount = hasEmptyPreviousItem && hasEmptyNextItemWithEOL && item.height === amountHeight && !item.hasEOL;

                    if (isRegularAmount || isLastAmount) {
                        const transactionRange = cutoff.slice(transactionBeginIndex, itemIndex);
                        transactions.push(transactionRange);
                        transactionBeginIndex = -1;
                        continue;
                    }
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
        return null;
    }

    /**
     * Gets the amount of the transaction
     * @param context The parsed data context
     * @returns The amount of the transaction
     */
    public getAmount (context: Array<TextItem>) : string {
        console.log(context);
        return 'null';
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
        return null;
    }

    /**
     * Gets the category of the transaction (if part of the document)
     * @param context The parsed data context
     * @returns The category of the transaction
     */
    public getCategory (context: Array<TextItem>) : string|null {
        return null;
    }
}
