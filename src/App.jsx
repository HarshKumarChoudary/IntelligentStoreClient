import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { CampaignDetails, CreateCampaign, Home, Profile, Disconnect, Archive, Withdraw, First, Offline, Upload } from './pages';
import QrCode from './pages/QrCode';
import './index.css';

const App = () => {
  return (
    <div className="relative sm:-8 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-300 min-h-screen flex flex-row">
        <Routes>
          <Route path="/" element={<First />} />
          <Route path="/nft-home" element={<Home status='1' title='All Digital Arts' />} />
          <Route path="/offline-home" element={<Offline />} />
          <Route path="/offline-home/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/disconnect" element={<Disconnect />} />
        </Routes>
    </div>
  )
}

export default App