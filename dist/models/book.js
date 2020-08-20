"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    name: String,
    genre: String,
    authorId: String,
});
exports.BookModel = mongoose_1.model('Book', bookSchema);
//# sourceMappingURL=book.js.map