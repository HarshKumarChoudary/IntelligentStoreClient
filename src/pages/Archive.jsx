import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../components';
import { useStateContext } from '../context';
import Home from './Home';

const Archive = () => {
    const { isSuccess, setIsSuccess } = useStateContext();

    return (
        <div>
            <div className='font-epilogue font-semibold text-[18px] text-white grid grid-cols-2 divide-x-{1} place-items-center'>
                <CustomButton
                    btnType="button"
                    title={'Successful Campaigns'}
                    styles={isSuccess ? 'bg-green-500' :''}
                    handleClick={() => { setIsSuccess(true); }}
                />
                <CustomButton
                    btnType="button"
                    title={'Un-Successful Campaigns'}
                    styles={!isSuccess ? 'bg-green-500' : ''}
                    handleClick={() => { setIsSuccess(false); }}
                />
            </div>
            <br />
            <Home status={isSuccess} title={isSuccess? 'All Successful Campaigns':'All Un-Successful Campaigns'} />
        </div>
    )
}

export default Archive