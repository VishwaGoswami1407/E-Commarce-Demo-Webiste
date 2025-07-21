const express = require("express");
const app = express();
const PORT = 8080;
require("dotenv").config();
const connectedDB = require("./DB/connectDB");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/index");

//db
connectedDB();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is connected to port ${PORT}`);
});
