import React from 'react'
import * as S from './styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface InputProps {
  type: string;
  text: string;
  name: string;
  placeholder?: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | undefined;
  multiple?: boolean
}

export const Input = ({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  multiple
}: InputProps) => {
  return (
    <S.FormControl>
      <S.Label htmlFor={name}>{text}:</S.Label>
      {type === "file" ? (
        <>
          <S.InputFile
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            onChange={handleOnChange}
            value={value}
            {...(multiple ? { multiple } : '')}>
          </S.InputFile>
          <S.StyledFileButton htmlFor={name}>
            Escolher imagem&nbsp;&nbsp;
            <CloudUploadIcon/>
          </S.StyledFileButton>
        </>
      ) : (
        <S.Input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={handleOnChange}
          value={value}
          {...(multiple ? { multiple } : '')}>
        </S.Input>
      )}
    </S.FormControl>
  )
}