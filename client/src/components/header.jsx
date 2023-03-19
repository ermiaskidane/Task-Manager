import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

function Header() {
  const { isAuthenticated } = useAuth0()
  return (
    <nav className='flex items-center justify-between flex-wrap bg-gray-800 p-6 fixed w-full z-10 top-0'>
      <div className='flex items-center flex-shrink-0 text-white mr-6'>
        <a
          className='text-white no-underline hover:text-white hover:no-underline'
          href='#'
        >
          <span className='text-2xl pl-2'>
            <i className='em em-grinning'></i> Task Manager
          </span>
        </a>
      </div>

      <div
        className='w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block pt-6 lg:pt-0'
        id='nav-content'
      >
        <ul className='list-reset lg:flex justify-end flex-1 items-center'>
          <li className='mr-3'>
            <Link
              to='/'
              className='inline-block py-2 px-4 text-white no-underline'
            >
              Home
            </Link>
          </li>
          <li className='mr-3'>
            <Link
              className='inline-block text-white no-underline hover:text-gray-200 hover:text-underline py-2 px-4'
              to='/addTask'
            >
              Add Task
            </Link>
          </li>
          {!isAuthenticated && (
            <li className='mr-3'>
              <Link
                className='inline-block text-white no-underline hover:text-gray-200 hover:text-underline py-2 px-4'
                to='/login'
              >
                Login
              </Link>
            </li>
          )}
          {isAuthenticated && (
            <>
              <li className='mr-3'>
                <Link
                  className='inline-block text-white no-underline hover:text-gray-200 hover:text-underline py-2 px-4'
                  to='/logout'
                >
                  Logout
                </Link>
              </li>
              <li className='mr-3'>
                <Link
                  className='inline-block text-white no-underline hover:text-gray-200 hover:text-underline py-2 px-4'
                  to='/user'
                >
                  Profile
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Header
