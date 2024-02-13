import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import * as S from './styles'
import { Input } from '../Input'
import { InputFile } from '../InputFile'
import { InputMask } from '../InputMask'
import { Select } from '../Select'
import IUser from '../../interfaces/IUser'
import SaveIcon from '@mui/icons-material/Save';
import api from '../../utils/api'
import ICompany from '../../interfaces/ICompany'

interface FormUserProps {
  handleSubmit: (event: any) => void;
  userData: IUser;
  btnText: string
}

export const FormUser = ({
  handleSubmit,
  userData,
  btnText
}: FormUserProps) => {
  const [user, setUser] = useState(userData || {})
  const [companies, setCompanies] = useState<ICompany[]>([])
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api.get(`/companies`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setCompanies(res.data.companies)
    })
  }, [token])


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.options[e.target.selectedIndex].value as string;
    setUser({ ...user, [name]: value });
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(user)
  }

  return (
    <S.FormContainer onSubmit={submit}>
      <Input
        text="Nome"
        type="text"
        name="name"
        placeholder="Digite o nome"
        handleOnChange={handleChange}
        value={user.name || ""}
        required={true}
      />
      <InputMask
        text="Telefone"
        type="text"
        name="phone"
        placeholder="Digite o telefone"
        handleOnChange={handleChange}
        value={user.phone || ""}
        required={true}
        mask="(99)99999-9999"
      />
      <Input
        text="Email"
        type="email"
        name="email"
        placeholder="Digite o email"
        handleOnChange={handleChange}
        value={user.email || ""}
      />
      <Select
        text="Empresa"
        name="company"
        options={companies}
        handleOnChange={handleSelect}
        value={user.company}
        required={true}
      />
      <Input
        text="Senha"
        type="password"
        name="password"
        placeholder="Digite a sua senha"
        handleOnChange={handleChange}
        required={true}
      />
      <Input
        text="Confirmação de senha"
        type="password"
        name="confirmpassword"
        placeholder="Confirme a sua senha"
        handleOnChange={handleChange}
        required={true}
      />
      <S.SubmitButton>
        {btnText}&nbsp;
        <SaveIcon/>
      </S.SubmitButton>
    </S.FormContainer>
  )
}