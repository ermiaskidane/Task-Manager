import React from 'react'
import { Link } from 'react-router-dom'

function footer() {
  const footerYear = new Date().getFullYear()
  return (
    <div className='flex items-center justify-center flex-wrap bg-gray-700 p-6  w-full fixed bottom-0 z-10 mb-0'>
      <div className='flex items-center flex-shrink-0 text-white mr-6'>
        <Link
          className='text-white block no-underline hover:text-white hover:no-underline text-center'
          to='/'
        >
          <p className='text-sm pl-2 text-center'>
            Copyright &copy; {footerYear} All rights reserved
          </p>
        </Link>
      </div>
    </div>
  )
}

export default footer
