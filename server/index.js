const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./src/config/db");
const schema = require("./src/schema/noteSchema");
const port = process.env.PORT || 4000;

connectDB();

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
