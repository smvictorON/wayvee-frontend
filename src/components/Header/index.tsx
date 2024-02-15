import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo-with-no-bg.png'
import * as S from './styles'
import { Context } from '../../context/UserContext'
import { useContext } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import PortraitIcon from '@mui/icons-material/Portrait';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';

export const Header = () => {
  const { authenticated, logout, isSuper }: { authenticated: boolean; logout: () => void, isSuper: boolean } = useContext(Context)

  return (
    <S.Navbar>
      <S.NavbarLogo>
        <Link to={authenticated ? "/" : "/login"}>
          <S.ImgLogo src={Logo} alt="Wayvee" />
        </Link>
      </S.NavbarLogo>
      <S.List>
        {isSuper && <>
          <S.ListItem>
            <Link to="/companies">
              <span>Empresas</span>
              <BusinessIcon fontSize='small'/>
            </Link>
          </S.ListItem>
          <S.ListItem>
            <Link to="/users">
              <span>Usuários</span>
              <PersonIcon fontSize='small'/>
            </Link>
          </S.ListItem>
        </>}
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