const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const schema = require("./graphql/schema");
const resolver = require("./graphql/resolver");

app.use(cors());
app.use(express.json());

app.use(graphqlHTTP({
  schema,
  rootValue: resolver,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log("Sever is running");
});