import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function pagination({
  numPage,
  setCurrentPage,
  currentPage,
  prevPageHandler,
  nextPageHandler,
}) {
  return (
    <div className='flex justify-center'>
      <nav aria-label='Page navigation example'>
        <ul className='list-style-none flex'>
          <li onClick={prevPageHandler}>
            <Link className='pointer-events-none relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400'>
              Previous
            </Link>
          </li>
          {numPage.map((page, index) => (
            <li
              key={index}
              onClick={() => setCurrentPage(page)}
              className={page == currentPage ? 'bg-primary-100' : ''}
            >
              <Link
                className='relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'
                to='/'
              >
                {page}
              </Link>
            </li>
          ))}

          <li onClick={nextPageHandler}>
            <Link className='relative block rounded bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'>
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default pagination
