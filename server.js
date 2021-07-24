const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const cookieParser = require("cookie-parser");

const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const parcelRouter = require("./routes/parcel");
const userRouter = require("./routes/users");

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
  })
);

dotenv.config();

const db = process.env.DB;
const PORT = process.env.PORT || 3020;

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

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.use("/api/v1", parcelRouter);
app.use("/api/v1", userRouter);

app.listen(PORT, () => {
  console.log(`API is live at http://localhost:${PORT}`);
  console.log(`API is live at https://safecour.herokuapp.com/`);
});
