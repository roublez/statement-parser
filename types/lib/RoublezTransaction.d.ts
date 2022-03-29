export default class RoublezTransaction {
    /**
     * The date of the transaction
     */
    readonly bookedAt: string | null;
    /**
     * The amount of the transaction
     */
    readonly amount: string;
    /**
     * The name of the transaction
     */
    readonly name: string;
    /**
     * The description of the transaction
     */
    readonly description: string | null;
    /**
     * The category of the transaction (if part of the document)
     */
    readonly category: string | null;
    /**
     * Constructs the transaction
     * @param bookedAt The date of the transaction
     * @param amount The amount of the transaction
     * @param name The name of the transaction
     * @param description The description of the transaction
     * @param category The category of the transaction (if part of the document)
     */
    constructor(bookedAt: string | null, amount: string, name: string, description: string | null, category: string | null);
}
