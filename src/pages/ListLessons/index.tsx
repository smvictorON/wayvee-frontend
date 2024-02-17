import React, { useState, useEffect, ChangeEvent } from 'react'
import useFlashMessage from '../../hooks/useFlashMessage'
import api from '../../utils/api'
import * as S from '../styles-lists'
import ILesson from '../../interfaces/ILesson'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AlarmIcon from '@mui/icons-material/Alarm';
import { InputFilter } from '../../components/InputFilter'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

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

  const handleFilter = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    api.get('/lessons', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      if (value.trim() === '') {
        setLessons(res.data.lessons)
      } else {
        const filteredLessons = res.data.lessons?.filter((lesson: ILesson) => {
          if (typeof lesson.teacher !== 'string') {
            return lesson.teacher.name.toLowerCase().includes(value.toLowerCase())
          }
          return false
        });
        setLessons(filteredLessons);
      }
    })
  }

  return (
    <section>
      <S.ListHeader>
        <S.ListHeaderTitle>
          Aulas&nbsp;({lessons?.length})&nbsp;
          <CastForEducationIcon fontSize='small'/>
        </S.ListHeaderTitle>

        <InputFilter
          name='search'
          placeholder='Buscar por professor'
          handleOnChange={handleFilter}
        />

        <S.ListHeaderLink to='/lesson/add'>
          <span>Cadastrar Aula</span>
          <AddIcon fontSize='small'/>
        </S.ListHeaderLink>
      </S.ListHeader>

      <S.ListContainer>
        {lessons && lessons.length > 0 && lessons.map((lesson) => (
          <S.ListRow key={lesson._id}>
            <S.Data>
              <S.DataInfo>
                <div>
                  <SchoolIcon fontSize={'small'}/>
                  <span>{typeof lesson.teacher === 'object' ? lesson.teacher.name : ""}</span>
                </div>
                <div>
                  <GroupsIcon fontSize={'small'}/>
                  <span>{lesson.students.length} aluno(s)</span>
                </div>
              </S.DataInfo>
              <S.DataDate>
                <CalendarTodayIcon fontSize={'small'}/>
                <span>{new Date(lesson.date.substring(0, 10)).toLocaleDateString('pt-BR')}</span>
              </S.DataDate>
              <S.DataDate>
                <AlarmIcon fontSize={'small'}/>
                <span>{lesson.hour_start} - {lesson.hour_end}</span>
              </S.DataDate>
            </S.Data>
            <S.Actions>
              <S.ActionsLink to={`/lesson/edit/${lesson._id}`}>
                <span>Editar</span>
                <EditIcon fontSize={'small'}/>
              </S.ActionsLink>
              <S.ActionsButton onClick={() => removeLesson(lesson._id || "")}>
                <span>Cancelar</span>
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