import React from 'react';
import { FcGoogle } from 'react-icons/fc';
// import { useHistory } from 'react-router-dom';

import '../styles/welcome-screen.module.css';

function LoginForm(props) {
//   const history = useHistory();

//   const handleLogin = () => {
//     props.getAccessToken();
//     history.push('/');
//   };

  return (
    <div className='bg-primary h-screen flex items-center justify-center'>
      <div className='w-full max-w-xs mx-auto'>
        <div className='bg-white rounded-lg shadow-xl overflow-hidden'>
          <img
            className='w-full h-48 object-cover object-center'
            src='https://img.freepik.com/free-vector/online-world-concept-illustration_114360-1007.jpg?w=996&t=st=1667988583~exp=1667989183~hmac=f8ad736d067180cd8b9604f9f37d5469da2018f241b6ad5a86450e8fe4dbdf9c'
            alt='MeetUp'
          />
          <div className='px-6 py-4'>
            <h1 className='text-3xl font-bold text-gray-900'>
              Welcome to MeetUp App
            </h1>
            <h2 className='text-gray-600 text-sm font-light'>
              Log in to see upcoming events around the world for full-stack
              developers 👨🏽‍💻
            </h2>
            <div className='mt-4'>
              <button
                // onClick={handleLogin}
                className='w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                <FcGoogle className='mr-2' alt='Google sign-in' /> Sign in with
                Google
              </button>
            </div>
            <div className='mt-4'>
              <a
                href='https://Mejiabrayan.github.io/MeetUp-App/privacy.html'
                rel='nofollow noopener'
                className='text-blue-500 font-bold text-sm hover:text-blue-800'
              >
                Privacy policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
