import * as yup from 'yup';
import { IUserForm } from '../types/user';

const schema = yup.object().shape({
  'passwordConfirmation': yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Passwords must match',
    ),
  'password': yup
    .string()
    .min(6, 'password must be at least 6 characters long')
    .matches(
      /(?=.*[0-9])(?=.*[a-z])[0-9a-z]/g,
      'Password must contain only Latin letters (regardless of register) or numbers',
    )
    .required(),
  'email': yup.string().required().email(),
});

export const validateRegistrationForm = (data: IUserForm, setErrorHandler: any) => {
  let isValidate = true;
  schema.validate(data)
    .then(() => {
      setErrorHandler({})
    })
    .catch((err) => {
      isValidate = false;
      setErrorHandler({ [err.path]: err.message || '' })
    });

  return isValidate;
};