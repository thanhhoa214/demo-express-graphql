"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootSchemaType = void 0;
const graphql_1 = require("graphql");
const author_1 = require("../models/author");
const book_1 = require("../models/book");
const BookFields = {
    id: { type: graphql_1.GraphQLString },
    name: { type: graphql_1.GraphQLString },
    genre: { type: graphql_1.GraphQLString },
    authorId: { type: graphql_1.GraphQLString },
};
// const DUMMY_DATABASE = {
//   books: [
//     { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
//     { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//     { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
//     { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
//     { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
//   ],
//   authors: [
//     { id: '1', name: 'Author 1', age: 25, gender: 'Male' },
//     { id: '2', name: 'Author 2', age: 28, gender: 'Male' },
//     { id: '3', name: 'Author 3', age: 40, gender: 'Female' },
//     { id: '4', name: 'Author 4', age: 15, gender: 'Female' },
//   ],
// };
let AuthorType;
let BookType;
BookType = new graphql_1.GraphQLObjectType({
    name: 'Book',
    fields: () => (Object.assign(Object.assign({}, BookFields), { author: {
            type: AuthorType,
            resolve: (parent) => author_1.AuthorModel.findById(parent.authorId),
        } })),
});
AuthorType = new graphql_1.GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        age: { type: graphql_1.GraphQLInt },
        gender: { type: graphql_1.GraphQLString },
        books: {
            type: graphql_1.GraphQLList(BookType),
            resolve: (parent) => book_1.BookModel.find({ authorId: parent.id }),
        },
    }),
});
const RootQueryType = new graphql_1.GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        books: {
            type: graphql_1.GraphQLList(BookType),
            resolve: () => book_1.BookModel.find(),
        },
        authors: {
            type: graphql_1.GraphQLList(AuthorType),
            resolve: () => author_1.AuthorModel.find(),
        },
        book: {
            type: BookType,
            args: { id: { type: graphql_1.GraphQLString } },
            resolve: (_, { id }) => book_1.BookModel.findById(id),
        },
        author: {
            type: AuthorType,
            args: { id: { type: graphql_1.GraphQLString } },
            resolve: (_, { id }) => author_1.AuthorModel.findById(id),
        },
    },
});
const BookMutation = new graphql_1.GraphQLObjectType({
    name: 'BookMutation',
    fields: {
        addBook: {
            type: BookType,
            args: BookFields,
            resolve: (_, args) => {
                const book = new book_1.BookModel(args);
                return book.save();
            },
        },
    },
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                age: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                gender: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
                const author = new author_1.AuthorModel({
                    name: args.name,
                    age: args.age,
                    gender: args.gender,
                });
                return author.save();
            }),
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                genre: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                authorId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve: (_, args) => {
                const book = new book_1.BookModel(args);
                return book.save();
            },
        },
    },
});
exports.RootSchemaType = new graphql_1.GraphQLSchema({
    query: RootQueryType,
    mutation: Mutation,
});
//# sourceMappingURL=schema.js.map