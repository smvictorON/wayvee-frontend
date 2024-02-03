import React, { useState } from "react"
import * as S from "./styles"
import api from "../../utils/api"
import { useNavigate } from "react-router-dom"
import useFlashMessage from "../../hooks/useFlashMessage"
import { LessonForm } from "../../components/FormLesson"
import ILesson from "../../interfaces/ILesson"

export const AddLesson = () => {
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()
  const voidLesson: ILesson = {
    _id: '',
    date: '',
    hour_start: '',
    hour_end: '',
    teacher: '',
    students: [''],
    status: 'Active'
  }

  const registerLesson = async (lesson: any) => {
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

    const data = await api.post('/lessons/create', formData, {
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
      navigate('/lessons')
  }

  return (
    <S.Section>
      <div>
        <S.Header>Agende uma Aula</S.Header>
        <p>Depois ela ficará disponível para edição!</p>
      </div>
      <LessonForm btnText="Agendar" handleSubmit={registerLesson} lessonData={voidLesson}/>
    </S.Section>
  )
}