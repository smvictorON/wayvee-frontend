import React, { useState } from "react"
import * as S from "../../styles/styles-pages"
import api from "../../utils/api"
import { useNavigate } from "react-router-dom"
import useFlashMessage from "../../hooks/useFlashMessage"
import { FormTeacher } from "../../components/Forms/teacher"
import ITeacher from "../../interfaces/ITeacher"

export const AddTeacher = () => {
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()
  const voidTeacher: ITeacher = {
    _id: '',
    name: '',
    phone: '',
    cpf: '',
    images: [],
  }

  const registerTeacher = async (teacher: any) => {
    let msgType = "success"

    if(!teacher.address)
      teacher.address = {}

    const formData = new FormData()

    await Object.keys(teacher).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < teacher[key].length; i++) {
          formData.append('images', teacher[key][i])
        }
      } else if (key === 'address') {
        formData.append('address', JSON.stringify(teacher[key]));
      } else {
        formData.append(key, teacher[key])
      }
    })

    const data = await api.post('/teachers/create', formData, {
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
      navigate('/teachers')
  }

  return (
    <S.Section>
      <div>
        <S.Header>Cadastre um Professor</S.Header>
        <p>Depois ele ficará disponível para edição!</p>
      </div>
      <FormTeacher buttonText="Cadastrar" handleSubmit={registerTeacher} teacherData={voidTeacher}/>
    </S.Section>
  )
}