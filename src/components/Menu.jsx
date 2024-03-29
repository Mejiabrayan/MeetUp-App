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
          <Link to={'/login'} className='text-lg font-medium text-black'>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
