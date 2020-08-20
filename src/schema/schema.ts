import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import { AuthorModel } from '../models/author';
import { BookModel } from '../models/book';

const BookFields = {
  id: { type: GraphQLString },
  name: { type: GraphQLString },
  genre: { type: GraphQLString },
  authorId: { type: GraphQLString },
};

let AuthorType: GraphQLObjectType;
let BookType: GraphQLObjectType;

BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    ...BookFields,
    author: {
      type: AuthorType,
      resolve: (parent) => AuthorModel.findById(parent.authorId),
    },
  }),
});

AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    books: {
      type: GraphQLList(BookType),
      resolve: (parent) => BookModel.find({ authorId: parent.id }),
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    books: {
      type: GraphQLList(BookType),
      resolve: () => BookModel.find(),
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve: () => AuthorModel.find(),
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve: (_, { id }) => BookModel.findById(id),
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLString } },
      resolve: (_, { id }) => AuthorModel.findById(id),
    },
  },
});

const BookMutation = new GraphQLObjectType({
  name: 'BookMutation',
  fields: {
    addBook: {
      type: BookType,
      args: BookFields,
      resolve: (_, args) => {
        const book = new BookModel(args);
        return book.save();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        gender: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const author = new AuthorModel({
          name: args.name,
          age: args.age,
          gender: args.gender,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => {
        const book = new BookModel(args);
        return book.save();
      },
    },
  },
});

export const RootSchemaType = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutation,
});
