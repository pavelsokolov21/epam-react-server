const express = require("express");
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");
const app = express();
const cors = require("cors");
const keys = require("./keys/index");

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

async function start() {
  try {
    await mongoose.connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    app.listen(PORT, () => {
      console.log("Sever is running");
    });
  } catch (e) {
    console.log(e);
  }
}

start();
