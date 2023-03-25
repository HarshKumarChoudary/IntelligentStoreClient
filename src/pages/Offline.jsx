import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import styles from '../styles';
import { CustomButton } from '../components';
import coder from '../assets/coder.webp';

const Offline = () => {

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  return (
    <>
      <div className="flex-1">
        <div>
          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className={`${styles.headText}text-base font-semibold leading-7 text-indigo-600`}>Security Solution</h2>
                <br />
                <br />
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Everything to secure your product
                </p>
                <p className="mt-6 text-lg leading-8 text-pink-600">
                  We provide blockchain based solution, to uniquely identify your product <br /> <p className={`${styles.infoText} text-green-500`}>ANYTIME, ANYWHERE !!</p>
                </p>
              </div>
              <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <div className="sm:flex hidden flex-row justify-center gap-4">
                  <CustomButton
                    btnType="button"
                    title={address ? 'Upload the batch of Products' : 'Connect Wallet to generate QR'}
                    styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                    handleClick={() => {
                      if (address) navigate('upload')
                      else connect()
                    }}
                  />
                </div>
              </div>
              <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <div className="sm:flex hidden flex-row justify-center gap-4">
                  <CustomButton
                    btnType="button"
                    title={'Want to validate product?'}
                    styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                    handleClick={() => {
                      navigate('validate')
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Offline