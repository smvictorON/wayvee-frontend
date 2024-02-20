import React, { useState, useEffect, ChangeEvent } from 'react'
import { SquareImage } from '../../components/Image'
import useFlashMessage from '../../hooks/useFlashMessage'
import api from '../../utils/api'
import * as S from '../styles-lists'
import IUser from '../../interfaces/IUser'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NoPicture from '../../assets/no-picture.png'
import { InputFilter } from '../../components/InputFilter'
import PersonIcon from '@mui/icons-material/Person';

export const Users = () => {
  const [users, setUsers] = useState<IUser[] | undefined>()
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api.get('/users', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setUsers(res.data.users)
    })
  }, [token])

  const removeUser = async (id: string) => {
    let msgType = "success"

    const data = await api.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      const updatedUsers = users?.filter((user: IUser) => user._id !== id)
      setUsers(updatedUsers)

      return res.data
    }).catch((err) => {
      msgType = "error"
      return err.response.data
    })

    setFlashMessage(data.message, msgType)
  }

  const handleFilter = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    api.get('/users', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      if (value.trim() === '') {
        setUsers(res.data.users)
      } else {
        const filteredUsers = res.data.users?.filter((user: IUser) => user.name.toLowerCase().includes(value.toLowerCase()));
        setUsers(filteredUsers);
      }
    })
  }

  return (
    <section>
      <S.ListHeader>
        <S.ListHeaderTitle>
          Usuarios&nbsp;({users?.length})&nbsp;
          <PersonIcon fontSize='small'/>
        </S.ListHeaderTitle>

        <InputFilter
          name='search'
          placeholder='Buscar por nome'
          handleOnChange={handleFilter}
        />

        <S.ListHeaderLink to='/user/add'>
          <span>Cadastrar Usuário</span>
          <AddIcon fontSize='small'/>
        </S.ListHeaderLink>
      </S.ListHeader>

      <S.ListContainer>
        {users && users.length > 0 && users.map((user) => (
          <S.ListRow key={user._id}>
            <SquareImage
              src={
                user.image && user.image.length > 0
                  ? `${process.env.REACT_APP_API}/images/users/${user.image}`
                  : NoPicture
              }
              alt={user.name}
              width="px75"
            />
            <S.ListRowSpan>{user.name}</S.ListRowSpan>
            <S.Actions>
              <S.ActionsLink to={`/user/edit/${user._id}`}>
                <span>Editar</span>
                <EditIcon fontSize={'small'}/>
              </S.ActionsLink>
              <S.ActionsButton color={"red"} onClick={() => removeUser(user._id || "")}>
                <span>Excluir</span>
                <DeleteIcon fontSize={'small'}/>
              </S.ActionsButton>
            </S.Actions>
          </S.ListRow>
        ))}
        {users?.length === 0 && (<p>Não há usuarios cadastrados!</p>)}
      </S.ListContainer>
    </section>
  )
}