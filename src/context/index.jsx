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
  const [qr, setQr] = useState([]);

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

  const generateUrls = async (address, isbn) => {
    var res = []
    var cur = btoa(address);
    for (var i = 0; i < isbn.length; ++i) {
      var tmp = cur.concat('/');
      tmp = tmp + isbn[i];
      var tmp2 = "https://intelligent-store-client.vercel.app/offline-home/validate/".concat(tmp);
      res.push(tmp2);
    }
    console.log(res);
    var final_res = [];
    for (var x in res) {
      final_res.push({
        "data": res[x],
        "output": { "filename": "qrcodes" + String(x), "format": "png" }
      });
    }
    // for (var x in res) {
    //   let data = {
    //     "data": res[x],
    //     "output": { "filename": res[x], "format": "svg" }
    //   }
    //   final_res["items"].push(data);
    // }
    return final_res;
  }

  const getProductdetail = async (address, isbn) => {
    var data = await contract.call('getProduct', address, isbn);
    var parsedData = {
      name: data.name,
      owner: data.owner,
      description: data.description,
      isbn: isbn
    }
    return parsedData;
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
        setQr,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
