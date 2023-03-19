import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const TaskManagerContext = createContext()

export const TaskManagerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [tasks, setTasks] = useState([])
  // const [taskEdit, setTaskEdit] = useState({
  //   task: {},
  //   edit: false,
  // })

  const fetchTask = async () => {
    const { data } = await axios.get('http://localhost:5002/getAllTask')
    setTasks(data)
    console.log(data)
  }

  const addTask = async (taskToAdd) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      'http://localhost:5002/createTask',
      taskToAdd,
      config
    )
    setTasks([data, ...taskToAdd])
    // console.log('add', data)
  }

  const deleteTask = async (task) => {
    if (window.confirm('are you sure you want to delete?')) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }

        const { data } = await axios.delete(
          `http://localhost:5002/removeTask/${task._id}`,
          config
        )
        console.log('delete data', data)
        setTasks(tasks.filter((t) => t.id !== task._id))
        // setTasks(data)
        // setRefresh((prevState) => !prevState)
      } catch (error) {
        console.log(error.message)
        const err = error.message
        // setMessage(err)
      }
    }
  }

  return (
    <TaskManagerContext.Provider
      value={{ isLoading, tasks, fetchTask, addTask, deleteTask }}
    >
      {children}
    </TaskManagerContext.Provider>
  )
}

export default TaskManagerContext
