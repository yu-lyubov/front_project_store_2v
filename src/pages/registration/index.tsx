import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Input from '../../components/Inputs/Input';
import InputPassword from '../../components/Inputs/InputPassword';
import Button from '../../components/Button';
import { IUserForm } from '../../types/user';
import { validateRegistrationForm } from '../../validator/registration';
import styles from './registration.module.scss';

export const initialUser: IUserForm = {
  email: '',
  password: '',
  passwordConfirmation: '',
};

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
          <h1>Sign up</h1>
          <div className={styles.inputs_list}>
            <Input
              value={email}
              onChange={handleChangeUser}
              label="Email"
              placeholder="Enter email"
              name="email"
              warning={err.email || ""}
            />
            <InputPassword
              value={password}
              onChange={handleChangeUser}
              label="Password"
              placeholder="Enter password"
              name="password"
              warning={err.password || ""}
            />
            <InputPassword
              value={passwordConfirmation}
              onChange={handleChangeUser}
              label="Repeat password"
              placeholder="Repeat password"
              name="passwordConfirmation"
              warning={err.passwordConfirmation || ""}
            />
            <p>Existing User? Click here to <Link to="/login">Sign in</Link></p>
          </div>
          <Button
            text="Sign up"
            onClick={handleSaveUser}
            disabled={errList.length !== 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Registration;
