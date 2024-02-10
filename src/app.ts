import express from "express";
import cors from "cors";
import rootRoute from "./routes/root.route";
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3001;

app.use("/api/v1", rootRoute);

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
