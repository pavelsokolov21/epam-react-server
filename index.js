const express = require("express");
const cors = require("cors");
const filmsRoutes = require("./routes/films");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/api/films", filmsRoutes);

app.listen(PORT, () => {
  console.log("Sever is running");
});