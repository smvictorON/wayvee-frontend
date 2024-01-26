import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo-with-no-bg.png'
import * as S from './styles'
import { Context } from '../../context/UserContext'
import { useContext } from 'react'

export const Header = () => {
  const { authenticated, logout }: { authenticated: boolean; logout: () => void } = useContext(Context)

  return (
    <S.Navbar>
      <S.NavbarLogo>
        <S.ImgLogo src={Logo} alt="Wayvee" />
      </S.NavbarLogo>
      <S.List>
        {/* <li>
          <Link to="/">Adotar</Link>
        </li> */}
        {authenticated ?
          <>
            <S.ListItem>
              <Link to="/pet/myadoptions">Minha Adoções</Link>
            </S.ListItem>
            <S.ListItem>
              <Link to="/students">Alunos</Link>
            </S.ListItem>
            <S.ListItem>
              <Link to="/user/profile">Perfil</Link>
            </S.ListItem>
            <S.ListItem onClick={logout}>
              Sair
            </S.ListItem>
          </>
          :
          <>
            <S.ListItem>
              <Link to="/login">Entrar</Link>
            </S.ListItem>
          </>
        }
      </S.List>
    </S.Navbar>
  )
}