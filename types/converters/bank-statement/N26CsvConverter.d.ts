import Converter from "../../contracts/Converter";
import Parsable from "../../contracts/Parsable";
import RoublezTransaction from "../../lib/RoublezTransaction";
export default class N26CsvConverter implements Converter {
    /**
     * The parsable file to convert
     */
    readonly parsable: Parsable;
    /**
     * Constructs the N26CsvConverter object
     * @param parsable The parsable file to convert
     */
    constructor(parsable: Parsable);
    /**
     * Tries to convert the data into a list of roublez transactions
     * @returns The converted roublez transactions
     */
    convert(): Array<RoublezTransaction>;
    /**
     * Checks whether the converter can convert the parsable
     * @returns Whether the converter can convert the parsable
     */
    canConvert(): boolean;
    /**
     * Converts the row into a roublez transaction
     * @param row The row to convert
     * @returns The converted roublez transaction
     */
    private getTransactionFromRow;
}
