const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    // patient: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Patient",
    // },

    // displayName: {
    //   type: String,
    // },
    userID: {
      type: String,
    },
    firstName:{
      type:String,
    },
   middleName:{
      type:String,
    },

    lastName:{
      type:String,
    },
    contact:{
      type:String,
    },
    gender:{
      type:String,
    },
    birthDate:{
      type:Date
    },
   specialization:{
      type:String
    },
    age:{
      type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("be_user", userSchema);