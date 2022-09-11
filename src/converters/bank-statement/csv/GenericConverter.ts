import CSVParsableFile from "../../../parsers/CSVParsableFile";
import BankStatementConverter from "../../BankStatementConverter";

/**
 * Responsible for converting generic CSV files following a specified set of columns
 */
export default class GenericConverter extends BankStatementConverter<CSVParsableFile, Array<string>> {

    /**
     * Checks whether the converter can convert the parsable
     * @returns Whether the converter can convert the parsable
     */
    public canConvert () : boolean {
        const rows = this.parsable.data();

        //
        // A generic csv file must have at least two rows (1 header and 1 item)
        if (rows.length <= 1) {
            return false;
        }

        //
        // Check if the correct headers are being used
        const header = rows[0];
        if (header.join(',') !== 'Name,Description,Amount,Date,Ignore,Category') {
            return false;
        }

        return true;
    }

    /**
     * Removes the first line of the csv content and normlizes the data
     * @returns The rows of the CSV file
     */
    public prepareToConvert () : Array<Array<string>> {
        const rows = this.parsable.data();
        rows.shift();

        return rows;
    }

    /**
     * Gets the name of the transaction
     * @param context The parsed data context
     * @returns The name of the transaction
     */
    public getName (context: Array<string>) : string {
        return context[0];
    }

    /**
     * Gets the description of the transaction
     * @param context The parsed data context
     * @returns The description of the transaction
     */
    public getDescription (context: Array<string>) : string|null {
        if (context[1].length === 0) {
            return null;
        }

        return context[1];
    }

    /**
     * Gets the amount of the transaction
     * @param context The parsed data context
     * @returns The amount of the transaction
     */
    public getAmount (context: Array<string>) : string {
        return context[2];
    }

    /**
     * Gets the date of the transaction
     * @param context The parsed data context
     * @returns The date of the transaction
     */
     public getBookedAt (context: Array<string>) : string|null {
        return context[3];
    }

    /**
     * Gets the ignore state
     * @param context The parsed data context
     * @returns Whether the transaction should be ignored in analytics
     */
    public getIgnore (context: Array<string>) : boolean {
        const value = context[4];
        if (isNaN(value as any) && value == 'true') {
            return true;
        }

        return ! isNaN(value as any) && parseInt(value) === 1;
    }

    /**
     * Gets the name of the category
     * @param context The parsed data context
     * @returns The name of the category
     */
     public getCategory (context: Array<string>) : string|null {
        return context[5];
    }
}
