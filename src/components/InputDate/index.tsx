import React from 'react'
import * as S from './styles'

interface InputDateProps {
  text: string;
  name: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | undefined;
  required?: boolean
}

export const InputDate = ({
  text,
  name,
  handleOnChange,
  value,
  required
}: InputDateProps) => {
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });

  return (
    <S.FormControl>
      <S.Label htmlFor={name}>
        {text}
        {required && <S.Required>*</S.Required>}
        :
      </S.Label>
        <S.Input
          type='date'
          name={name}
          id={name}
          onChange={handleOnChange}
          value={value}
          min={today}>
        </S.Input>
    </S.FormControl>
  )
}