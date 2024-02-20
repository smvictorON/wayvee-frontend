import React, { useState, useEffect } from 'react'
import * as S from "../styles-pages"
import api from '../../utils/api'
import { useParams } from 'react-router-dom'
import useFlashMessage from '../../hooks/useFlashMessage'
import { FormUser } from '../../components/FormUser'
import IUser from '../../interfaces/IUser'

export const EditUser = () => {
  const [user, setUser] = useState<IUser | undefined>()
  const [token] = useState(localStorage.getItem('token') || '')
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setUser(res.data.user)
    })
  }, [token, id])

  const updateUser = async (user: any) => {
    let msgType = "success"

    if(!user.address)
      user.address = {}

    const formData = new FormData()

    await Object.keys(user).forEach((key) => {
      if (key === 'image') {
        for (let i = 0; i < user[key].length; i++) {
          formData.append('images', user[key][i])
        }
      } else {
        formData.append(key, user[key])
      }
    })

    const data = await api.patch(`/users/${user._id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      return res.data
    }).catch((err) => {
      msgType = 'error'
      return err.response.data
    })

    setFlashMessage(data.message, msgType)
  }

  return (
    <S.Section>
      <div>
        <S.Header>Editando o Aluno: {user?.name}</S.Header>
        <p>Depois da edição os dados ficarão atualizados no sistema.</p>
      </div>
      {user?.name && <FormUser buttonText="Atualizar" handleSubmit={updateUser} userData={user} />}
    </S.Section>
  )
}