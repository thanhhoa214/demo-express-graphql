import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
});

export const BookModel = model('Book', bookSchema);
