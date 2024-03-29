import React, { useState, useEffect } from 'react'
import * as S from "../../styles/styles-pages"
import api from '../../utils/api'
import { useParams } from 'react-router-dom'
import useFlashMessage from '../../hooks/useFlashMessage'
import { FormStudent } from '../../components/Forms/student'
import IStudent from '../../interfaces/IStudent'

export const EditStudent = () => {
  const [student, setStudent] = useState<IStudent | undefined>()
  const [token] = useState(localStorage.getItem('token') || '')
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api.get(`/students/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setStudent(res.data.student)
    })
  }, [token, id])

  const updateStudent = async (student: any) => {
    let msgType = "success"

    if(!student.address)
      student.address = {}

    const formData = new FormData()

    Object.keys(student).forEach((key) => {
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

    const data = await api.patch(`/students/${student._id}`, formData, {
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

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <S.Section>
      <div>
        <S.Header>Editando o Aluno: {student?.name}</S.Header>
        <p>Depois da edição os dados ficarão atualizados no sistema.</p>
      </div>
      {student?.name && <FormStudent buttonText="Atualizar" handleSubmit={updateStudent} studentData={student} />}
    </S.Section>
  )
}