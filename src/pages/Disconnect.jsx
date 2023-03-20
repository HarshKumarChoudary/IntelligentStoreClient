import React from 'react';
import { useStateContext } from '../context';
import { CustomButton } from '../components';
import { useNavigate } from 'react-router-dom';

const Disconnect = () => {
  const { disconnect, setIsActive } = useStateContext();
  const navigate = useNavigate();
  
  return (
    <CustomButton
      btnType="button"
      title={'Disconnect'}
      styles={'bg-[#FF0000]'}
      handleClick={() => {
        disconnect();
        navigate('/');
        setIsActive('dashboard');
      }}
    />
  )
}

export default Disconnect