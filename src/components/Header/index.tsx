import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo-with-no-bg.png'
import * as S from './styles'
import { Context } from '../../context/UserContext'
import { useContext } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PortraitIcon from '@mui/icons-material/Portrait';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';

export const Header = () => {
  const { authenticated, logout }: { authenticated: boolean; logout: () => void } = useContext(Context)

  return (
    <S.Navbar>
      <S.NavbarLogo>
        <Link to="/">
          <S.ImgLogo src={Logo} alt="Wayvee" />
        </Link>
      </S.NavbarLogo>
      <S.List>
        {/* <li>
          <Link to="/">Adotar</Link>
        </li> */}
        {authenticated ?
          <>
            <S.ListItem>
              <Link to="/students">
                <span>Alunos&nbsp;&nbsp;</span>
                <GroupsIcon/>
              </Link>
            </S.ListItem>
            <S.ListItem>
              <Link to="/teachers">
                <span>Professores&nbsp;&nbsp;</span>
                <SchoolIcon/>
              </Link>
            </S.ListItem>
            <S.ListItem>
              <Link to="/lessons">
                <span>Aulas&nbsp;&nbsp;</span>
                <CastForEducationIcon/>
              </Link>
            </S.ListItem>
            <S.ListItem>
              <Link to="/user/profile">
                <span>Perfil&nbsp;&nbsp;</span>
                <PortraitIcon/>
              </Link>
            </S.ListItem>
            <S.ListItem onClick={logout}>
              <span>Sair&nbsp;&nbsp;</span>
              <LogoutIcon/>
            </S.ListItem>
          </>
          :
          <>
            <S.ListItem>
              <Link to="/login">
                <span>Entrar&nbsp;&nbsp;</span>
                <LoginIcon/>
              </Link>
            </S.ListItem>
          </>
        }
      </S.List>
    </S.Navbar>
  )
}