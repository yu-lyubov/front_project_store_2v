import React from 'react';
import { IInputProps } from '../../types/components';
import styles from './input.module.scss';

const Input: React.FC<IInputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  name,
  warning,
}) => {
  const labelStyle = value ? styles.form_label : styles.form_label_hidden;
  const errorLabel = warning ? styles.error_label : '';
  const errorInput = warning ? styles.error_input : '';

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
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className={`${styles.form_input} ${errorInput}`}
      />
      <span className={styles.form_warning}>{warning}</span>
    </div>
  );
};

export default Input;
