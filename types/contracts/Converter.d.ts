import RoublezTransaction from "../lib/RoublezTransaction";
import Parsable from "./Parsable";
export default interface Converter {
    /**
     * The parsable file to convert
     */
    readonly parsable: Parsable;
    /**
     * Convert the data
     * @param parsable The parsable file to convert
     */
    convert(parsable: Parsable): Array<RoublezTransaction>;
    /**
     * Checks whether the converter can convert the data
     * @param parsable The parsable file to check
     */
    canConvert(parsable: Parsable): boolean;
}
