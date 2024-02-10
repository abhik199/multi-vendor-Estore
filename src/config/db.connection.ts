import { connect } from "mongoose";

async function connects() {
  return connect("mongodb://127.0.0.1:27017/ts")
    .then(() => {
      console.log("Db connected successfully");
    })
    .catch((err: any) => {
      console.log(err);
    });
}

export default connects;
