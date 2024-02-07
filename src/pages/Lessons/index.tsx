import React, { useState, useEffect } from 'react'
import { SquareImage } from '../../components/SquareImage'
import useFlashMessage from '../../hooks/useFlashMessage'
import api from '../../utils/api'
import * as S from './styles'
import ILesson from '../../interfaces/ILesson'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupsIcon from '@mui/icons-material/Groups';
import NoPicture from '../../assets/no-picture.png'

export const Lessons = () => {
  const [lessons, setLessons] = useState<ILesson[] | undefined>()
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api.get('/lessons', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setLessons(res.data.lessons)
    })
  }, [token])

  const removeLesson = async (id: string) => {
    let msgType = "success"

    const data = await api.delete(`/lessons/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      const updatedLessons = lessons?.filter((lesson: ILesson) => lesson._id !== id)
      setLessons(updatedLessons)

      return res.data
    }).catch((err) => {
      msgType = "error"
      return err.response.data
    })

    setFlashMessage(data.message, msgType)
  }

  return (
    <section>
      <S.ListHeader>
        <S.ListHeaderTitle>
          Aulas&nbsp;&nbsp;
          <GroupsIcon/>
        </S.ListHeaderTitle>

        <S.ListHeaderLink to='/lesson/add'>
          <span>Cadastrar Aula</span>
          <AddIcon/>
        </S.ListHeaderLink>
      </S.ListHeader>

      <S.ListContainer>
        {lessons && lessons.length > 0 && lessons.map((lesson) => (
          <S.ListRow key={lesson._id}>
            <S.ListRowSpan>{lesson.teacher?.name}</S.ListRowSpan>
            <S.Actions>
              <S.ActionsLink to={`/lesson/edit/${lesson._id}`}>
                <span>Editar</span>
                <EditIcon fontSize={'small'}/>
              </S.ActionsLink>
              <S.ActionsButton onClick={() => removeLesson(lesson._id || "")}>
                <span>Excluir</span>
                <DeleteIcon fontSize={'small'}/>
              </S.ActionsButton>
            </S.Actions>
          </S.ListRow>
        ))}
        {lessons?.length === 0 && (<p>Não há aulas agendadas!</p>)}
      </S.ListContainer>
    </section>
  )
}