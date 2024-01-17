import React, { useState, useEffect, ChangeEvent } from 'react'
import * as S from './styles'
import api from '../../utils/api'
import { Input } from '../../components/Input'
import useFlashMessage from '../../hooks/useFlashMessage'
import { RoundedImage } from '../../components/RoundedImage'
import { IUser } from '../../interfaces/IUser'

export const Profile = () => {
  const [user, setUser] = useState<IUser | undefined>()
  const [preview, setPreview] = useState<File>()
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api.get('/users/checkuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setUser(res.data)
    })
  }, [token])

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const name = e.target.name

    if(files && files.length){
      setPreview(files[0])

      if(user)
        setUser({ ...user, [name]: files[0] })
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const name = e.target.name

    if(user)
      setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    let msgType = "success"

    const formData = new FormData()

    if(user)
      Object.entries(user).forEach(([key, value]) => {
        if (value instanceof FileList) {
          for (let i = 0; i < value.length; i++) {
            formData.append(`${key}_${i}`, value[i]);
          }
        } else {
          formData.append(key, value);
        }
      });

    const data = await api.patch(`/users/edit/${user?._id}`, formData, {
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
    <section>
      <S.ProfileHeader>
        <h1>Perfil</h1>
        {(user?.image || preview) && (
          <RoundedImage
            src={preview
              ? URL.createObjectURL(preview)
              : `${process.env.REACT_APP_API}/images/users/${user?.image}`}
            alt={user?.name} />
        )}
      </S.ProfileHeader>

      <S.FormContainer onSubmit={handleSubmit}>
        <Input
          text="Imagem"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="Email"
          type="email"
          name="email"
          handleOnChange={handleChange}
          placeholder="Digite seu Email"
          value={user?.email || ''}
        />
        <Input
          text="Nome"
          type="text"
          name="name"
          handleOnChange={handleChange}
          placeholder="Digite seu Nome"
          value={user?.name || ''}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          handleOnChange={handleChange}
          placeholder="Digite seu Telefone"
          value={user?.phone || ''}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          handleOnChange={handleChange}
          placeholder="Digite sua Senha"
          value={user?.password || ''}
        />
        <Input
          text="Senha"
          type="password"
          name="confirmpassword"
          handleOnChange={handleChange}
          placeholder="Confirme sua Senha"
        />
        <S.SubmitButton type="submit" value="Editar" />
      </S.FormContainer>
    </section>
  )
}