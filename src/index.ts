import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { RootSchemaType } from './schema/schema';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 3000;

const dbName = 'test';
const MONGOOSE_CONNECTION_STRING = `mongodb+srv://rin:rinrinrin@clustertest.9kk8g.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(MONGOOSE_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// tslint:disable-next-line:no-console
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  // tslint:disable-next-line:no-console
  console.log('Connection Successful!');
});

app.use(cors());
app.use(
  '/api',
  graphqlHTTP({
    schema: RootSchemaType,
    graphiql: true,
  })
);

app.use('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.warn('Server started on port http://localhost:' + PORT);
});
