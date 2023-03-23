import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../components';
import { useStateContext } from '../context';
import Home from './Home';

const Withdraw = () => {
  const { isSuccess, setIsSuccess } = useStateContext();

  return (
    <div>
      <Home withdrawn={1} status={isSuccess} title={'All Withdrawn Campaigns'} />
    </div>
  )
}

export default Withdraw