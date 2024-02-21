import React, { useState, useEffect } from 'react'
import * as S from "../styles-pages"
import api from '../../utils/api'
import { useParams } from 'react-router-dom'
import useFlashMessage from '../../hooks/useFlashMessage'
import ITeacher from '../../interfaces/ITeacher'

export const InfoTeacher = () => {
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

  return (
    <S.Section>
      <div>
        <S.Header>Informações sobre o Professor: {teacher?.name}</S.Header>
        <p>Confirma algumas informações úteis sobre o professor.</p>
      </div>
    </S.Section>
  )
}