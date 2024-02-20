import React, { useState, useEffect, ChangeEvent } from 'react'
import * as S from './styles'
import api from '../../utils/api'
import { Input } from '../../components/Input'
import { InputFile } from '../../components/InputFile'
import useFlashMessage from '../../hooks/useFlashMessage'
import { SquareImage } from '../../components/Image'
import ICompany from '../../interfaces/ICompany'
import SaveIcon from '@mui/icons-material/Save';
import PortraitIcon from '@mui/icons-material/Portrait';

export const ProfileCompany = () => {
  const [company, setCompany] = useState<ICompany | undefined>()
  const [preview, setPreview] = useState<File>()
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api.get('/companys/checkcompany', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setCompany(res.data)
    })
  }, [token])

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const name = e.target.name

    if(files && files.length){
      setPreview(files[0])

      if(company)
        setCompany({ ...company, [name]: files[0] })
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const name = e.target.name

    if(company)
      setCompany({ ...company, [name]: value })
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    let msgType = "success"

    const formData = new FormData()

    if(company)
      Object.entries(company).forEach(([key, value]) => {
        if (value instanceof FileList) {
          for (let i = 0; i < value.length; i++) {
            formData.append(`${key}_${i}`, value[i]);
          }
        } else {
          formData.append(key, value);
        }
      });

    const data = await api.patch(`/companies/edit/${company?._id}`, formData, {
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
      <S.Header>
        <S.HeaderTitle>
          Empresa&nbsp;&nbsp;
          <PortraitIcon/>
        </S.HeaderTitle>
        <p>Configurações gerais da empresa!</p>
      </S.Header>

      <S.FormContainer>
        <Input
          text="Email"
          type="email"
          name="email"
          handleOnChange={handleChange}
          placeholder="Digite seu Email"
          value={company?.email || ''}
        />
        <Input
          text="Nome"
          type="text"
          name="name"
          handleOnChange={handleChange}
          placeholder="Digite seu Nome"
          value={company?.name || ''}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          handleOnChange={handleChange}
          placeholder="Digite seu Telefone"
          value={company?.phone || ''}
        />
        <S.SubmitButton onClick={handleSubmit}>
          Editar&nbsp;
          <SaveIcon/>
        </S.SubmitButton>
      </S.FormContainer>
    </S.Section>
  )
}