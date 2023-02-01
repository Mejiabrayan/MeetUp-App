import React from 'react';

export default function HeroSection() {
  return (
    <div className='bg-white md-screen flex flex-col items-center justify-center'>
      <div className='w-full flex flex-row justify-between items-center'>
        <div className='w-1/2 md:w-1/3 text-center'>
          <h2 className='text-4xl font-bold text-black my-8'>
            <span className='text-red-500'>Find Events </span> <br />{' '}
            <span className='text-red-500'>Near You</span>{' '}
            <span className='bg-gradient-to-r text-red-500'>
              &
            </span>{' '}
            Meet Like-Minded Developers
          </h2>
          <button className='bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
           Join Now
          </button>
        </div>
        <div className='w-1/2 md:w-2/3'>
          <img
            className='h-full object-cover'
            src='https://img.freepik.com/free-vector/online-world-concept-illustration_114360-1007.jpg?w=996&t=st=1667988583~exp=1667989183~hmac=f8ad736d067180cd8b9604f9f37d5469da2018f241b6ad5a86450e8fe4dbdf9c'
            loading='lazy'
            alt='welcome'
          />
        </div>
      </div>
    </div>
  );
}