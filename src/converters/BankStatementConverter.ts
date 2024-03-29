import RoublezTransaction from "../lib/RoublezTransaction";
import BaseConverter from "./BaseConverter";

export default class BankStatementConverter<ParsableType, ContextType> extends BaseConverter<ParsableType, RoublezTransaction, ContextType> {

    /**
     * Tries to convert the data into a list of roublez transactions
     */
    public convert () : void {
        let transactions: Array<RoublezTransaction> = [];

        this.prepareToConvert().forEach((context: ContextType) => {
            try {
                transactions.push(new RoublezTransaction(
                    this.getName(context),
                    this.getDescription(context),
                    this.getAmount(context),
                    this.getBookedAt(context),
                    this.getIgnore(context),
                    this.getCategory(context)
                ));
            } catch (e) {}
        });

        this.data = transactions;
    }

    /**
     * Gets the name of the transaction
     * @param context The parsed data context
     * @returns The name of the transaction
     */
    public getName (context: ContextType) : string {
        return '';
    }

    /**
     * Gets the description of the transaction
     * @param context The parsed data context
     * @returns The description of the transaction
     */
    public getDescription (context: ContextType) : string|null {
        return null;
    }

    /**
     * Gets the amount of the transaction
     * @param context The parsed data context
     * @returns The amount of the transaction
     */
    public getAmount (context: ContextType) : string {
        return '';
    }

    /**
     * Gets the date of the transaction
     * @param context The parsed data context
     * @returns The date of the transaction
     */
    public getBookedAt (context: ContextType) : string|null {
        return null;
    }

    /**
     * Gets the ignore state
     * @param context The parsed data context
     * @returns Whether the transaction should be ignored in analytics
     */
    public getIgnore (context: ContextType) : boolean {
        return false;
    }

    /**
     * Gets the name of the category
     * @param context The parsed data context
     * @returns The name of the category
     */
    public getCategory (context: ContextType) : string|null {
        return null;
    }
}
