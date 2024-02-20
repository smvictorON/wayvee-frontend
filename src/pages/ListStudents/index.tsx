import React, { useState, useEffect, ChangeEvent } from 'react'
import { SquareImage } from '../../components/Image'
import useFlashMessage from '../../hooks/useFlashMessage'
import api from '../../utils/api'
import * as S from '../styles-lists'
import IStudent from '../../interfaces/IStudent'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupsIcon from '@mui/icons-material/Groups';
import NoPicture from '../../assets/no-picture.png'
import { InputFilter } from '../../components/InputFilter'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';

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

  const navigate = useNavigate();
  const handleClick = (student: any) => {
    navigate(`/payment/add`, {
      state: {
        data: student,
        model: "Student",
        date: new Date(),
      }
    });
  };

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

  const handleFilter = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    api.get('/students', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      if (value.trim() === '') {
        setStudents(res.data.students)
      } else {
        const filteredStudents = res.data.students?.filter((student: IStudent) => student.name.toLowerCase().includes(value.toLowerCase()));
        setStudents(filteredStudents);
      }
    })
  }

  return (
    <section>
      <S.ListHeader>
        <S.ListHeaderTitle>
          Alunos&nbsp;({students?.length})&nbsp;
          <GroupsIcon fontSize='small'/>
        </S.ListHeaderTitle>

        <InputFilter
          name='search'
          placeholder='Buscar por nome'
          handleOnChange={handleFilter}
        />

        <S.ListHeaderLink to='/student/add'>
          <span>Cadastrar Aluno</span>
          <AddIcon fontSize='small'/>
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
            <S.ListRowSpan>{student.name}</S.ListRowSpan>
            <S.Actions>
              <S.ActionsLink to={`/student/edit/${student._id}`}>
                <span>Editar</span>
                <EditIcon fontSize={'small'}/>
              </S.ActionsLink>
              <S.ActionsButton color={"red"} onClick={() => removeStudent(student._id || "")}>
                <span>Excluir</span>
                <DeleteIcon fontSize={'small'}/>
              </S.ActionsButton>
              <S.ActionsButton onClick={() => handleClick(student)} color={"green"}>
                <span>Recebimento</span>
                <AttachMoneyIcon fontSize={'small'}/>
              </S.ActionsButton>
              <S.ActionsLink to={`/student/edit/${student._id}`}>
                <span>Informações</span>
                <InfoIcon fontSize={'small'}/>
              </S.ActionsLink>
            </S.Actions>
          </S.ListRow>
        ))}
        {students?.length === 0 && (<p>Não há alunos cadastrados!</p>)}
      </S.ListContainer>
    </section>
  )
}