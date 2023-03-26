import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton } from './';
import { logo, menu, search, thirdweb, sun } from '../assets';
import { navlinks } from '../constants';
import coder from '../assets/coder.webp';
import house from '../assets/house.png';
import template from '../assets/files/template.png';
import { Modal, Button } from "react-bootstrap";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-green-500'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
    {!isActive ? (
      <img src={imgUrl} alt="logo" className="w-1/2 h-1/2" />
    ) : (
      <img src={imgUrl} alt="logo" className={`w-1/2 h-1/2`} />
    )}
  </div>
)

const showTemplate = () => {

}

const Navbar = ({ display }) => {

  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const { connect, address, setIsActive, isActive } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>This is the sample template</Modal.Title>
        </Modal.Header>
        <Modal.Body><img src={template} alt="Template"/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="flex justify-between items-center flex-row top-5 w-full">
       <Link to="/">
          <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={house} />
        </Link>
      {display === '1' ?
        (
          <div className="lg:flex-1 flex ml-8 flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
            <input type="text" placeholder="Search for NFTs" className="flex w-full border-none mt-1 font-epilogue font-normal text-[14px] placeholder:text-[#d9dbda] text-white bg-transparent outline-none" />
            
            <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
              <img src={search} alt="search" className="w-[15px] h-[15px] object-contain"/>
            </div>
          </div>
      ) : (
          <></>
        )}
        {display === '1' && (<div className="flex-1 flex flex-col justify-between items-center rounded-[20px] py-4 w-[5px]">
          <div className="flex flex-row justify-center items-center gap-3">
            {navlinks.map((link) => (
              <Icon
                key={link.name}
                {...link}
                isActive={isActive}
                handleClick={() => {
                  if (!link.disabled) {
                    setIsActive(link.name);
                    navigate(link.link);
                  }
                  if (link.name === "archive") {
                    setIsSuccess('2');
                  }
                }}
              />
            ))}
          </div>
        </div>)}
      <div className={`sm:flex hidden flex-row gap-4 mb-2 mt-2`}>
        <CustomButton 
          btnType="button"
          title={address ? (display === '1' ? 'Create a campaign' : 'Upload Products'): 'Connect'}
          styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            if (address && display === '1') navigate('create-campaign')
            else if (address && display === '0') { setIsActive('payment'); navigate('upload');}
            else connect()
          }}
        />

        {(address && display === '1') ? (<Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img src={coder} alt="user" className="w-[60%] h-[60%] object-contain" />
          </div>
          </Link>) : (
              <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
                <img src={template} alt="Template" className="w-[60%] h-[60%] object-contain" onClick={handleShow}/>
              </div>
          )}
          
        </div>
      </div>
      
    </div>
    
  )
}

export default Navbar