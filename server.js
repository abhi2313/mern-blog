const express = require("express");

const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

connectDB();
const userRoutes = require("./routes/userRoutes");
const blogRoutes=require('./routes/blogRoutes')


app.use("/api/user/", userRoutes);
app.use("/api/blog",blogRoutes)

const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.status(200).send({
    message: "node server",
  });
});

app.listen(PORT, () => {
  console.log("server running on port ", PORT);
});
