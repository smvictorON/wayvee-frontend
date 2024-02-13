import React, { useState, useEffect } from 'react'
import * as S from './styles'
import api from '../../utils/api'
import { useParams } from 'react-router-dom'
import useFlashMessage from '../../hooks/useFlashMessage'
import { FormCompany } from '../../components/FormCompany'
import ICompany from '../../interfaces/ICompany'

export const EditCompany = () => {
  const [company, setCompany] = useState<ICompany | undefined>()
  const [token] = useState(localStorage.getItem('token') || '')
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api.get(`/companies/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setCompany(res.data.company)
    })
  }, [token, id])

  const updateCompany = async (company: any) => {
    let msgType = "success"

    if(!company.address)
      company.address = {}

    const formData = new FormData()

    Object.keys(company).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < company[key].length; i++) {
          formData.append('images', company[key][i])
        }
      } else if (key === 'address') {
        formData.append('address', JSON.stringify(company[key]));
      } else {
        formData.append(key, company[key])
      }
    })

    const data = await api.patch(`/companies/${company._id}`, formData, {
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
        <S.Header>Editando a Empresa: {company?.name}</S.Header>
        <p>Depois da edição os dados ficarão atualizados no sistema.</p>
      </div>
      {company?.name && <FormCompany btnText="Atualizar" handleSubmit={updateCompany} companyData={company} />}
    </S.Section>
  )
}