import { IUserForm } from '../../types/user';
import { IOption } from '../../types/components';

export const initialUser: IUserForm = {
  email: '',
  password: '',
  passwordConfirmation: '',
};

export const MALE: IOption[] = [
  {
    id: 0,
    value: '',
    title: '-',
  },
  {
    id: 1,
    value: 'true',
    title: 'Мужской',
  },
  {
    id: 2,
    value: 'false',
    title: 'Женский',
  },
];