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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const Header = () => {
  const { authenticated, logout }: { authenticated: boolean; logout: () => void } = useContext(Context)

  return (
    <S.Navbar>
      <S.NavbarLogo>
        <Link to={authenticated ? "/" : "/login"}>
          <S.ImgLogo src={Logo} alt="Wayvee" />
        </Link>
      </S.NavbarLogo>
      <S.List>
        {authenticated ?
          <>
            <S.ListItem>
              <Link to="/payments">
                <span>Contas</span>
                <AttachMoneyIcon fontSize='small'/>
              </Link>
            </S.ListItem>
            <S.ListItem>
              <Link to="/students">
                <span>Alunos</span>
                <GroupsIcon fontSize='small'/>
              </Link>
            </S.ListItem>
            <S.ListItem>
              <Link to="/teachers">
                <span>Professores</span>
                <SchoolIcon fontSize='small'/>
              </Link>
            </S.ListItem>
            <S.ListItem>
              <Link to="/lessons">
                <span>Aulas</span>
                <CastForEducationIcon fontSize='small'/>
              </Link>
            </S.ListItem>
            <S.ListItem>
              <Link to="/user/profile">
                <span>Perfil</span>
                <PortraitIcon fontSize='small'/>
              </Link>
            </S.ListItem>
            <S.ListItem onClick={logout}>
              <Link to="/user/profile">
                <span>Sair</span>
                <LogoutIcon fontSize='small'/>
              </Link>
            </S.ListItem>
          </>
          :
          <>
            {/* <S.ListItem>
              <Link to="/login">
                <span>Entrar</span>
                <LoginIcon/>
              </Link>
            </S.ListItem> */}
          </>
        }
      </S.List>
    </S.Navbar>
  )
}