import RoublezTransaction from "../lib/RoublezTransaction";
import BaseConverter from "./BaseConverter";

export default abstract class BankStatementConverter<ParsableType, ContextType> extends BaseConverter<ParsableType, RoublezTransaction, ContextType> {

    /**
     * Tries to convert the data into a list of roublez transactions
     * @returns The converted roublez transactions
     */
    convert () : Array<RoublezTransaction> {
        let transactions: Array<RoublezTransaction> = [];

        this.prepareToConvert().forEach((context: ContextType) => {
            try {
                transactions.push(new RoublezTransaction(
                    this.getBookedAt(context),
                    this.getAmount(context),
                    this.getName(context),
                    this.getDescription(context)
                ));
            } catch (e) {}
        });

        return transactions;
    }

    /**
     * Gets the date of the transaction
     * @param context The parsed data context
     * @returns The date of the transaction
     */
    public getBookedAt (context: ContextType): string|null {
        return null;
    }

    /**
     * Gets the amount of the transaction
     * @param context The parsed data context
     * @returns The amount of the transaction
     */
    public getAmount (context: ContextType): string {
        return '';
    }

    /**
     * Gets the name of the transaction
     * @param context The parsed data context
     * @returns The name of the transaction
     */
    public getName (context: ContextType): string {
        return '';
    }

    /**
     * Gets the description of the transaction
     * @param context The parsed data context
     * @returns The description of the transaction
     */
    public getDescription (context: ContextType): string|null {
        return null;
    }
}
