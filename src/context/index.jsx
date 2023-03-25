import React, { useContext, createContext, useState } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite, useDisconnect } from '@thirdweb-dev/react';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0xD49c94292568d276D396E7075087b0fF79C98D63');
  const { mutateAsync: createProduct } = useContractWrite(contract, 'createProduct');
  const [isActive, setIsActive] = useState('dashboard');
  const [isSuccess, setIsSuccess] = useState('1');
  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();

  const createProducts = async (names, description, isbn) => {
    try {
      const res = await createProduct([
        address, 
        names,
        description,
        isbn
      ])

      console.log("contract call success", res)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  // const getCampaigns = async () => {
  //   const campaigns = await contract.call('getCampaigns');

  //   const parsedCampaings = campaigns.map((campaign, i) => ({
  //     owner: campaign.owner,
  //     title: campaign.title,
  //     description: campaign.description,
  //     target: ethers.utils.formatEther(campaign.target.toString()),
  //     deadline: campaign.deadline.toNumber(),
  //     amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
  //     image: campaign.image,
  //     pId: i
  //   }));

  //   return parsedCampaings;
  // }

  // const getSuccessfullCampaigns = async () => {
  //   const campaigns = await contract.call('getSuccessfullCampaigns');
  //   const parsedCampaings = campaigns.map((campaign, i) => ({
  //     owner: campaign.owner,
  //     title: campaign.title,
  //     description: campaign.description,
  //     target: ethers.utils.formatEther(campaign.target.toString()),
  //     deadline: campaign.deadline.toNumber(),
  //     amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
  //     image: campaign.image,
  //     pId: i
  //   }));
  //   return parsedCampaings;
  // }

  // const getUnSuccessfullCampaigns = async () => {
  //   const campaigns = await contract.call('getUnSuccessfullCampaigns');
  //   const parsedCampaings = campaigns.map((campaign, i) => ({
  //     owner: campaign.owner,
  //     title: campaign.title,
  //     description: campaign.description,
  //     target: ethers.utils.formatEther(campaign.target.toString()),
  //     deadline: campaign.deadline.toNumber(),
  //     amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
  //     image: campaign.image,
  //     pId: i
  //   }));
  //   return parsedCampaings;
  // }

  // const getUserCampaigns = async () => {
  //   const allCampaigns = await getCampaigns();

  //   const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

  //   return filteredCampaigns;
  // }

  // const getWithdrawnCampaigns = async () => {
  //   const allCampaigns = await getUserCampaigns();

  //   const filteredCampaigns = allCampaigns.filter((campaign) => campaign.status === 1);

  //   return filteredCampaigns;
  // }

  // const donate = async (pId, amount) => {
  //   const data = await contract.call('donateToCampaign', pId, { value: ethers.utils.parseEther(amount)});

  //   return data;
  // }

  // const getDonations = async (pId) => {
  //   const donations = await contract.call('getDonators', pId);
  //   const numberOfDonations = donations[0].length;

  //   const parsedDonations = [];

  //   for(let i = 0; i < numberOfDonations; i++) {
  //     parsedDonations.push({
  //       donator: donations[0][i],
  //       donation: ethers.utils.formatEther(donations[1][i].toString())
  //     })
  //   }

  //   return parsedDonations;
  // }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createProducts,
        // getCampaigns,
        // getUserCampaigns,
        // donate,
        // getDonations,
        disconnect,
        isActive,
        setIsActive,
        isSuccess,
        setIsSuccess,
        // getSuccessfullCampaigns,
        // getUnSuccessfullCampaigns,
        // getWithdrawnCampaigns
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
