import React, { useState, useEffect } from 'react'
import * as S from "../styles-pages"
import api from '../../utils/api'
import { useParams } from 'react-router-dom'
import useFlashMessage from '../../hooks/useFlashMessage'
import { FormTeacher } from '../../components/FormTeacher'
import ITeacher from '../../interfaces/ITeacher'

export const EditTeacher = () => {
  const [teacher, setTeacher] = useState<ITeacher | undefined>()
  const [token] = useState(localStorage.getItem('token') || '')
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api.get(`/teachers/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setTeacher(res.data.teacher)
    })
  }, [token, id])

  const updateTeacher = async (teacher: any) => {
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

    const data = await api.patch(`/teachers/${teacher._id}`, formData, {
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
        <S.Header>Editando o Professor: {teacher?.name}</S.Header>
        <p>Depois da edição os dados ficarão atualizados no sistema.</p>
      </div>
      {teacher?.name && <FormTeacher btnText="Atualizar" handleSubmit={updateTeacher} teacherData={teacher} />}
    </S.Section>
  )
}