import React from 'react'
import * as S from './styles'

interface InputMaskProps {
  type: string;
  text: string;
  name: string;
  placeholder?: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | undefined;
  required?: boolean
  mask: string
}

export const InputMask = ({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  required,
  mask
}: InputMaskProps) => {
  return (
    <S.FormControl>
      <S.Label htmlFor={name}>
        {text}
        {required && <S.Required>*</S.Required>}
        :
      </S.Label>
        <S.MaskInput
          mask={mask}
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={handleOnChange}
          value={value}
          required={required}
          >
        </S.MaskInput>
    </S.FormControl>
  )
}