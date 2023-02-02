const mongoose = require('mongoose')
const Schema = mongoose.Schema

const patientSchema = new Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    mname: {
        type: String,
      
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
    
        trim: true
    },
    birthDate:{
        type:Date,
        required:true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        trim: true
    },
   
}, { timestamps: true })


module.exports = mongoose.model('be_client', patientSchema)

