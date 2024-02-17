import React, { useState, useEffect } from 'react'
import * as S from "../styles-pages"
import api from '../../utils/api'
import { useParams } from 'react-router-dom'
import useFlashMessage from '../../hooks/useFlashMessage'
import { FormLesson } from '../../components/FormLesson'
import ILesson from '../../interfaces/ILesson'

export const EditLesson = () => {
  const [lesson, setLesson] = useState<ILesson | undefined>()
  const [token] = useState(localStorage.getItem('token') || '')
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api.get(`/lessons/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setLesson(res.data.lesson)
    })
  }, [token, id])

  const updateLesson = async (lesson: any) => {
    let msgType = "success"

    if(!lesson.address)
      lesson.address = {}

    const formData = new FormData()

    await Object.keys(lesson).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < lesson[key].length; i++) {
          formData.append('images', lesson[key][i])
        }
      } else if (key === 'address') {
        formData.append('address', JSON.stringify(lesson[key]));
      } else {
        formData.append(key, lesson[key])
      }
    })

    const data = await api.patch(`/lessons/${lesson._id}`, formData, {
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
        <S.Header>Editando a Aula</S.Header>
        <p>Depois da edição os dados ficarão atualizados no sistema.</p>
      </div>
      {lesson?._id && <FormLesson btnText="Atualizar" handleSubmit={updateLesson} lessonData={lesson} />}
    </S.Section>
  )
}