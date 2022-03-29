import Converter from "../contracts/Converter";

export default abstract class BaseConverter<ParsableType, ConvertTargetType, ContextType> implements Converter<ParsableType> {

    /**
     * The parsable file to convert
     */
    public readonly parsable: ParsableType;

    /**
     * Constructs the BankStatementConverter object
     * @param parsable The parsable file to convert
     */
    constructor (parsable: ParsableType) {
        this.parsable = parsable;
    }

    /**
     * Checks whether the converter can convert the parsable
     * @returns Whether the converter can convert the parsable
     */
    public canConvert () : boolean {
        return true;
    }

    /**
     * Prepares the data in an array format for multiple items
     * @returns The prepared array formatted data
     */
    public prepareToConvert () : Array<ContextType> {
        return [];
    }

    /**
     * Tries to convert the data into a list of roublez transactions
     * @returns The converted roublez transactions
     */
    convert () : Array<ConvertTargetType> {
        return [];
    }
}
