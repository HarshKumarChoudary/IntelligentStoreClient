import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader, Sidebar, Navbar } from '../components';
import { checkIfImage } from '../utils';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    image: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true)
        console.log(form);
        // await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
        setIsLoading(false);
        navigate('/profile');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
  }

  return (
    <>
      <div className="mt-4 flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar display="1" />
        <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
          {isLoading && <Loader />}
          <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
            <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Crate NFT 😎</h1>
          </div>

          <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
            <div className="flex flex-wrap gap-[40px]">
              <FormField
                labelName="NFT Title *"
                placeholder="Bored Ape"
                inputType="text"
                value={form.name}
                handleChange={(e) => handleFormFieldChange('name', e)}
              />
              <FormField
                labelName="NFT Category *"
                placeholder="Select the Category"
                selectType
                value={form.category}
                handleChange={(e) => handleFormFieldChange('category', e)}
              />
            </div>

            <FormField
              labelName="Description *"
              placeholder="Please provide metadata for the NFT"
              isTextArea
              value={form.description}
              handleChange={(e) => handleFormFieldChange('description', e)}
            />

            <div className="w-full flex justify-start items-center p-4 bg-red-400 h-[120px] rounded-[10px]">
              <img src={money} alt="money" className="w-[40px] h-[40px] object-contain" />
              <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">A fee of 0.1% will be charged on each sell of NFTs</h4>
            </div>

            <FormField
              labelName="Campaign image *"
              placeholder="Place image URL of your campaign"
              inputType="url"
              value={form.image}
              handleChange={(e) => handleFormFieldChange('image', e)}
            />

            <div className="flex justify-center items-center mt-[40px]">
              <CustomButton
                btnType="submit"
                title="Submit new NFT"
                styles="bg-[#1dc071]"
              />
            </div>
          </form>
        </div>
      </div>
    </>
    
  )
}

export default CreateCampaign