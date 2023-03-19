import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import TaskManagerContext from '../context/TaskMangerContext'

function AddTask() {
  const taskInfo = localStorage.getItem('taskInfo')
    ? JSON.parse(localStorage.getItem('taskInfo'))
    : null

  const { addTask } = useContext(TaskManagerContext)

  const nameInfo = taskInfo ? taskInfo.name : ''
  const descriptionInfo = taskInfo ? taskInfo.description : ''
  const statusInfo = taskInfo ? taskInfo.status : ''
  const levelInfo = taskInfo ? taskInfo.priorityLevel : ''
  const dateInfo = taskInfo ? taskInfo.date : ''

  const [name, setName] = useState(nameInfo)
  const [description, setDescription] = useState(descriptionInfo)
  const [status, setStatus] = useState(statusInfo)
  const [priorityLevel, setPriorityLevel] = useState(levelInfo)
  const [date, setDate] = useState(dateInfo)

  const [message, setMessage] = useState(null)

  const navigate = useNavigate()

  const location = useLocation()

  // const { id } = useParams()

  // local storage have to be removed to stay clear when we want to
  useEffect(() => {
    localStorage.removeItem('taskInfo')
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }
    // if we come over edit button or we have the query parameter
    // if (location.search.length != 0) {
    //   const getAllTask = async () => {
    //     const { data } = await axios.get('http://localhost:5002/getAllTask')
    //     setName(data.name)
    //     setName(data.description)
    //     setName(data.status)
    //     setName(data.priorityLevel)
    //     setName(data.date)
    //     console.log(data)
    //   }
    //   getAllTask()
    // }
  })

  //  dont forget that post will occur when "location.search" doesnt exist but edit will be when it exist
  // use if statement
  const submitHandler = async (e) => {
    e.preventDefault()
    // console.log('hello world')
    const taskToAdd = {
      name,
      description,
      status,
      priorityLevel,
      date,
    }
    console.log(taskToAdd)
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    //  handle put and post request based on the location.search
    try {
      if (location.search.length != 0) {
        const taskId = location.search.split('=')[1]
        console.log('edit', taskId)
        const { data } = await axios.put(
          `http://localhost:5002/update/${taskId}`,
          taskToAdd,
          config
        )

        console.log('edit', data)
        navigate('/')
      } else {
        addTask(taskToAdd)
        // const { data } = await axios.post(
        //   'http://localhost:5002/createTask',
        //   AddTask,
        //   config
        // )
        // console.log('add', data)
        navigate('/')
      }

      localStorage.removeItem('taskInfo')
    } catch (error) {
      console.log(error.message)
      const err = error.message
      setMessage(err)
    }
  }
  return (
    <form className='lg:mt-28 sm:mt-60 xs:mt-60' onSubmit={submitHandler}>
      {message && (
        <h3 className=' text-red-600 capitalize bg-rose-300 w-fit my-0 mx-auto py-1.5 px-3 rounded-lg'>
          {message}
        </h3>
      )}
      <h2 className='my-6 text-xl font-medium leading-tight text-gray-700 text-center font-bold'>
        {location.search.length != 0 ? 'Edit Task' : 'Add Task'}
      </h2>
      <div className='flex flex-col items-center '>
        <div className=' relative mb-3 w-1/2' data-te-input-wrapper-init>
          <input
            type='text'
            className='peer block min-h-[auto] w-full rounded border-2 border-gray-600 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 placeholder:text-neutral-700 '
            // id='exampleFormControlInputText'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className=' relative mb-3 w-1/2' data-te-input-wrapper-init>
          <input
            type='text'
            className='peer block min-h-[auto] w-full rounded border-2 border-gray-600 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 placeholder:text-neutral-700 '
            id='exampleFormControlInputText'
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className=' relative mb-3 w-1/2' data-te-input-wrapper-init>
          <select
            className='peer block min-h-[auto] w-full rounded border-2 border-gray-600 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 placeholder:text-neutral-700 '
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            data-te-select-init
          >
            <option value='InProgress'>InProgress</option>
            <option value='Completed'>Completed</option>
            <option value='Overdue'>Overdue</option>
          </select>
        </div>
        <div className=' relative mb-3 w-1/2' data-te-input-wrapper-init>
          <input
            type='text'
            className='peer block min-h-[auto] w-full rounded border-2 border-gray-600 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 placeholder:text-neutral-700 '
            id='exampleFormControlInputText'
            placeholder='priorityLevel'
            value={priorityLevel}
            onChange={(e) => setPriorityLevel(e.target.value)}
            required
          />
        </div>
        <div className=' relative mb-3 w-1/2' data-te-input-wrapper-init>
          <input
            type='date'
            className='peer block min-h-[auto] w-full rounded border-2 border-gray-600 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 placeholder:text-neutral-700 '
            id='exampleFormControlInputText'
            placeholder='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button
          type='submit'
          className=' inline-block rounded border-2 border-gray-600  px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-gray transition duration-150 ease-in-out hover:border-gray-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-gray-600 focus:border-gray-600 focus:text-gray-600 focus:outline-none focus:ring-0 active:border-gray-600 active:text-gray-600 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
          data-te-ripple-init
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default AddTask
