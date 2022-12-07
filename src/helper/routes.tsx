import React from 'react';
import Registration from '../pages/registration';
import Login from '../pages/login';
import UserData from '../pages/profile';

export enum ROUTES_PATH {
  REGISTRATION = '/registration',
  LOGIN = '/login',
  PROFILE = '/profile',
}

export const ROUTES = [
  {
    path: ROUTES_PATH.REGISTRATION,
    element: <Registration />,
  },
  {
    path: ROUTES_PATH.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES_PATH.PROFILE,
    element: <UserData />,
  },
];

export default ROUTES;
