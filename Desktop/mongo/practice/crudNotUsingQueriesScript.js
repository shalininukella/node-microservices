import mongoose from "mongoose";
import User from "./User.js";

//connect to the mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

async function run() {
  try {
    //create
    //it usually be created again and again whenever we run the script, but i set the name: { unique: true},
    // so whenever we run the script again it will throw the
    // error: E11000 duplicate key error collection: test.users index: name_1 dup key: { name: "ram" }
    //so comment this create method when you wanna test the update, read and delete methods
    const user = await User.create({
      name: "ram",
      age: 22,
      email: "RAM@gmail.com",
      hobbies: ["astrolgoy", "wisdom giving"],
      address: {
        street: "Main street",
        city: "Hyderabad",
      },
    });

    //update
    user.name = "krishna";
    user.save();
    console.log(user);

    //read
    const user2 = await User.findById("684c839a1777bdc5ac949e04");
    console.log(user2);

    const user3 = await User.find({ name: "ram" });
    console.log(user3);

    //delete
    const user4 = await User.deleteOne({ name: "ram" });
    console.log(user4);
  } catch (e) {
    //errors like, if the type of age is Number and if we give age: "one", then it will throw an error
    console.log(e.message);
  }
}
run();
