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
    console.log(data)
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
        // const { allTask } = tasks
        // console.log('is this the Id ', task._id)
        // console.log(
        //   'what is wrong',
        //   task.allTask.filter((t) => t.id !== task._id)
        // )
        // console.log('delete data @@@@@@@@@@@ ', tasks)
        // console.log('delete data #############', tasks.allTask)
        // setTasks(
        //   tasks.allTask.filter((t) => t.id != task._id)
        //   // tasks.filter((task) => task.allTask.filter((t) => t.id != task._id))
        // )

        // console.log('delete data', allTask)
        // console.log(setTasks([...allTask, data]))
        // setTasks([...allTask, data])
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

  // const data = [
  //   {
  //     menuName: 'Hot dogs',
  //     menu: [
  //       { dishId: '1', dish_has_categories: [{ CategoryId: '8' }] },
  //       { dishId: '2', dish_has_categories: [{ CategoryId: '9' }] },
  //     ],
  //   },
  //   {
  //     menuName: 'Burgers',
  //     menu: [
  //       { dishId: '3', dish_has_categories: [{ CategoryId: '6' }] },
  //       { dishId: '4', dish_has_categories: [{ CategoryId: '4' }] },
  //     ],
  //   },
  //   { name: 'Drinks', menu: [] },
  // ]

  // const res = data.filter(x =>
  //   x.menu.some(y =>
  //     y.dish_has_categories.some(z => z.CategoryId === '8')
  // )
  // );
  // console.log(res)

  //  another nested array that has similarities
  //   const data = [{"guid":"j5Dc9Z","courses":[{"id":3,"name":"foo"}]},{"guid":"a5gdfS","courses":[{"id":1,"name":"bar"},{"id":3,"name":"foo"}]},{"guid":"jHab6i","courses":[{"id":7,"name":"foobar"}]}];
  // const courses = [1, 6, 3];

  // const r = data.filter(d => d.courses.every(c => courses.includes(c.id)));
  // console.log(r);

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
