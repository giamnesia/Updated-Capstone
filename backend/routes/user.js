const express = require ('express')


//controller function
const { loginUser ,signupUser,getAllUsers, deleteUser,getOneUser} = require('../controllers/userController')

const router = express.Router()
router.post('/', signupUser)
router.get('/getUser', getAllUsers)
router.get('/:id', getOneUser)

router.delete('/:id', deleteUser)





module.exports = router