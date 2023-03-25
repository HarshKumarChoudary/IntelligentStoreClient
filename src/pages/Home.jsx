import React, { useState, useEffect } from 'react'

import { Sidebar, Navbar } from '../components';
import { DisplayNFT } from '../components';
import { useStateContext } from '../context'
import '../index.css';

// status = 1 -> ongoing, 2->sucessfull, 3-> not successfull.
const Home = ({ withdrawn, status, title }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns, getSuccessfullCampaigns, getUnSuccessfullCampaigns, getWithdrawnCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    let data = 0;
    if (withdrawn === 1) {
      data = await getWithdrawnCampaigns();
    }
    if(status === '1')
      data = await getCampaigns();
    else if (status === '2') {
        data = await getSuccessfullCampaigns();
      } else {
        data = await getUnSuccessfullCampaigns();
      }
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract, status]);

  return (
  <>
    <div className="ml-4 sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="mt-4 flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar display="1"/>
        <DisplayNFT
          title={title}
          isLoading={isLoading}
          campaigns={campaigns}
        />
      </div>
    </>
  )
}

export default Home