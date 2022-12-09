import React from 'react';

export interface IInputProps {
  value: string | number,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  label: string,
  placeholder: string,
  name: string,
  warning?: string,
}

export interface IButtonProps {
  text: string,
  onClick: () => void,
  disabled?: boolean,
}

export interface IOption {
  id: number,
  value: string,
  title: string,
}

export interface ISelectProps {
  options: IOption[],
  label: string,
  onChange: (event: any) => void,
  name: string,
  selected: string,
}
