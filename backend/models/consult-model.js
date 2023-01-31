const mongoose = require('mongoose')
const Schema = mongoose.Schema

const consultSchema = new Schema({
    purpose: String,
    diagnosis: String, 
    description: String, 
    treatment: String,
    bp: String,
    weight: String,
    height: String,
    bloodsugar: String,
    attendingDoc: {
        type: String, 
        trim: true
    },
    address:{
        type:String
    },
    gender:{
        type:String
    },
    age:{
      type:Number
    },
    patientID:String,
    remarks:String,
    fname:String,
    mname:String,
    lname:String,
}, { timestamps: true })

// create new collection
module.exports = mongoose.model('BE_diagnosis', consultSchema)

