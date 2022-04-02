import CSV_N26Converter from "./bank-statement/csv/N26Converter";

import PDF_N26Converter from "./bank-statement/pdf/N26Converter";
import PDF_DKBConverter from "./bank-statement/pdf/DKBConverter";
import PDF_DKBCreditConverter from "./bank-statement/pdf/DKBCreditConverter";

export const bankStatementCsvConverters : Array<any> = [
    CSV_N26Converter
];

export const bankStatementPdfConverters : Array<any> = [
    PDF_N26Converter,
    PDF_DKBConverter,
    PDF_DKBCreditConverter
];
