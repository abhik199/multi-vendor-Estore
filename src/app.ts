import express from "express";
import rootRoute from "./routes/root.route";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3001;

// app.use("/api/v1", rootRoute);

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
