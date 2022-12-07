import * as yup from 'yup';
import { IUserForm } from '../types/user';

const schema = yup.object().shape({
  'passwordConfirmation': yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'пароли должны совпадать',
    ),
  'password': yup
    .string()
    .min(6, 'длина пароля должна составлять не менее 6 символов')
    .matches(
      /(?=.*[0-9])(?=.*[a-z])[0-9a-z]/g,
      'пароль должен содержать только латинские буквы и числа',
    )
    .required(),
  'email': yup.string().required('обязательное поле').email('электронный адрес должен быть валидным'),
});

export const validateRegistrationForm = (data: IUserForm, setErrorHandler: any) => {
  schema.validate(data)
    .then(() => {
      setErrorHandler({})
    })
    .catch((err) => {
      setErrorHandler({ [err.path]: err.message || '' })
    });
};