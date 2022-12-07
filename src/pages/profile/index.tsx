import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import {ROUTES_PATH} from "../../helper/routes";
import styles from './profile.module.scss';

const initialUser = {
  name: '',
  age: null,
  male: false,
};
const token = JSON.parse(localStorage.getItem('access_token') || '{}');
const header = `Bearer ${token}`;

const UserData: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(initialUser);
  const { name, age, male } = userData;

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    axios.get('http://localhost:8000/api/user', {
      headers: { Authorization: header },
    })
      .then((res) => {
        console.log(res);
        setUserData({...res.data});
      })
      .catch((err) => {
        const error = err?.response?.data || '';
        toast.error(error);
        // localStorage.clear();
        // navigate(ROUTES_PATH.LOGIN);
      })
  };

  return (
    <div className={styles.profile}>
      <div className={styles.block}>

      </div>
    </div>
  );
};

export default UserData;