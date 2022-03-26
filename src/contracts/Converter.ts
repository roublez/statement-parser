import RoublezTransaction from "../lib/RoublezTransaction";
import Parsable from "./Parsable";

export default interface Converter {

    /**
     * The parsable file to convert
     */
    readonly parsable: Parsable;

    /**
     * Checks whether the converter can convert the data
     */
    canConvert () : boolean;

    /**
     * Convert the data
     */
    convert () : Array<RoublezTransaction>;
}
