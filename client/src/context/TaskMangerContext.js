import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const TaskManagerContext = createContext()

export const TaskManagerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  const [message, setMessage] = useState(null)
  // const [taskEdit, setTaskEdit] = useState({
  //   task: {},
  //   edit: false,
  // })

  const fetchTask = async () => {
    const { data } = await axios.get('http://localhost:5002/getAllTask')
    setTasks(data)
    // console.log(data)
    setIsLoading(false)
  }

  // configuration for post, put and delete request
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const addTask = async (taskToAdd) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5002/createTask',
        taskToAdd,
        config
      )
      // setTasks([data, ...taskToAdd])
      console.log('add', data)
    } catch (error) {
      console.log(error.message)
      const err = error.message
      setMessage(err)

      // clear error message after 1000ms
      setTimeout(() => {
        setMessage('')
      }, 2000)
    }
  }

  const deleteTask = async (task) => {
    if (window.confirm('are you sure you want to delete?')) {
      try {
        const { data } = await axios.delete(
          `http://localhost:5002/removeTask/${task._id}`,
          config
        )
        console.log('delete data', data)
        // setTasks(tasks.filter((t) => t.id !== task._id))
        setTasks(data)
        // setRefresh((prevState) => !prevState)
      } catch (error) {
        console.log(error.message)
        const err = error.message
        setMessage(err)

        // clear error message after 1000ms
        setTimeout(() => {
          setMessage('')
        }, 1000)
      }
    }
  }

  const updateTask = async (taskToAdd, taskId) => {
    try {
      // console.log('add before data')
      const { data } = await axios.put(
        `http://localhost:5002/update/${taskId}`,
        taskToAdd,
        config
      )
      console.log('add', data)
    } catch (error) {
      console.log(error.message)
      const err = error.message
      setMessage(err)

      // clear error message after 1000ms
      setTimeout(() => {
        setMessage('')
      }, 2000)
    }
  }

  return (
    <TaskManagerContext.Provider
      value={{
        isLoading,
        tasks,
        message,
        fetchTask,
        addTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskManagerContext.Provider>
  )
}

export default TaskManagerContext
