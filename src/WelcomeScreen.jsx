import React from 'react';
import './WelcomeScreen.css';
import { FcGoogle } from 'react-icons/fc';
import { GoLocation } from 'react-icons/go';
import { IconContext } from 'react-icons';

function WelcomeScreen(props) {
  return props.showWelcomeScreen ? (
    <div className='WelcomeScreen'>
      <img
        className='welcome-screen-cover'
        src='https://img.freepik.com/free-vector/online-world-concept-illustration_114360-1007.jpg?w=996&t=st=1667988583~exp=1667989183~hmac=f8ad736d067180cd8b9604f9f37d5469da2018f241b6ad5a86450e8fe4dbdf9c'
        alt='MeetUp'
      />
      <div className='overlay'></div>
      <div className='container'>
        <h1 className='welcome-heading'>
          Welcome to <br />{' '}
          <span className='title-text'>
            MeetUp App
            <IconContext.Provider
              value={{
                color: 'red',
                className: 'location-pin',
              }}
            >
              <GoLocation />
            </IconContext.Provider>
          </span>
        </h1>
        <h2>
          Log in to see upcoming events around the world for full-stack
          developers 👨🏽‍💻
        </h2>
        <div className='button_cont' align='center'>
          <div className='google-btn'>
            <div className='google-icon-wrapper'>
              <FcGoogle className='google-icon' alt='Google sign-in' />
            </div>
            <button
              onClick={() => {
                props.getAccessToken();
              }}
              rel='nofollow noopener'
              className='btn-text'
            >
              <b>Sign in with google</b>
            </button>
          </div>
        </div>
        <a
          href='https://Mejiabrayan.github.io/MeetUp-App/privacy.html'
          rel='nofollow noopener'
        >
          Privacy policy
        </a>
      </div>
    </div>
  ) : null;
}
export default WelcomeScreen;
