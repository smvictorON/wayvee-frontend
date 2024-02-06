import React from 'react'
import * as S from './styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface InputFileProps {
  text: string;
  name: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | undefined;
  multiple?: boolean
  required?: boolean
}

export const InputFile = ({
  text,
  name,
  handleOnChange,
  value,
  multiple,
  required
}: InputFileProps) => {
  return (
    <S.FormControl>
      <S.Label htmlFor={name}>
        {text}
        {required && <S.Required>*</S.Required>}
        :
      </S.Label>
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