import React, { useState, useEffect, ChangeEvent } from 'react'
import { SquareImage } from '../../components/SquareImage'
import useFlashMessage from '../../hooks/useFlashMessage'
import api from '../../utils/api'
import * as S from './styles'
import ICompany from '../../interfaces/ICompany'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupsIcon from '@mui/icons-material/Groups';
import NoPicture from '../../assets/no-picture.png'
import { InputFilter } from '../../components/InputFilter'

export const Companies = () => {
  const [companies, setCompanies] = useState<ICompany[] | undefined>()
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api.get('/companies', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setCompanies(res.data.companies)
    })
  }, [token])

  const removeCompany = async (id: string) => {
    let msgType = "success"

    const data = await api.delete(`/companies/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      const updatedCompanys = companies?.filter((company: ICompany) => company._id !== id)
      setCompanies(updatedCompanys)

      return res.data
    }).catch((err) => {
      msgType = "error"
      return err.response.data
    })

    setFlashMessage(data.message, msgType)
  }

  const handleFilter = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    api.get('/companies', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      if (value.trim() === '') {
        setCompanies(res.data.companies)
      } else {
        const filteredCompanys = res.data.companies?.filter((company: ICompany) => company.name.toLowerCase().includes(value.toLowerCase()));
        setCompanies(filteredCompanys);
      }
    })
  }

  return (
    <section>
      <S.ListHeader>
        <S.ListHeaderTitle>
          Usuarios&nbsp;({companies?.length})&nbsp;
          <GroupsIcon fontSize='small'/>
        </S.ListHeaderTitle>

        <InputFilter
          name='search'
          placeholder='Buscar por nome'
          handleOnChange={handleFilter}
        />

        <S.ListHeaderLink to='/company/add'>
          <span>Cadastrar Usuário</span>
          <AddIcon fontSize='small'/>
        </S.ListHeaderLink>
      </S.ListHeader>

      <S.ListContainer>
        {companies && companies.length > 0 && companies.map((company) => (
          <S.ListRow key={company._id}>
            <SquareImage
              src={
                company.image && company.image.length > 0
                  ? `${process.env.REACT_APP_API}/images/companies/${company.image[0]}`
                  : NoPicture
              }
              alt={company.name}
              width="px75"
            />
            <S.ListRowSpan>{company.name}</S.ListRowSpan>
            <S.Actions>
              <S.ActionsLink to={`/company/edit/${company._id}`}>
                <span>Editar</span>
                <EditIcon fontSize={'small'}/>
              </S.ActionsLink>
              <S.ActionsButton onClick={() => removeCompany(company._id || "")}>
                <span>Excluir</span>
                <DeleteIcon fontSize={'small'}/>
              </S.ActionsButton>
            </S.Actions>
          </S.ListRow>
        ))}
        {companies?.length === 0 && (<p>Não há usuarios cadastrados!</p>)}
      </S.ListContainer>
    </section>
  )
}