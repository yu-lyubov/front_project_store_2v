import React from 'react';
import { IButtonProps } from '../../types/components';
import styles from './button.module.scss';

const Button: React.FC<IButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={styles.button}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
