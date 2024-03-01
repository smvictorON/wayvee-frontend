import React from 'react'
import * as S from '../../styles/styles-inputs'
import Tooltip from '@mui/material/Tooltip';

interface InputDateProps {
  text: string;
  name: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | undefined;
  required?: boolean
  todayIsMin?: boolean
  todayIsMax?: boolean
  disabled?: boolean
  tooltipText?: string
}

export const InputDate = ({
  text,
  name,
  handleOnChange,
  value,
  required,
  todayIsMin,
  todayIsMax,
  disabled,
  tooltipText
}: InputDateProps) => {
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });

  return (
    <S.FormControl>
      <S.Row>
        <S.Label htmlFor={name}>
          {text}
          {required && <S.Required>*</S.Required>}
          :
        </S.Label>
        {tooltipText &&
          <Tooltip title={tooltipText}>
            <S.IconInfo fontSize='small'/>
          </Tooltip>
        }
      </S.Row>
      <S.Input
        type='date'
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value}
        required={required}
        min={todayIsMin ? today : ""}
        max={todayIsMax ? today : ""}
        disabled={disabled}
        >
      </S.Input>
    </S.FormControl>
  )
}