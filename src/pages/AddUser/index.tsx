import React, { useState } from "react"
import * as S from "../styles-pages"
import api from "../../utils/api"
import { useNavigate } from "react-router-dom"
import useFlashMessage from "../../hooks/useFlashMessage"
import { FormUser } from "../../components/FormUser"
import IUser from "../../interfaces/IUser"

export const AddUser = () => {
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()
  const voidUser: IUser = {
    _id: '',
    name: '',
    phone: '',
    email: '',
    password: '',
    company: '',
    image: [],
  }

  const registerUser = async (user: any) => {
    let msgType = "success"

    if(!user.address)
      user.address = {}

    const formData = new FormData()

    await Object.keys(user).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < user[key].length; i++) {
          formData.append('images', user[key][i])
        }
      } else if (key === 'address') {
        formData.append('address', JSON.stringify(user[key]));
      } else {
        formData.append(key, user[key])
      }
    })

    const data = await api.post('/users/create', formData, {
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

    if (msgType !== 'error')
      navigate('/users')
  }

  return (
    <S.Section>
      <div>
        <S.Header>Cadastre um Usuário</S.Header>
        <p>Depois ele ficará disponível para edição!</p>
      </div>
      <FormUser btnText="Cadastrar" handleSubmit={registerUser} userData={voidUser}/>
    </S.Section>
  )
}