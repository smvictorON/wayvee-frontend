import React, { ChangeEvent, useContext, useState } from "react"
import * as S from './styles'
import { Context } from '../../context/UserContext'
import SaveIcon from '@mui/icons-material/Save';
import { Input } from '../../components/Inputs/text'

export const Register = () => {
  const [user, setUser] = useState({})
  const { register } = useContext(Context)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(user)
      setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    register(user)
  }

  return (
    <S.Section>
      <div>
        <S.Header>Registrar</S.Header>
        <p>Registre para poder acessar a plataforma!</p>
      </div>

      <S.FormContainer onSubmit={handleSubmit}>
        <Input
            text="Nome"
            type="text"
            name="name"
            placeholder="Digite o seu nome"
            handleOnChange={handleChange}
            required={true}
          />
          <Input
            text="Telefone"
            type="text"
            name="phone"
            placeholder="Digite o seu Telefone"
            handleOnChange={handleChange}
            required={true}
          />
          <Input
            text="Email"
            type="email"
            name="email"
            placeholder="Digite o seu Email"
            handleOnChange={handleChange}
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
          Cadastrar&nbsp;
          <SaveIcon/>
        </S.SubmitButton>
      </S.FormContainer>

      <S.FormContainerParagraph>
        Já tem conta? <S.FormContainerParagraphLink to="/login">Clique aqui.</S.FormContainerParagraphLink>
      </S.FormContainerParagraph>
    </S.Section>
  )
}
export default Register