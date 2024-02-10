import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import * as S from './styles'
import { Input } from '../Input'
import { InputDate } from '../InputDate'
import { InputHour } from '../InputHour'
import { Select } from '../Select'
import { MultiSelect } from '../MultiSelect'
import ILesson from '../../interfaces/ILesson'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import api from '../../utils/api'
import ITeacher from '../../interfaces/ITeacher'
import IStudent from '../../interfaces/IStudent'


interface FormPaymentProps {
  handleSubmit: (event: any) => void;
}

export const FormPayment = ({
  handleSubmit,
}: FormPaymentProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.options[e.target.selectedIndex].value as string;
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <S.FormContainer onSubmit={submit}>
      <S.SubmitButton>
        Concluir&nbsp;
        <AttachMoneyIcon/>
      </S.SubmitButton>
    </S.FormContainer>
  )
}