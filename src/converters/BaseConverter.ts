import Converter from "../contracts/Converter";

export default class BaseConverter<ParsableType, ConvertTargetType, ContextType> implements Converter<ParsableType> {

    /**
     * The parsable file to convert
     */
    public readonly parsable: ParsableType;

    /**
     * The converted end result
     */
    protected data: Array<ConvertTargetType>;

    /**
     * Constructs the BankStatementConverter object
     * @param parsable The parsable file to convert
     */
    constructor (parsable: ParsableType) {
        this.parsable = parsable;
        this.data = [];
    }

    /**
     * Checks whether the converter can convert the parsable
     * @returns Whether the converter can convert the parsable
     */
    public canConvert () : boolean {
        return false;
    }

    /**
     * Prepares the data in an array format for multiple items
     * @returns The prepared array formatted data
     */
    public prepareToConvert () : Array<ContextType> {
        return [];
    }

    /**
     * Tries to convert the data into a list of roublez data
     */
    public convert () : void {
        //
    }
}
