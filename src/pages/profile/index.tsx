import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import {ROUTES_PATH} from '../../helper/routes';
import Input from '../../components/Inputs/Input';
import InputNumber from '../../components/Inputs/InputNumber';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import { MALE } from '../../helper/consts/user';
import styles from './profile.module.scss';

const initialUser = {
  name: '',
  age: 0,
  male: '',
};
const token = JSON.parse(localStorage.getItem('access_token') || '{}');
const header = `Bearer ${token}`;

const UserData: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(initialUser);
  const { name, age, male } = userData;

  useEffect((): void => {
    getUserData();
  }, []);

  const getUserData = (): void => {
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

  const handleChangeUserData = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target as HTMLInputElement;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSaveData = () => {
    axios.patch('http://localhost:8000/api/changeUser', userData, {
      headers: { Authorization: header },
    })
      .then((res) => {
        console.log('res', res);
        setUserData({...res.data});
        toast.success('Данные пользователя успешно изменены');
      })
      .catch((err) => {
        const error = err?.response?.data || '';
        toast.error(error);
      })
  };

  return (
    <div className={styles.profile}>
      <div className={styles.block}>
        <Input
          value={name}
          onChange={handleChangeUserData}
          label="Имя"
          placeholder="Введите имя пользователя"
          name="name"
        />
        <InputNumber
          value={age}
          onChange={handleChangeUserData}
          label="Возраст"
          placeholder="Введите возраст пользователя"
          name="age"
        />
        <Select
          options={MALE}
          label="Пол"
          onChange={handleChangeUserData}
          name="male"
          selected={String(male)}
        />
        <Button text="Сохранить" onClick={handleSaveData} />
      </div>
    </div>
  );
};

export default UserData;