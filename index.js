const express = require("express");
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
// const helmet = require('helmet');
const cors = require("cors");
require("./utils/dbSQL.js");
const app = express();
const port = process.env.PORT || 5000;

var corsOptions = {
  origin: ["https://alimentacion.vercel.app", "http://localhost:3000"],
  credentials: true,
};
//Router
const userRouter = require("./routes/userRoutes.js");
// const router = require('./routes/routes');

//Middlewaress
const middle404 = require("./middlewares/error404.js");

//Rutas
// app.use(helmet());
app.set("trust proxy", 1);
app.use(express.json());
app.use(cors(corsOptions));
// app.use('/', router);
app.use("/api/", userRouter);
app.use(cookieParser());

//Read body request

app.use(express.json()); // Para habilitar recepción de datos JSON en una request //Es necesario??
app.use(express.urlencoded({ extended: true }));
const loggerFormat =
  ":method :url :status :response-time ms - :res[content-length]";
// app.use(morgan(loggerFormat, {
//     skip: function (req, res) {
//         return res.statusCode < 400
//     },
//     stream: process.stderr
// }));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Handles any requests that don't match the ones above
app.get("*", function (req, res) {
  const index = path.join(__dirname, "build", "index.html");
  res.sendFile(index);
});

app.use(middle404);
app.listen(port);

console.log("App is listening on port " + port);
