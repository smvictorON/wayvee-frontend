import React, { useState } from "react"
import * as S from "./styles"
import api from "../../utils/api"
import { useNavigate } from "react-router-dom"
import useFlashMessage from "../../hooks/useFlashMessage"
import { StudentForm } from "../../components/FormStudent"
import IStudent from "../../interfaces/IStudent"

export const AddStudent = () => {
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()
  const voidStudent: IStudent = {
    _id: '',
    name: '',
    phone: '',
    cpf: '',
    images: [],
  }

  const registerStudent = async (pet: any) => {
    let msgType = "success"

    const formData = new FormData()

    await Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append('images', pet[key][i])
        }
      } else {
        formData.append(key, pet[key])
      }
    })

    const data = await api.post('/pets/create', formData, {
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
      navigate('/pet/mypets')
  }

  return (
    <S.Section>
      <div>
        <S.Header>Cadastre um Aluno</S.Header>
        <p>Depois ele ficará disponível para edição!</p>
      </div>
      <StudentForm btnText="Cadastrar" handleSubmit={registerStudent} studentData={voidStudent}/>
    </S.Section>
  )
}