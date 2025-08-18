//this file is just to define the schema
import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },

  age: {
    type: Number,
    min: 1,
    max: 100,
    validate: {
      validator: (value) => value % 2 === 0,
      message: (props) => `${props.value} is not and even number`,
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
    immutable: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  address: addressSchema,

  bestfriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User", // what model does the ObjectId is referecing to
  },
});

//to add methods for each instance of our schema, here arrow funtions doesn't work
userSchema.methods.sayHi = function () {
    console.log(`hi ${this.name}`); // this is the current instance object
}

//to add the methods for the overall model like findById method, use statics
userSchema.statics.findByName = function (name1) {
    // return this.where('name').equals(name1);
    //or 
    // return this.where({ name: new RegExp(name1, 'i') });
    //or
    return this.find({ name: new RegExp(name1, 'i') });
}


//to add on the query 
userSchema.query.byName = function(name1){
    return this
        .where({ name: new RegExp(name1, 'i') });
}

//on each object 
userSchema.virtual('namedEmail').get(function () {
    return `${this.name} ${this.email}`;
})

//middlewares
userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    // throw new Error('failed save');//runs if next(); is not written
    next();
});

userSchema.post('save', function (doc, next) {
    doc.sayHi();
    next();
})

const User = mongoose.model("User", userSchema);
export default User;
