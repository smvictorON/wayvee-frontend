import React from 'react'
import * as S from '../../styles/styles-inputs'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Tooltip from '@mui/material/Tooltip';

interface InputFileProps {
  text: string;
  name: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | undefined;
  multiple?: boolean
  required?: boolean
  tooltipText?: string
}

export const InputFile = ({
  text,
  name,
  handleOnChange,
  value,
  multiple,
  required,
  tooltipText
}: InputFileProps) => {
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
      <S.InputFile
        type='file'
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value}
        required={required}
        {...(multiple ? { multiple } : '')}>
      </S.InputFile>
      <S.StyledFileButton htmlFor={name}>
        Escolher imagem&nbsp;&nbsp;
        <CloudUploadIcon/>
      </S.StyledFileButton>
    </S.FormControl>
  )
}