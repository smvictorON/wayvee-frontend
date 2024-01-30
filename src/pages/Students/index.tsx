import React, { useState, useEffect } from 'react'
import { SquareImage } from '../../components/SquareImage'
import useFlashMessage from '../../hooks/useFlashMessage'
import api from '../../utils/api'
import * as S from './styles'
import IStudent from '../../interfaces/IStudent'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupsIcon from '@mui/icons-material/Groups';
import NoPicture from '../../assets/no-picture.png'

export const Students = () => {
  const [students, setStudents] = useState<IStudent[] | undefined>()
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api.get('/students', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setStudents(res.data.students)
    })
  }, [token])

  const removeStudent = async (id: string) => {
    let msgType = "success"

    const data = await api.delete(`/students/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      const updatedStudents = students?.filter((student: IStudent) => student._id !== id)
      setStudents(updatedStudents)

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
          Alunos&nbsp;&nbsp;
          <GroupsIcon/>
        </S.ListHeaderTitle>

        <S.ListHeaderLink to='/student/add'>
          Cadastrar Aluno
          <AddIcon/>
        </S.ListHeaderLink>
      </S.ListHeader>

      <S.ListContainer>
        {students && students.length > 0 && students.map((student) => (
          <S.ListRow key={student._id}>
            <SquareImage
              src={
                student.images && student.images.length > 0
                  ? `${process.env.REACT_APP_API}/images/students/${student.images[0]}`
                  : NoPicture
              }
              alt={student.name}
              width="px75"
            />
            <strong>{student.name}</strong>
            <S.Actions>
              <S.ActionsLink to={`/student/edit/${student._id}`}>
                Editar
                <EditIcon fontSize={'small'}/>
              </S.ActionsLink>
              <S.ActionsButton onClick={() => removeStudent(student._id || "")}>
                Excluir
                <DeleteIcon fontSize={'small'}/>
              </S.ActionsButton>
            </S.Actions>
          </S.ListRow>
        ))}
        {students?.length === 0 && (<p>Não há alunos cadastrados!</p>)}
      </S.ListContainer>
    </section>
  )
}