const express = require('express')
const router = express.Router()
const { getAllUsers, deleteUser, updateUser, createNewUser } = require('../controllers/usersController')

router.route('/', )
    .get(getAllUsers)
    .post(createNewUser)
    .patch(updateUser)
    .delete(deleteUser)


module.exports = router