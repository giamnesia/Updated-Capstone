
const express = require('express')
const mongoose = require('mongoose')
const healthRoutes = require('./routes/health')
const doctorRoutes = require('./routes/doctor')
const consultRoutes = require('./routes/consult')
 const userRoutes = require('./routes/user')
 const path = require("path");
 const decodeToken = require("./middleware");
 require('dotenv').config()

// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use(decodeToken);


// routes in website
app.use('/portal/health', healthRoutes)
app.use('/portal/doctor', doctorRoutes)
app.use('/portal/consult', consultRoutes)
app.use('/portal/user', userRoutes) 


const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is Running");
  });
}


//connect to DB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        // listen for request
    app.listen(process.env.PORT, () => {
    console.log('Connected to database and port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
   
 
    
