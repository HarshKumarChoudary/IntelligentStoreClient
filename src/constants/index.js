import { createCampaign, dashboard, logout, payment, profile, withdraw, archive } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'payment',
    imgUrl: payment,
    link: '/',
    disabled: true,
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/withdraw',
  },
  {
    name: 'archive',
    imgUrl: archive,
    link: '/archive',
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
