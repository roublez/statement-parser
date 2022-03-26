import EntityType from "./enums/EntityType";
import StatementParser from "./lib/StatementParser";

// @ts-ignore
window.SPStatementParser = StatementParser;
// @ts-ignore
window.SPEntityType = EntityType;

export { StatementParser, EntityType };
