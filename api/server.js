const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const cookieParser = require("cookie-parser");

const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
  })
);

dotenv.config();

const parcelRouter = require("./routes/parcel");
const userRouter = require("./routes/users");

const db = process.env.DB;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// database connection
mongoose.Promise = global.Promise;
mongoose.connect(
  db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) console.log({ DATABASE_ERR: err.message });
    console.log("SC Database connected!");
  }
);

// app.get("/", (req, res) => {
//   res.json("Welcome to Safe Courier!");
// });

app.use("/api/v1", parcelRouter);
app.use("/api/v1", userRouter);

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.send(path.join(__dirname, "client/build"));
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`API is live at http://localhost:${PORT}`);
  console.log(`API is live at https://mnscapi.herokuapp.com/`);
});
