import RoublezTransaction from "../lib/RoublezTransaction";
import BaseConverter from "./BaseConverter";
export default abstract class BankStatementConverter<ParsableType, ContextType> extends BaseConverter<ParsableType, RoublezTransaction, ContextType> {
    /**
     * Tries to convert the data into a list of roublez transactions
     * @returns The converted roublez transactions
     */
    convert(): Array<RoublezTransaction>;
    /**
     * Gets the date of the transaction
     * @param context The parsed data context
     * @returns The date of the transaction
     */
    getBookedAt(context: ContextType): string | null;
    /**
     * Gets the amount of the transaction
     * @param context The parsed data context
     * @returns The amount of the transaction
     */
    getAmount(context: ContextType): string;
    /**
     * Gets the name of the transaction
     * @param context The parsed data context
     * @returns The name of the transaction
     */
    getName(context: ContextType): string;
    /**
     * Gets the description of the transaction
     * @param context The parsed data context
     * @returns The description of the transaction
     */
    getDescription(context: ContextType): string | null;
    /**
     * Gets the category of the transaction (if part of the document)
     * @param context The parsed data context
     * @returns The category of the transaction
     */
    getCategory(context: ContextType): string | null;
}
