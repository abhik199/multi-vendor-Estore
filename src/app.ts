import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../public"));

import rootRoute from "./routes/root.route";
import connects from "./config/db.connection";
import errorHandler from "./middleware/errorHandler";

connects();

app.use(errorHandler);

app.use("/api/v1", rootRoute);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
