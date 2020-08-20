"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./schema/schema");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const PORT = 3000;
const dbName = 'test';
const MONGOOSE_CONNECTION_STRING = `mongodb+srv://rin:rinrinrin@clustertest.9kk8g.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose_1.default.connect(MONGOOSE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose_1.default.connection;
// tslint:disable-next-line:no-console
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    // tslint:disable-next-line:no-console
    console.log('Connection Successful!');
});
app.use(cors_1.default());
app.use('/api', express_graphql_1.graphqlHTTP({
    schema: schema_1.RootSchemaType,
    graphiql: true,
}));
app.use('/', (req, res) => {
    res.send('Hello world!');
});
app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.warn('Server started on port http://localhost:' + PORT);
});
//# sourceMappingURL=index.js.map