const express = require('express')
const app = express()

const UserServices = require('./userServices')

const userServices = new UserServices()

app.get('/users', async (req, res, next) => {
  
  try {
    const users = await userServices.getUsers()
    res.status(200).json({
      data: users,
      message: 'users listed'
    })
    
  } catch (error) {
    next(error)
  }
})

app.get('/users/:userId', async (req, res, next) => {
  const { userId } = req.params
  try {
    const user = await userServices.getUsersId(userId)
    res.status(200).json({
      data: user,
      message: 'User retrieved'
    })
    
  } catch (error) {
    next(error)
  }
})

app.post('/users/create', async (req, res, next) => {
  const { body: user } = req
  try {
    const createdUserId = await usersService.createUser({ user })
    res.status(201).json({
      data: createdUserId,
      message: 'User created'
    })
    
  } catch (error) {
    next(error)
  }
})

app.listen(3000,() => {
  console.log(`Server Listen in Port 3000`)
})

