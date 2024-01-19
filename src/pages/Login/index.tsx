import React, { useState, useContext, ChangeEvent } from "react"
import * as S from "./styles"
import { Input } from "../../components/Input"
import { Context } from "../../context/UserContext"
import { IUser } from "../../interfaces/IUser"

export const Login = () => {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const { login } = useContext(Context)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prevUser) => {
      if (!prevUser) {
        return { [name]: value, _id: "", name: "", email: "", phone: "", password: "", image: [] };
      }

      return { ...prevUser, [name]: value };
    });
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    login(user)
  }

  return (
    <S.LoginContainer>
      <S.LoginTitle>Login</S.LoginTitle>

      <form onSubmit={handleSubmit}>
        <Input
          text="Email"
          type="text"
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

        <S.LoginSubmit type="submit" value="Entrar" />
      </form>
      {/* <p>
        Não tem conta? <Link to="/register">Clique aqui.</Link>
      </p> */}
    </S.LoginContainer>
  )
}