export default class InvalidEntityTypeError extends Error {

    /**
     * The entity type that was used
     */
    public readonly entityType: string;

    /**
     * Constructs the error message
     * @param entityType The type that was used
     */
    constructor (entityType: string) {
        super(`The entity type [${ entityType}] is not supported`);
        this.entityType = entityType;
    }
}
