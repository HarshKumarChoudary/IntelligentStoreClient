import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import FundCard from './FundCard';
import { loader } from '../assets';

const DisplayNFT = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }
  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <div className='grid grid-rows-1 grid-flow-col gap-4'>
            <Skeleton animation="wave" variant="rectangular" width={288} height={385} />
            <Skeleton animation="wave" variant="rectangular" width={288} height={385} />
            <Skeleton animation="wave" variant="rectangular" width={288} height={385} />
            <Skeleton animation="wave" variant="rectangular" width={288} height={385} />
          </div>
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#ffffff]">
            No Campaigns Yet.
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard 
          key={campaign.id}
          {...campaign}
          handleClick={() => handleNavigate(campaign)}
        />)}
      </div>
    </div>
  )
}

export default DisplayNFT