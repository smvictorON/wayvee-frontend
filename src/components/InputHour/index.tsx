import React from 'react'
import * as S from './styles'

interface InputHourProps {
  text: string;
  name: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | undefined;
  required?: boolean
}

export const InputHour = ({
  text,
  name,
  handleOnChange,
  value,
  required,
}: InputHourProps) => {
  return (
    <S.FormControl>
      <S.Label htmlFor={name}>
        {text}
        {required && <S.Required>*</S.Required>}
        :
      </S.Label>
        <S.Input
          type='time'
          name={name}
          id={name}
          required={required}
          onChange={handleOnChange}
          value={value}
        >
        </S.Input>
    </S.FormControl>
  )
}