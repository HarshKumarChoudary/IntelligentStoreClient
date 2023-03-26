import { createCampaign, dashboard, logout, payment, profile, withdraw, archive } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/nft-home',
  },
  {
    name: 'nft',
    imgUrl: createCampaign,
    link: '/create-nft',
  },
  {
    name: 'payment',
    imgUrl: payment,
    link: '/offline-home/upload',
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/withdraw',
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/disconnect',
  },
];

// structure of project
// first welcome page, showing we can get bulk upload and single uplad and then will generate the QRs for them.
// 