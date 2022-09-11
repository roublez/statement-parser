export default class RoublezTransaction {

    /**
     * The name of the transaction
     */
    public readonly name: string;

    /**
     * The description of the transaction
     */
    public readonly description: string|null;

    /**
     * The amount of the transaction
     */
    public readonly amount: string;

    /**
     * The date of the transaction
     */
    public readonly bookedAt: string|null;

    /**
     * Whether the transaction should be ignored in analytics
     */
    public readonly ignore: boolean;

    /**
     * The name of the category
     */
    public readonly category: string|null;

    /**
     * Constructs the transaction
     * @param name The name of the transaction
     * @param description The description of the transaction
     * @param amount The amount of the transaction
     * @param bookedAt The date of the transaction
     * @param ignore Whether the transaction should be ignored in analytics
     * @param category The name of the category
     */
    constructor (name: string, description: string|null, amount: string, bookedAt: string|null, ignore: boolean, category: string|null) {
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.bookedAt = bookedAt;
        this.ignore = ignore;
        this.category = category;
    }
};
