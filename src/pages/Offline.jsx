import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles';
import { Navbar } from '../components';

const Offline = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className="flex-1 mt-2 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
      <Navbar display="0" />
      <div className={`flex flex-col ${styles.hocContainer}`}>
          <div className={`flex flex-col ${styles.hocContentBox}`}>
          <div className={`flex flex-col ${styles.hocBodyWrapper}`}>
            <div className="flex flex-col w-full mb-16">
              <h1 className={`flex ${styles.headText} head-text`}>Security Solution</h1>
              <br />
              <p className={`text-3xl font-bold tracking-tight font-white-500 sm:text-4xl ${styles.infoText}`}>
                Everything to secure your product
              </p>
            </div>
          </div>
          <div className='flex flex-col mb-32'>
            <div className='flex flex-row'>
              <div className='flex flex-1'>
                <button className={`${styles.btn} bg-yellow-500`} onClick={() => { navigate('validate') }}>Validate the QR code</button>
              </div>  
            </div>
          </div>
          <p className={`mb-32 ${styles.footerText}`}>Made with 💖 by Harsh Kumar Choudhary</p>
        </div>
        </div>
      </div>
    </>
  )
}

export default Offline