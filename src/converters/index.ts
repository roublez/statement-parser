import N26CsvConverter from "./bank-statement/N26CsvConverter";
import N26PdfConverter from "./bank-statement/N26PdfConverter";

export type BankStatementCsvConverterTypes = (
    typeof N26CsvConverter
);

export type BankStatementPdfConverterTypes = (
    typeof N26PdfConverter
);

export const bankStatementCsvConverters : Array<BankStatementCsvConverterTypes> = [
    N26CsvConverter
];

export const bankStatementPdfConverters : Array<BankStatementPdfConverterTypes> = [
    N26PdfConverter
];
