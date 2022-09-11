export default interface Converter<ParsableType> {

    /**
     * The parsable file to convert
     */
    readonly parsable: ParsableType;

    /**
     * Checks whether the converter can convert the data
     */
    canConvert () : boolean;

    /**
     * Prepares the data in an array format for multiple items
     */
    prepareToConvert () : Array<any>;

    /**
     * Convert the data
     */
    convert () : void;
}
