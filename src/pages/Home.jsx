import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context'

// status = 1 -> ongoing, 2->sucessfull, 3-> not successfull.
const Home = ({ status, title }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    let data = 0;
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
    <DisplayCampaigns
      title={title}
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home