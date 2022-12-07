import React from "react";

export interface IInputProps {
  value: string,
  onChange: (event: React.FormEvent<HTMLInputElement>) => void,
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
