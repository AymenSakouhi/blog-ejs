import mongoose from "mongoose";

let db = {};
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@blog-website.5tnvsiu.mongodb.net/blog-website?retryWrites=true&w=majority`;

const mongoConnect = (cb) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      cb();
    })
    .catch((e) => console.log(e));
};

export default mongoConnect;
