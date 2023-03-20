import React, { useState, useEffect, useContext } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import Spinner from '../components/spinner'
import TaskMangerContext from '../context/TaskMangerContext'

function Home() {
  const { tasks, message, isLoading, fetchTask, deleteTask } =
    useContext(TaskMangerContext)

  // const [tasks, setTasks] = useState([])
  // const [message, setMessage] = useState(null)
  // const [refresh, setRefresh] = useState(false)

  const navigate = useNavigate()
  console.log(useAuth0())

  useEffect(() => {
    fetchTask()
    // const getAllTask = async () => {
    //   const { data } = await axios.get('http://localhost:5002/getAllTask')
    //   setTasks(data)
    //   console.log(data)
    // }
    // getAllTask()
  }, [])

  const deleteHandler = async (task) => {
    //  calling the deleteTask function in TaskManager context APi
    await deleteTask(task)
  }
  const editHandler = (edit) => {
    navigate(`/addTask?taskId=${edit._id}`)
    localStorage.setItem('taskInfo', JSON.stringify(edit))
    console.log('edit data')
  }

  return isLoading ? (
    <div className='flex flex-col lg:mt-28 sm:mt-60 xs:mt-60'>
      <Spinner />
    </div>
  ) : (
    <div className='flex flex-col lg:mt-28 sm:mt-60 xs:mt-60'>
      {message && (
        <h3 className=' text-red-600 capitalize bg-rose-300 w-fit my-0 mx-auto py-1.5 px-3 rounded-lg'>
          {message}
        </h3>
      )}
      <h2 className='my-6 text-xl font-medium leading-tight font-medium dark:border-neutral-50 text-center font-bold'>
        List of Tasks
      </h2>
      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='min-w-full text-left text-sm font-light'>
              <thead className='border-b font-medium dark:border-neutral-500'>
                <tr>
                  <th scope='col' className='px-6 py-4'>
                    #
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Name
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Description
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Status
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    PriorityLevel
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Date
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Edit
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Delete
                  </th>
                </tr>
              </thead>

              {tasks.map((task, index) => (
                <tbody key={task._id}>
                  <tr className='border-b dark:border-neutral-500'>
                    <td className='whitespace-nowrap px-6 py-4 font-medium'>
                      {index + 1}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 font-medium'>
                      {task.name}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4'>
                      {task.description}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4'>
                      {task.status}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4'>
                      {task.priorityLevel}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4'>{task.date}</td>
                    <td className='whitespace-nowrap px-6 py-4'>
                      <button
                        type='button'
                        className='inline-block rounded border-2 border-teal-400 px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-teal transition duration-150 ease-in-out hover:border-teal-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-teal-600 focus:border-teal-600 focus:text-teal-600 focus:outline-none focus:ring-0 active:border-teal-700 active:text-teal-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
                        data-te-ripple-init
                        onClick={() => editHandler(task)}
                      >
                        <FiEdit className='inline text-xl' />
                      </button>
                    </td>
                    <td className='whitespace-nowrap px-6 py-4'>
                      <button
                        type='button'
                        className='inline-block rounded border-2 border-red-600 px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-red-600 transition duration-150 ease-in-out hover:border-red-600-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-red-600-600 focus:border-red-600-600 focus:text-red-600-600 focus:outline-none focus:ring-0 active:border-red-600-700 active:text-red-600-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
                        data-te-ripple-init
                        onClick={() => deleteHandler(task)}
                      >
                        <AiFillDelete className='inline text-xl' />
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
