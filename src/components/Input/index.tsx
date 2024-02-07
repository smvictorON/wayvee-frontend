import React from 'react'
import * as S from './styles'

interface InputProps {
  type: string;
  text: string;
  name: string;
  placeholder?: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | undefined;
  required?: boolean
}

export const Input = ({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  required
}: InputProps) => {
  return (
    <S.FormControl>
      <S.Label htmlFor={name}>
        {text}
        {required && <S.Required>*</S.Required>}
        :
      </S.Label>
        <S.Input
          type={type}
          name={name}
          id={name}
          required={required}
          placeholder={placeholder}
          onChange={handleOnChange}
          value={value}>
        </S.Input>
    </S.FormControl>
  )
}