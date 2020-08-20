import { Schema, model } from 'mongoose';

const authorSchema = new Schema({
  name: String,
  age: Number,
  gender: String,
});

export const AuthorModel = model('Author', authorSchema);
