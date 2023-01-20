const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')



//Get All Users
// This is a GET method
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }
    return users
})


// Create a new User
//This is a POST Method
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body
    //Confirm data supplied  by User
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All Fields are required' })
    }

    //Check if user exists

    const duplicate = await User.findOne({ username }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: `User not ADDED! There's a user with similar name` })
    }

    //Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10)
    const userObject = { username, "password": hashedPassword, roles }


    //create and store new User

    const user = await User.create(userObject)
    if (user) {
        res.status(201).json({ message: `New user ${username} ADDED` })
    } else {
        res.status(400).json({ message: 'Invalid user data provide. Please check and retry.' })
    }
})

//Update a user.
//This is a PATCH Method
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password } = req.body

    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active != 'boolean') {
        res.status(400).json({ message: "All fields are required" })
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }
    const duplicate = await User.findOne([username]).lean().exec()
    //Allow updates to the original user
    if (duplicate && !duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: "Duplicate username" })
    }

    user.username = username
    user.roles = roles
    user.active = active


    if (password) {
        //Hash Password
        user.password = await bcrypt.hash(password, 10)
    }
    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username}'  ' updated.` })
})

//Delete a User
//This is a DELETE Method
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: "User ID required to delete" })
    }
    const notes = await Note.findOne({ user: id }).lean().exec()
    if (notes?.length) {
        return res.status(400).json({ message: "User has Assigned notes" })
    }
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: "User Not found!" })
    }
    const result = await user.deleteOne()
    const reply = `Username ${result.username} with id ${result._id} deleted`

    res.json(reply)
})

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser }