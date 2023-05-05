const mongoose = require("mongoose");
const url =
  "mongodb+srv://tia:tia@tiaa.xtlujex.mongodb.net/tiaa?retryWrites=true&w=majority";

module.exports.connect = () => {
  mongoose
    .set(
      'strictQuery', false
    )
    .connect(url, {
      // useCreateIndex: true,
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.log("Error: ", error));
};
