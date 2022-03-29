export default class RoublezTransaction {

    /**
     * The date of the transaction
     */
    public readonly bookedAt: string|null;

    /**
     * The amount of the transaction
     */
    public readonly amount: string;

    /**
     * The name of the transaction
     */
    public readonly name: string;

    /**
     * The description of the transaction
     */
    public readonly description: string|null;

    /**
     * The category of the transaction (if part of the document)
     */
    public readonly category: string|null;

    /**
     * Constructs the transaction
     * @param bookedAt The date of the transaction
     * @param amount The amount of the transaction
     * @param name The name of the transaction
     * @param description The description of the transaction
     * @param category The category of the transaction (if part of the document)
     */
    constructor (bookedAt: string|null, amount: string, name: string, description: string|null, category: string|null) {
        this.bookedAt = bookedAt;
        this.amount = amount;
        this.name = name;
        this.description = description;
        this.category = category;
    }
};
