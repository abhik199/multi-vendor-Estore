import express from "express";
import cors from "cors";
import morgan from "morgan";
import rootRoute from "./routes/root.route";
import connects from "./config/db.connection";
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3001;

app.use("/api/v1", rootRoute);

connects();

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
