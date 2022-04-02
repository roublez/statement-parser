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
     * Constructs the transaction
     * @param bookedAt The date of the transaction
     * @param amount The amount of the transaction
     * @param name The name of the transaction
     * @param description The description of the transaction
     */
    constructor (bookedAt: string|null, amount: string, name: string, description: string|null) {
        this.bookedAt = bookedAt;
        this.amount = amount;
        this.name = name;
        this.description = description;
    }
};
