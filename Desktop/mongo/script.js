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
    // const user = await User.create({
    //   name: "shalini",
    //   age: 26,
    //   email: "shalini@gmail.com",
    //   hobbies: ["astrolgoy", "wisdom giving"],
    //   address: {
    //     street: "Main street",
    //     city: "Hyderabad",
    //   },
    // });

    //update
    // const user = await User.findById("684c87d4478072139543ccc0");
    // user.age = 28;
    // user.save();

    // console.log(user);

    //read - find
    // const user2 = await User.findById("684c839a1777bdc5ac949e04");
    // console.log(user2);

    // const user3 = await User.find();
    // console.log(user3);

    //read using queries
    //   const user5 = await User.where("name")
    //       //   .equals("ram")
    //       .where("age")
    //       .gt(21)
    //       .lt(31)
    //       //   .limit(2)
    //       // .select("name");
    //       .populate('bestfriend'); // will elaborate the bestfriend k andar ka content bhi - like join in sql
    //   console.log(user5);
      
    //   user3[0].bestfriend = "684c896d5af08ea0cfc2e68f";
      //   await user3[0].save();
      
    //   const user6 = await User.findByName('Ram');
    //   console.log(user6)

    //   const user7 = await User.find().byName('ram')
    //   console.log(user7);

    //   const user8 = await User.findOne({ name: 'krishna' });
    //   console.log(user8.namedEmail);
    //   user8.sayHi();
    
      const user9 = await User.findOne({ name: 'shalini' });
      console.log(user9);
    //   await user9.save();
    //   console.log(user9);
     
    //delete
    // const user4 = await User.deleteOne({ name: "ram" });
    // console.log(user4);
  } catch (e) {
    console.log(e.message);
  }
}
run();
