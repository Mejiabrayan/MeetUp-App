import React from 'react';
import { GoLocation } from 'react-icons/go';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <nav className='bg-transparent top-0 w-full z-50'>
      <div className='container mx-auto flex items-center justify-between px-6 py-3'>
        <Link to={'/'} className='text-lg font-medium text-black'>
          <GoLocation className='mr-2 inline-block text-red-500' /> MeetUp App
        </Link>
        <div className='flex items-center'>
          <Link to={'/'} className='text-lg font-medium text-black mr-4'>
            Home
          </Link>
          <Link to={'/login'} className='items-center'>
            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
              Login{' '}
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg> */}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
