import React, { ChangeEvent, useContext, useState } from "react"
import * as S from './styles'
import { Input } from "../../components/Input"
import { Context } from '../../context/UserContext'

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
    <S.FormContainer>
      <h1>Registrar</h1>

      <form onSubmit={handleSubmit}>
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
        />

        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu Telefone"
          handleOnChange={handleChange}
        />

        <Input
          text="Email"
          type="email"
          name="email"
          placeholder="Digite o seu Email"
          handleOnChange={handleChange}
        />

        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />

        <Input
          text="Confirmação de senha Senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleChange}
        />

        <S.SubmitButton type="submit" value="Cadastrar" />
      </form>

      <S.FormContainerParagraph>
        Já tem conta? <S.FormContainerParagraphLink to="/login">Clique aqui.</S.FormContainerParagraphLink>
      </S.FormContainerParagraph>
    </S.FormContainer>
  )
}
export default Register