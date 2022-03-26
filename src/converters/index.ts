import N26CsvConverter from "./bank-statement/N26CsvConverter";

export type BankStatementCsvConverterTypes = (
    typeof N26CsvConverter
)

export const bankStatementCsvConverters : Array<BankStatementCsvConverterTypes> = [
    N26CsvConverter
];
