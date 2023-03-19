import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import AdImage from '../components/assets/adams.jpg'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  console.log(user)

  return (
    isAuthenticated && (
      <div className='flex justify-center mt-28'>
        <div className='flex flex-col block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700'>
          <a href='#!'>
            <img className='rounded-t-lg' src={AdImage} alt={user.name} />
          </a>
          <div className='p-6'>
            <h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50'>
              {user.name}
            </h5>
            <p className='mb-4 text-base text-neutral-600 dark:text-neutral-200'>
              {user.email ? user.email : user.nickname}
            </p>
            <Link
              to='/'
              className='inline-block rounded self-center bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]'
              data-te-ripple-init
              data-te-ripple-color='light'
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    )
  )
}

export default Profile
