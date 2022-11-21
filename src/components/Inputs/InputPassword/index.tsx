import React, {useState} from 'react';
import { ReactComponent as Visibility } from '../../../assets/icons/visibility.svg';
import { ReactComponent as VisibilityOff } from '../../../assets/icons/visibility_off.svg';
import { IInputProps } from '../../../types/components';
import styles from '../input.module.scss';

const InputPassword: React.FC<IInputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  name,
  warning,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const labelStyle = value ? styles.form_label : styles.form_label_hidden;
  const errorLabel = warning ? styles.error_label : '';
  const errorInput = warning ? styles.error_input : '';

  const handleShowPassword = (): void => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className={styles.form}>
      <label
        htmlFor={label}
        className={`${labelStyle} ${errorLabel}`}
      >
        {`${label}:`}
      </label>
      <input
        id={label}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className={`${styles.form_input} ${errorInput}`}
      />
      {!showPassword && <Visibility className={styles.icon} onClick={handleShowPassword} />}
      {showPassword && <VisibilityOff className={styles.icon} onClick={handleShowPassword} />}
      <span className={styles.form_warning}>{warning}</span>
    </div>
  );
};

export default InputPassword;