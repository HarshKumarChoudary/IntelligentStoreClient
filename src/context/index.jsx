import React, { useContext, createContext, useState } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite, useDisconnect } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x59911878c36f2e97983abD8cfFA11201FA77DB79');
  const { mutateAsync: createProduct } = useContractWrite(contract, 'createProduct');
  const [isActive, setIsActive] = useState('dashboard');
  const [isSuccess, setIsSuccess] = useState('1');
  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();
  const [qr, setQr] = useState([]);

  const createProducts = async (names, description, isbn, price) => {
    try {
      const res = await contract.call('createProduct', names, description, isbn, price);

      console.log("contract call success", res)

      var res2 = res.receipt.events[0].args.prodcutIds;
      return res2;
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const buyItem = async (id) => {
    // const amount = ethers.utils.parseEther(ethAmount);
    const res = await contract.call('buyTheProduct', id, {
      value: ethers.utils.parseEther("0.0001")
    });
  }

  const listItem = async (id) => {
    const res = await contract.call('listProductForSale', id);
  }

  const generateUrls = async (res) => {
    var res2 = []
    for (var i = 0; i < res.length; ++i) {
      var tmp = String(res[i]);
      var tmp2 = "https://intelligent-store-client.vercel.app/offline-home/validate/".concat(tmp);
      res2.push(tmp2);
    }
    console.log(res2);
    var final_res = [];
    for (var x in res) {
      final_res.push({
        "data": res2[x],
        "output": { "filename": "qrcodes" + String(x), "format": "png" }
      });
    }   
    return final_res;
  }

  const getProductdetail = async (id) => {
    console.log(contract);
    var data = await contract.call('getProductDetails', id);
    return data;
  }

  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createProducts,
        disconnect,
        isActive,
        setIsActive,
        isSuccess,
        generateUrls,
        setIsSuccess,
        getProductdetail,
        qr,
        buyItem,
        listItem,
        setQr,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
