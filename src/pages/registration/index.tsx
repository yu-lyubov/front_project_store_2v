import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Input from '../../components/Inputs/Input';
import InputPassword from '../../components/Inputs/InputPassword';
import Button from '../../components/Button';
import { initialUser } from '../../helper/consts/user';
import { IUserForm } from '../../types/user';
import { validateRegistrationForm } from '../../validator/registration';
import styles from './registration.module.scss';

const Registration: React.FC = () => {
  const [user, setUser] = useState<IUserForm>(initialUser);
  const [err, setErr] = useState(initialUser);
  const { email, password, passwordConfirmation } = user;
  const errList = Object.values(err);

  useEffect((): void => {
    Object.values(user).some((value) => !!value) &&
      validateRegistrationForm(user, setErr);
  }, [user]);

  const handleChangeUser = (event: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = event.target as HTMLInputElement;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSaveUser = async () => {
    axios.post('http://localhost:8000/api/registration', user)
      .then((res) => {
        const { access_token } = res.data;
        localStorage.setItem('access_token', JSON.stringify(access_token || ''));
      })
      .catch((err) => {
        toast.error(err.response.data);
      })
  };

  return (
    <div className={styles.main_background}>
      <div className={styles.form_background}>
        <div className={styles.form}>
          <h1>Регистрация</h1>
          <div className={styles.inputs_list}>
            <Input
              value={email}
              onChange={handleChangeUser}
              label="Электронный адрес"
              placeholder="Введите эл.адрес"
              name="email"
              warning={err.email || ""}
            />
            <InputPassword
              value={password}
              onChange={handleChangeUser}
              label="Пароль"
              placeholder="Введите пароль"
              name="password"
              warning={err.password || ""}
            />
            <InputPassword
              value={passwordConfirmation}
              onChange={handleChangeUser}
              label="Повторите пароль"
              placeholder="Повторите пароль"
              name="passwordConfirmation"
              warning={err.passwordConfirmation || ""}
            />
            <p>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
          </div>
          <Button
            text="Зарегистрироваться"
            onClick={handleSaveUser}
            disabled={errList.length !== 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Registration;
