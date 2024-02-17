import React from 'react'
import * as S from '../styles-inputs'
import Tooltip from '@mui/material/Tooltip';

interface InputProps {
  type: string;
  text: string;
  name: string;
  placeholder?: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | undefined;
  required?: boolean
  disabled?: boolean
  tooltipText?: string
}

export const Input = ({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  required,
  disabled,
  tooltipText
}: InputProps) => {
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
        type={type}
        name={name}
        id={name}
        required={required}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        disabled={disabled}
      >
      </S.Input>
    </S.FormControl>
  )
}