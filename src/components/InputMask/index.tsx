import React from 'react'
import * as S from '../styles-inputs'
import Tooltip from '@mui/material/Tooltip';

interface InputMaskProps {
  type: string;
  text: string;
  name: string;
  placeholder?: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | undefined;
  required?: boolean
  mask: string
  disabled?: boolean
  tooltipText?: string
}

export const InputMask = ({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  required,
  mask,
  disabled,
  tooltipText
}: InputMaskProps) => {
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
      <S.MaskInput
        mask={mask}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        required={required}
        disabled={disabled}
        >
      </S.MaskInput>
    </S.FormControl>
  )
}