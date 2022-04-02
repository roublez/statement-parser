/**
 * Checks if the text is a valid date
 * @param string The text to test
 * @returns True if the text is a valid date
 */
export function isDate (string: string) : boolean {
    return /^\d{2}\.\d{2}\.\d{4}$/.test(string);
}

/**
 * Checks if the text is a valid currency string
 * @param string The text to test
 * @returns True if the text is a valid currency string
 */
export function isCurrencyString (string: string) : boolean {
    if (string.length === 0) {
        return false;
    }

    const result = string.match(/((EUR|USD|€|\$)\s?)?([+-]?[0-9|^.|^,]+)[\.|,]([0-9]+)\s?(EUR|USD|€|\$)?$/igm);

    return result !== null && result.length > 0 && result[0] === string;
}
