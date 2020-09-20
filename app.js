const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const { graphqlHTTP } = require('express-graphql'); //middleware for handling graphql related api's

const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index'); //schema types for graphql
const graphQlResolvers = require('./graphql/resolvers/index'); //mutation types for graphql

require('dotenv').config();

const PORT = process.env.port || 8000;

const app = express(); //express server instance

app.use(cors());

app.use(bodyParser.json());

//graphql API
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

//Mongodb connection
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => handleError(error));
