import Converter from "../contracts/Converter";

export default class InvalidConverterMatchingError extends Error {

    /**
     * The converters that were matched
     */
    public readonly converters: Array<Converter<any>>;

    /**
     * Constructs the error message
     * @param converters The matched converters
     */
    constructor (converters: Array<Converter<any>>) {
        if (converters.length === 0) {
            super('No converter found for the given entity type');
        } else {
            super('Multiple converters found for the given entity type');
        }
        console.log(converters);
        this.converters = converters;
    }

    /**
     * Checks whether no converters were matched
     * @returns True if no converters were matched
     */
    public matchedNoConverters () : boolean {
        return this.converters.length === 0;
    }

    /**
     * Checks whether multiple converters were matched
     * @returns True if multiple converters were matched
     */
    public matchedMultipleConverters () : boolean {
        return this.converters.length > 0;
    }
}
