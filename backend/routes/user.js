const express = require ('express')


//controller function
const { loginUser ,signupUser } = require('../controllers/userController')

const router = express.Router()
router.post('/signup', signupUser)

//log in route


//sign up route

module.exports = router