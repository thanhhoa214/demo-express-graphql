"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorModel = void 0;
const mongoose_1 = require("mongoose");
const authorSchema = new mongoose_1.Schema({
    name: String,
    age: Number,
    gender: String,
});
exports.AuthorModel = mongoose_1.model('Author', authorSchema);
//# sourceMappingURL=author.js.map