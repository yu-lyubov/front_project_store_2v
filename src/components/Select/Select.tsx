import React from 'react';
import { ISelectProps } from '../../types/components';
import styles from './select.module.scss';

const Select: React.FC<ISelectProps> = ({
  options,
  label,
  onChange,
  name,
  selected,
}) => {
  return (
    <div className={styles.form}>
      <label htmlFor={label} className={styles.select_label}>{label}:</label>
      <select
        id={label}
        onChange={onChange}
        name={name}
        value={selected}
        className={styles.select}
      >
        {options.map((value) =>
          <option
            key={value.id}
            value={value.value}
          >
            {value.title}
          </option>
        )}
      </select>
    </div>
  );
};

export default Select;
