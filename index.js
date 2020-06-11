const express = require("express");
const filmsRoutes = require("./routes/films");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/api/films", filmsRoutes);

app.listen(PORT, () => {
  console.log("Sever is running");
});