import React, { useState } from "react"
import * as S from "./styles"
import api from "../../utils/api"
import { useNavigate } from "react-router-dom"
import useFlashMessage from "../../hooks/useFlashMessage"
import { FormStudent } from "../../components/FormStudent"
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

  const registerStudent = async (student: any) => {
    let msgType = "success"

    if(!student.address)
      student.address = {}

    const formData = new FormData()

    await Object.keys(student).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < student[key].length; i++) {
          formData.append('images', student[key][i])
        }
      } else if (key === 'address') {
        formData.append('address', JSON.stringify(student[key]));
      } else {
        formData.append(key, student[key])
      }
    })

    const data = await api.post('/students/create', formData, {
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
      navigate('/students')
  }

  return (
    <S.Section>
      <div>
        <S.Header>Cadastre um Aluno</S.Header>
        <p>Depois ele ficará disponível para edição!</p>
      </div>
      <FormStudent btnText="Cadastrar" handleSubmit={registerStudent} studentData={voidStudent}/>
    </S.Section>
  )
}