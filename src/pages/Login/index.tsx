import React, { useState, useContext, ChangeEvent } from "react"
import * as S from "./styles"
import { Input } from "../../components/Input"
import { Context } from "../../context/UserContext"
import IUser from "../../interfaces/IUser"
import LoginIcon from '@mui/icons-material/Login';
import PublicIcon from '@mui/icons-material/Public';

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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    login(user)
  }

  return (
    <S.LoginContainer>
      <S.LoginHeader>
        <S.LoginHeaderTitle>
          Login&nbsp;
          <PublicIcon/>
        </S.LoginHeaderTitle>
      </S.LoginHeader>

      <form>
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

        <S.SubmitButton onClick={handleSubmit}>
          Entrar&nbsp;
          <LoginIcon/>
        </S.SubmitButton>
        </form>
      {/* <p>
        Não tem conta? <Link to="/register">Clique aqui.</Link>
      </p> */}
    </S.LoginContainer>
  )
}