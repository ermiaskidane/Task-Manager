'use strict'

const express = require('express')
require('dotenv').config()
const cors = require('cors')
const axios = require('axios')
const mongoose = require('mongoose')
const app = express()
// const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

// lets connect our node app to mongodb
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
})

// Collection
const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  // status: [
  //   {
  //     inProgress: { type: String, required: true },
  //     completed: { type: String, required: true },
  //     overDue: { type: String, required: true },
  //   },
  // ],
  priorityLevel: String,
  date: String,
})

// Model
const taskModel = mongoose.model('taskManager', taskSchema)

app.get('/', (req, res) => {
  res.send('home page endpoint API is calling')
})

app.get('/getAllTask', async (req, res) => {
  // const pageSize = 10
  // const page = Number(req.query.pageNumber) || 1

  // const keyword = req.query.keyword
  //   ? {
  //       name: {
  //         $regex: req.query.keyword,
  //         $options: 'i',
  //       },
  //     }
  //   : {}

  // const count = await taskModel.countDocuments({ ...keyword })

  // const allTask = await taskModel
  //   .find({ ...keyword })
  //   .limit(pageSize)
  //   .skip(pageSize * (page - 1))

  // res.json({ allTask, page, pages: Math.ceil(count / pageSize) })
  //  legacy code
  let allTask = await taskModel.find()
  console.log(allTask)
  res.json(allTask)
})

// to get a single task
// http://localhost:5002/task?taskId=6412156518ff524d503fe02b
app.get('/task', async (req, res) => {
  const taskId = req.query.taskId
  let allTask = await taskModel.findById(taskId)
  res.json(allTask)
})

app.post('/createTask', async (req, res) => {
  const { name, description, status, priorityLevel, date } = req.body

  let newTask = await taskModel.create({
    name,
    description,
    status,
    priorityLevel,
    date,
  })
  res.json(newTask)
})

app.put('/update/:id', async (req, res) => {
  const taskId = req.params.id
  const task = await taskModel.findById(taskId)

  if (task) {
    ;(task.name = req.body.name),
      (task.description = req.body.description),
      (task.status = req.body.status),
      (task.priorityLevel = req.body.priorityLevel),
      (task.date = req.body.date),
      await task.save()
    const allTask = await taskModel.find({})
    res.json(allTask)
  } else {
    res.status(404)
  }
})

app.delete('/removeTask/:id', async (req, res) => {
  // const task = await taskModel.findById(req.params.id)
  const taskId = req.params.id
  const task = await taskModel.findByIdAndDelete(taskId)
  const alltask = await taskModel.find({})
  res.send(alltask)
  // if (task) {
  //   await task.remove()
  //   const alltask = await taskModel.find({})
  //   res.json(alltask)
  // } else {
  //   res.status(404)
  // }
})
const PORT = process.env.PORT || 5002

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
})
