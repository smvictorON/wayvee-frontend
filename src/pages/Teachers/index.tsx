import React, { useState, useEffect, ChangeEvent } from 'react'
import { SquareImage } from '../../components/SquareImage'
import useFlashMessage from '../../hooks/useFlashMessage'
import api from '../../utils/api'
import * as S from './styles'
import ITeacher from '../../interfaces/ITeacher'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupsIcon from '@mui/icons-material/Groups';
import NoPicture from '../../assets/no-picture.png'
import { InputFilter } from '../../components/InputFilter'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const Teachers = () => {
  const [teachers, setTeachers] = useState<ITeacher[] | undefined>()
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api.get('/teachers', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setTeachers(res.data.teachers)
    })
  }, [token])

  const removeTeacher = async (id: string) => {
    let msgType = "success"

    const data = await api.delete(`/teachers/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      const updatedTeachers = teachers?.filter((teacher: ITeacher) => teacher._id !== id)
      setTeachers(updatedTeachers)

      return res.data
    }).catch((err) => {
      msgType = "error"
      return err.response.data
    })

    setFlashMessage(data.message, msgType)
  }

  const handleFilter = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    api.get('/teachers', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      if (value.trim() === '') {
        setTeachers(res.data.teachers)
      } else {
        const filteredTeachers = res.data.teachers?.filter((teacher: ITeacher) => teacher.name.toLowerCase().includes(value.toLowerCase()));
        setTeachers(filteredTeachers);
      }
    })
  }

  return (
    <section>
      <S.ListHeader>
        <S.ListHeaderTitle>
          Professores&nbsp;({teachers?.length})&nbsp;
          <GroupsIcon fontSize='small'/>
        </S.ListHeaderTitle>

        <InputFilter
          name='search'
          placeholder='Buscar por nome'
          handleOnChange={handleFilter}
        />

        <S.ListHeaderLink to='/teacher/add'>
          <span>Cadastrar Professor</span>
          <AddIcon fontSize='small'/>
        </S.ListHeaderLink>
      </S.ListHeader>

      <S.ListContainer>
        {teachers && teachers.length > 0 && teachers.map((teacher) => (
          <S.ListRow key={teacher._id}>
            <SquareImage
              src={
                teacher.images && teacher.images.length > 0
                  ? `${process.env.REACT_APP_API}/images/teachers/${teacher.images[0]}`
                  : NoPicture
              }
              alt={teacher.name}
              width="px75"
            />
            <S.ListRowSpan>{teacher.name}</S.ListRowSpan>
            <S.Actions>
              <S.ActionsLink to={`/teacher/edit/${teacher._id}`}>
                <span>Editar</span>
                <EditIcon fontSize={'small'}/>
              </S.ActionsLink>
              <S.ActionsButton onClick={() => removeTeacher(teacher._id || "")}>
                <span>Excluir</span>
                <DeleteIcon fontSize={'small'}/>
              </S.ActionsButton>
              <S.ActionsLink to={`/payment/${teacher._id}`} color={"green"}>
                <span>Pagamento</span>
                <AttachMoneyIcon fontSize={'small'}/>
              </S.ActionsLink>
            </S.Actions>
          </S.ListRow>
        ))}
        {teachers?.length === 0 && (<p>Não há professores cadastrados!</p>)}
      </S.ListContainer>
    </section>
  )
}