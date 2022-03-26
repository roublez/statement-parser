import Converter from "../../contracts/Converter";
import Parsable from "../../contracts/Parsable";
import RoublezTransaction from "../../lib/RoublezTransaction";
import CsvParsableFile from "../../parsers/CsvParsableFile";

const headers = {
    'en': [ 'Date', 'Payee', 'Account number', 'Transaction type', 'Payment reference', 'Amount (EUR)', 'Amount (Foreign Currency)', 'Type Foreign Currency', 'Exchange Rate' ]
}

export default class N26CsvConverter implements Converter {

    /**
     * The parsable file to convert
     */
    public readonly parsable: Parsable;

    /**
     * Constructs the N26CsvConverter object
     * @param parsable The parsable file to convert
     */
    constructor (parsable: Parsable) {
        this.parsable = parsable;
    }

    /**
     * Checks whether the converter can convert the parsable
     * @returns Whether the converter can convert the parsable
     */
    canConvert () : boolean {
        return true;
    }

    /**
     * Tries to convert the data into a list of roublez transactions
     * @returns The converted roublez transactions
     */
    convert () : Array<RoublezTransaction> {
        const rows = (this.parsable as CsvParsableFile).getRows();
        if (rows.length === 0) {
            return [];
        }

        const assumedHeaders = this.parsable.parser.getAssumedLocale() === 'en' ? headers.en : null;
        const fileHeaders = rows[0];
        if (assumedHeaders !== null) {
            const equalHeaders = assumedHeaders.length === fileHeaders.length && assumedHeaders.every((value, index) => value === fileHeaders[index]);

            //
            // The csv file has headers but they do not match our assumed headers
            if (! equalHeaders) {
                return [];
            }
        }

        let transactions: Array<RoublezTransaction> = [];
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (row.length !== 9) {
                continue;
            }

            transactions.push(this.getTransactionFromRow(row))
        }

        return transactions;
    }

    /**
     * Converts the row into a roublez transaction
     * @param row The row to convert
     * @returns The converted roublez transaction
     */
    private getTransactionFromRow (row: Array<string>) : RoublezTransaction {
        const date = row[0];
        const payee = row[1];
        const paymentReference = row[4];
        const amount = row[5];

        let description: string|null = paymentReference === '-' ? '' : paymentReference;

        if (description.length === 0) {
            description = null;
        }

        return new RoublezTransaction(date, amount, payee, description, null);
    }
}
