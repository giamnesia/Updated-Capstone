const patientInfo = require("../models/health-model");
const doctorInfo = require("../models/doctor-model");
const consultInfo = require("../models/consult-model"); //doctorInfo

const consult = require("../models/consult-model");
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const getAllPatients = async (req, res) => {
  // const user_id = req.user._id


  const totalResults = await patientInfo.countDocuments({});


  const results = await patientInfo
    .find({}).sort({
      createdAt: -1,
    });


  const search = req.query.search || "";
  let gender = req.query.gender || "Gender";
  let address = req.query.address || "Address";
  let services = req.query.services || "Services";
  let month = req.query.month || "Month";


  const addressOptions = [
    "Agoho",
    "Anahawan",
    "Anas",
    "Apad Lutao",
    "Apad Quezon",
    "Apad Taisan",
    "Atulayan",
    "Baclaran",
    "Bagong Silang",
    "Balibago",
    "Bangkuruhan",
    "Bantolinao",
    "Barangay I",
    "Barangay II",
    "Barangay III",
    "Barangay IV",
    "Barangay V",
    "Bigaan",
    "Binutas",
    "Biyan",
    "Bukal",
    "Buli",
    "Dapdap",
    "Dona Aurora",
    "Dominlog",
    "Guinosayan",
    "Ipil",
    "Kalibo",
    "Kapaluhan",
    "Katangtang",

    "Kigtan",

    "Kinalin Ibaba",

    "Kinalin Ilaya",

    "Kinamaligan",

    "Kumaludkod",

    "Kunalum",

    "Kuyaoyao",

    "Lagay",

    "Lainglaingan",

    "Lungib",

    "Mabini",

    "Madlangdungan",

    "Maglipad",

    "Maligaya",

    "Mambaling",

    "Manhulugin",

    "Marilag",

    "Mulay",

    "Pandanan",

    "Pansol",

    "Patihan",

    "Pinagbayanan",

    "Pinagkamaligan",

    "Pinagsakahan",

    "Pinagtalleran",

    "Rizal Ibaba",

    "Rizal Ilaya",

    "Sabang Uno",

    "Sabang Dos",

    "Salvacion",

    "San Quintin",

    "San Roque Ibaba",

    "San Roque Ilaya",

    "Santa Cecilia",

    "Santa Maria",

    "Santa Milagrosa",

    "Santa Rosa",

    "Santo Angel",

    "Santo Domingo",

    "Sinag",

    "Sumilang",

    "Sumulong",

    "Tabansak",
    "Talingting",

    "Tamis",

    "Tikiwan",

    "Tiniguiban",

    "Vinas",

    "Villa Magsino",

    "Villa San Isidro",
    "Yaganak",
  ];

  const genderOptions = ["Male", "Female"];

  const servicesOptions = [
    "Consultation-OPD",

    "TB-DOTS",

    "Covid 19 Vaccination",

    "Animal Bite Treatment",

    "Medical Clearance",

    "Environmental & Sanitation Program",

    "Post- Natal Care",

    "Maternal Care",

    "Family Planning Program",

    "Nutrition Program",

    "Laboratory Examination",
  ];


  const monthOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];



  address === "Address"
    ? (address = [...addressOptions])
    : (address = req.query.address.split(","));

  gender === "Gender"
    ? (gender = [...genderOptions])
    : (gender = req.query.gender.split(","));

    services === "Services"
    ? (services = [...servicesOptions])
    : (services = req.query.services.split(","));

    month === "Month"
    ? (month = [...monthOptions])
    : (month = req.query.month.split(","));

   
    
  const filtered = await consultInfo.find({
    $and: [{ address: [...address] }, { gender: [...gender] }, { purpose: [...services] }, { month: [...month] }],
  })

  //count filtered
  const totalResultsFiltered = await consultInfo.find({
    $and: [{ address: [...address] }, { gender: [...gender] }, { purpose: [...services] }, { month: [...month] }],
  }).countDocuments({});



  const patient = await patientInfo.find({}).sort({ createdAt: -1 }); 
  res.status(200).json({
    results: results,

    patient: patient,
    filtered: filtered,
    address: addressOptions,
    gender: genderOptions,
    services:servicesOptions,
    month:monthOptions,
    totalResultsFiltered: totalResultsFiltered,
  

  });
};


const getSortPatient = async (req, res) => {
  const page_size = 3;
  const page = parseInt(req.query.page || "0");

  const totalResults = await patientInfo.countDocuments({});
  const results = await patientInfo
    .find({})
    .limit(page_size)
    .skip(page_size * page);
  res.status(200).json({ results: results, totalResults: totalResults });
};

//COUNT DOCUMENT
const getCount = async (req, res) => {
  // const query = { status: "Pending" };
  // const countPatient = await patientInfo.countDocuments(query); //FINDING CATEGORY

  const count = await patientInfo.estimatedDocumentCount();
  const countDoc = await doctorInfo.estimatedDocumentCount();
  const consult = await consultInfo.estimatedDocumentCount();

  const month = await patientInfo.aggregate([
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
  ]);

  res.status(200).json({
    totalPatient: count,
    totalMonth: month,
    totalDoctor: countDoc,
    totalConsult: consult,
  });
};

// get a single patient
const getOnePatient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No record found!" });
  }

  const patientinfo = await patientInfo.findById(id);

  if (!patientinfo) {
    return res.status(404).json({ error: "No record found!" }); // if no record found
  }

  res.status(200).json(patientinfo);
};

const getAggPatient = async (req, res) => {
  const { id } = req.params;
  const patientFind = await patientInfo.findById({ _id: id });

  const patient = await consultInfo.aggregate([
    {
      $match: { patientID: id.toString() },
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

  res.status(200).json({ patient, patientFind });
};

// create a new patient
const createPatient = async (req, res) => {
  const {
    fname,
    mname,
    lname,
    gender,
    age,
    address,
    contact,
    birthDate,
  } = req.body;

  let emptyFields = [];

  if (!fname) {
    emptyFields.push("fname");
  }
  if (!lname) {
    emptyFields.push("lname");
  }
  if (!gender) {
    emptyFields.push("gender");
  }
  if (!age) {
    emptyFields.push("age");
  }
  if (!address) {
    emptyFields.push("address");
  }
  if (!birthDate) {
    emptyFields.push("contact");
  }

  //Error Message for adding new form
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields", emptyFields });
  }

  // adding document to database
  try {
    // const user_id = req.user._id   FOR AUTHENTICATION
    const patientinfo = await patientInfo.create({
      fname,
      mname,
      lname,
      gender,
      age,
      address,
      contact,
      birthDate,
    });
    // const patientinfo = await patientInfo.create({fname, mname, lname, gender, age, address, contact, user_id})
    res.status(200).json(patientinfo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete patient
const deletePatient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No record found!" });
  }

  const patientinfo = await patientInfo.findOneAndDelete({ _id: id });

  if (!patientinfo) {
    return res.status(400).json({ error: "No record found!" }); // if no record found
  }

  res.status(200).json(patientinfo);
};

// upadate patient
const updatePatient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No record found!" });
  }

  const patientinfo = await patientInfo.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!patientinfo) {
    return res.status(400).json({ error: "No record found!" }); // if no record found
  }

  res.status(200).json(patientinfo);
};

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
  getSortPatient,
  createPatient,
  deletePatient,
  updatePatient,
  getCount,
  getAggPatient,
  searchPatient,
};
