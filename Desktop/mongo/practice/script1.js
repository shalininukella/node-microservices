import mongoose from "mongoose";
import User from "./User.js";

// async function connectDB() {
//     try {
//         await mongoose.connect("mongodb://127.0.0.1:27017");
//         console.log('connected');
//     } catch (err) {
//         console.log("error connection")
//     }
// }
// connectDB();

//or

//connect to the mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

// //just creating a user object
// const user = new User({ name: 'shalini', age: 21 });

// //save that in the db - save is an asynchronous fucntion so .then
// user.save().then(() => console.log('user saved'));

//or
async function run() {
  const user = await User.create({ name: "ram", age: 22 });
  // const user = new User({ name: 'shalini', age: 21 });
  // await user.save();
  await user.save();
  console.log("user saved");
  console.log(user);
}
run();



