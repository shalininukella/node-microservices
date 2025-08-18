//this file is just to define the schema
import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  street: String,
  city: String,
});

//create a schema - like a blueprint of how the User should look like
const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 100,

    //custom validation - these validations work only when the create or the save method is used,
    // but when we try to update, or find using any of the updateOne or findOne methods,
    // except the findById method, the same doc, it won't validate again
    validate: {
      validator: (value) => value % 2 === 0,
      message: (props) => `${props.value} is not an even number`, //when error occurs i.e is the validation fails
    },
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 10,
  },
  hobbies: [String],
  createdAt: {
    type: Date,
    // default: new Date(), // it's static, only created once when the schema is created, not everytime when the document is inserted into the collection
    // default: () => new Date();
    //or
    default: Date.now, // Date.now is a function
    immutable: true, //won't allow us to change, like when we do in the user creation, createdAt : 5
  },
  updatedAt: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
  // address: {
  //     street: String,
  //     city: String,
  // }
  address: addressSchema,
});

//export the model - just like an actual version of the schema - like an individual user object from the db that you can interract with
// "Create a model named User - "User", using the schema userSchema, and assign it to a constant called User - const User.";
const User = mongoose.model("User", userSchema);
export default User;

