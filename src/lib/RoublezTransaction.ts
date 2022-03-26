export default class RoublezTransaction {

    /**
     * The name of the transaction
     */
    public readonly name: string;

    /**
     * The description of the transaction
     */
    public readonly description: string;

    /**
     * The amount of the transaction
     */
    public readonly amount: number;

    /**
     * The date of the transaction
     */
    public readonly bookedAt: Date;

    /**
     * Constructs the transaction
     * @param name The name of the transaction
     * @param description The description of the transaction
     * @param amount The amount of the transaction
     * @param bookedAt The date of the transaction
     */
    constructor (name: string, description: string, amount: number, bookedAt: Date) {
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.bookedAt = bookedAt;
    }
};
