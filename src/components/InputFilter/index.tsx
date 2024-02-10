import React from 'react'
import * as S from './styles'
import SearchIcon from '@mui/icons-material/Search';

interface InputFilterProps {
  name: string;
  placeholder?: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | undefined;
}

export const InputFilter = ({
  name,
  placeholder,
  handleOnChange,
  value,
}: InputFilterProps) => {
  return (
    <S.FormControl>
      <S.Input
        type='text'
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}>
      </S.Input>
      <SearchIcon/>
    </S.FormControl>
  )
}