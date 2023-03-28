const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const cors = require("cors");

mongoose.connect(
  `mongodb+srv://r:20020201045@cluster0.20iex.mongodb.net/dataTable?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("success.....");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/router", require("./routers/routers"));
app.use("/router", require("./routers/firstroomRouter"));
app.use("/router", require("./routers/secondroomRouter"));
app.use("/router", require("./routers/firstroompay"));
app.use("/router", require("./routers/secondroompay"));
app.use("/router", require("./routers/deluxeroom"));
app.use("/router", require("./routers/deluxeroompay"));

app.listen(process.env.port, () => {
  console.log(`this app is run port on ${process.env.port}`);
});
