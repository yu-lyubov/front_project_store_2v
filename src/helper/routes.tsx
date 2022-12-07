import React from 'react';
import Registration from '../pages/registration';
import Login from '../pages/login';

const ROUTES = [
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/login',
    element: <Login />,
  }
];

export default ROUTES;
