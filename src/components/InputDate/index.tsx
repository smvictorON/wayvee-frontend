import React from 'react'
import * as S from './styles'

interface InputDateProps {
  text: string;
  name: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | undefined;
  required?: boolean
  todayIsMin?: boolean
  todayIsMax?: boolean
}

export const InputDate = ({
  text,
  name,
  handleOnChange,
  value,
  required,
  todayIsMin,
  todayIsMax
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
          required={required}
          min={todayIsMin ? today : ""}
          max={todayIsMax ? today : ""}>
        </S.Input>
    </S.FormControl>
  )
}