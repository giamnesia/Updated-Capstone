const patientInfo = require('../models/health-model')
const doctorInfo = require('../models/doctor-model')
const consultInfo = require('../models/consult-model') //doctorInfo

const consult = require("../models/consult-model");
const mongoose = require('mongoose')

// get all patients
const getAllPatients = async (req, res) => {
    // const user_id = req.user._id

    const info = await patientInfo.find({}).sort({createdAt: -1}) //sort by date
    // const info = await patientInfo.find({user_id}).sort({createdAt: -1}) //sort by date  FOR AUTHENTICATION
    // const aggregatedDocs = await patientInfo.aggregate([
    //     {
    //       $group: {
    //         _id: { fname: "$fname", lname: "$lname" },
    //         docs: { $push: "$$ROOT" }
    //       }
    //     },
    //     {
    //       $match: {
    //         "docs.1": { $exists: true }
    //       }
    //     }
    //   ]);

    res.status(200).json(info)
}

//COUNT DOCUMENT 
const getCount = async (req, res) => {

    // const query = { status: "Pending" };
    // const countPatient = await patientInfo.countDocuments(query); //FINDING CATEGORY
    
    const count = await patientInfo.estimatedDocumentCount();
    const countDoc = await doctorInfo.estimatedDocumentCount();
    const consult = await consultInfo.estimatedDocumentCount();



    const month = await patientInfo.aggregate(
        [
            {
                $project:{
                 
                    month: {$month: '$createdAt' }
                }
            
            }
        ]
    )



    res.status(200).json({
      totalPatient: count,
      totalMonth:month,
      totalDoctor:countDoc,
      totalConsult:consult
    });
  };


// get a single patient
const getOnePatient = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({error: 'No record found!'})
    }

    const patientinfo = await patientInfo.findById(id)

    if (!patientinfo) {
        return res.status(404).json({error: 'No record found!'}) // if no record found
    }

    res.status(200).json(patientinfo)
}

const getAggPatient= async (req, res) => {

    const {id} = req.params
    const patientFind = await patientInfo.findById({ _id:id });
  
    const patient = await consultInfo.aggregate([
      {
        $match: { patientID: id.toString()},
      },
  
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: "be-diagnoses",
          localField: "patientID",
          foreignField: "_id",
          as: "consult",
        },
      },
    ]);
  
   
      res.status(200).json({patient,patientFind})
  };

// create a new patient
const createPatient = async (req, res) => 
{
    const {fname, mname, lname, gender, age, address, contact,birthDate} = req.body

    let emptyFields = []

    if (!fname) {
        emptyFields.push('fname')
    }
    if (!lname) {
        emptyFields.push('lname')
    }
    if (!mname) {
        emptyFields.push('mname')
    }
    if (!gender) {
        emptyFields.push('gender')
    }
    if (!age) {
        emptyFields.push('age')
    }
    if (!address) {
        emptyFields.push('address')
    }
    if (!contact) {
        emptyFields.push('contact')
    }
    if (!birthDate) {
        emptyFields.push('contact')
    }

    //Error Message for adding new form
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill all the fields', emptyFields})
    }


    // adding document to database
    try{
        // const user_id = req.user._id   FOR AUTHENTICATION
        const patientinfo = await patientInfo.create({fname, mname, lname, gender, age, address, contact,birthDate})
        // const patientinfo = await patientInfo.create({fname, mname, lname, gender, age, address, contact, user_id})
        res.status(200).json(patientinfo)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete patient
const deletePatient = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No record found!'})
     }
     
     const patientinfo = await patientInfo.findOneAndDelete({_id: id})

     if (!patientinfo) {
        return res.status(400).json({error: 'No record found!'}) // if no record found
    }

    res.status(200).json(patientinfo)
 
}

// upadate patient
const updatePatient = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No record found!'})
     }

     const patientinfo = await patientInfo.findOneAndUpdate({_id: id}, {...req.body})

     if (!patientinfo) {
        return res.status(400).json({error: 'No record found!'}) // if no record found
    }

    res.status(200).json(patientinfo)
}

const searchPatient = async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
     
            { fname: { $regex: req.query.search, $options: "i" } },
            { mname: { $regex: req.query.search, $options: "i" } },
            { lname: { $regex: req.query.search, $options: "i" } },
            { address: { $regex: req.query.search, $options: "i" } },

           
  
          ],
        }
      : [];
    const patient = await patientInfo.find(keyword);
    res.status(200).json(patient);
  };
  

module.exports = {
    getAllPatients,
    getOnePatient,
    createPatient, 
    deletePatient,
    updatePatient,
    getCount,
    getAggPatient,
    searchPatient
}