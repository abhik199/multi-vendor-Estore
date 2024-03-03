import { connect } from "mongoose";
// data
const local_db_url = "mongodb://127.0.0.1:27017/multi-vendor-ecommerce";

const live_db_url =
  "mongodb+srv://ecommerce:euxp7tjnWs1yAQvs@cluster0.iwpzd4g.mongodb.net/multi-vendor-ec?retryWrites=true&w=majority&appName=Cluster0";

async function connects() {
  return connect(local_db_url)
    .then(() => {
      console.log("Db connected successfully");
    })
    .catch((err: any) => {
      console.log(err);
    });
}

export default connects;
