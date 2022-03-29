import Converter from "../contracts/Converter";
export default abstract class BaseConverter<ParsableType, ConvertTargetType, ContextType> implements Converter<ParsableType> {
    /**
     * The parsable file to convert
     */
    readonly parsable: ParsableType;
    /**
     * Constructs the BankStatementConverter object
     * @param parsable The parsable file to convert
     */
    constructor(parsable: ParsableType);
    /**
     * Checks whether the converter can convert the parsable
     * @returns Whether the converter can convert the parsable
     */
    canConvert(): boolean;
    /**
     * Prepares the data in an array format for multiple items
     * @returns The prepared array formatted data
     */
    prepareToConvert(): Array<ContextType>;
    /**
     * Tries to convert the data into a list of roublez transactions
     * @returns The converted roublez transactions
     */
    convert(): Array<ConvertTargetType>;
}
