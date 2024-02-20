import React, { useState } from "react"
import * as S from "../styles-pages"
import api from "../../utils/api"
import { useNavigate } from "react-router-dom"
import useFlashMessage from "../../hooks/useFlashMessage"
import { FormCompany } from "../../components/FormCompany"
import ICompany from "../../interfaces/ICompany"

export const AddCompany = () => {
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()
  const voidCompany: ICompany = {
    _id: '',
    name: '',
    phone: '',
    email: '',
    cnpj: '',
    images: [],
  }

  const registerCompany = async (company: any) => {
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

    const data = await api.post('/companies/create', formData, {
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
      navigate('/companies')
  }

  return (
    <S.Section>
      <div>
        <S.Header>Cadastre uma Empresa</S.Header>
        <p>Depois ela ficará disponível para edição!</p>
      </div>
      <FormCompany buttonText="Cadastrar" handleSubmit={registerCompany} companyData={voidCompany}/>
    </S.Section>
  )
}