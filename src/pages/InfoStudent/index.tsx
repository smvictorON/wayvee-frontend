import React, { useState, useEffect } from 'react'
import * as S from "../styles-pages"
import api from '../../utils/api'
import { useParams } from 'react-router-dom'
import useFlashMessage from '../../hooks/useFlashMessage'
import IStudent from '../../interfaces/IStudent'

export const InfoStudent = () => {
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

  return (
    <S.Section>
      <div>
        <S.Header>Informações sobre o Aluno: {student?.name}</S.Header>
        <p>Confirma algumas informações úteis sobre o aluno.</p>
      </div>
    </S.Section>
  )
}