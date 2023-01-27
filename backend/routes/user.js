const express = require ('express')


//controller function
const { loginUser ,signupUser,getAllUsers, deleteUser,getOneUser,updateUser} = require('../controllers/userController')

const router = express.Router()
router.post('/', signupUser)
router.get('/getUser', getAllUsers)
router.get('/:id', getOneUser)

router.delete('/:id', deleteUser)
router.patch('/:id', updateUser)





module.exports = router