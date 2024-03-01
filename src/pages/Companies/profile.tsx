import React, { useState, useEffect, ChangeEvent, useCallback } from 'react'
import * as S from '../../styles/styles-profiles'
import api from '../../utils/api'
import { Input } from '../../components/Inputs/text'
import { InputFile } from '../../components/Inputs/file'
import useFlashMessage from '../../hooks/useFlashMessage'
import ICompany from '../../interfaces/ICompany'
import SaveIcon from '@mui/icons-material/Save';
import PortraitIcon from '@mui/icons-material/Portrait';
import { InputMask } from '../../components/Inputs/mask'
import { AddressFragment } from '../../components/AddressFragment'
import { PreviewFragment } from '../../components/PreviewFragment'
import { checkTelMask } from '../../utils/utils'
import { CitiesObj } from '../../interfaces/IAddress'

export const ProfileCompany = () => {
  const [company, setCompany] = useState<ICompany>({
    _id: '',
    name: '',
    phone: '',
    email: '',
    cnpj: '',
    images: [],
    address: {}
  })
  const [preview, setPreview] = useState<File[]>([])
  const [token] = useState(localStorage.getItem('token') || '')
  const [telMask, setTelMask] = useState(checkTelMask(company.phone))
  const { setFlashMessage } = useFlashMessage()
  const companyId = localStorage.getItem('company')?.replace(/"/g, '')

  useEffect(() => {
    api.get(`/companies/${companyId}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      const data = res.data.company;
      if (!data) return;

      setCompany(data);
      setTelMask(checkTelMask(data.phone));
      setPreview([]);
    })
  }, [companyId, token])

  const onFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files && files.length) {
      setPreview(Array.from(files))
      setCompany(prevCompany => ({ ...prevCompany, images: [...Array.from(files)] }))
    }
  }, [])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone')
      setTelMask(checkTelMask(value))

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setCompany(prevCompany => ({
        ...prevCompany,
        address: {
          ...prevCompany.address,
          [addressField]: value,
        },
      }));
    } else {
      setCompany(prevCompany => ({ ...prevCompany, [name]: value }));
    }
  }, [])

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    let msgType = "success"

    const formData = new FormData()

    if (company)
      Object.entries(company).forEach(([key, value]) => {
        if (value instanceof FileList) {
          for (let i = 0; i < value.length; i++) {
            formData.append(`${key}_${i}`, value[i]);
          }
        } else if (key === 'address') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

    const data = await api.patch(`/companies/${company?._id}`, formData, {
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

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  const handleSelect = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.options[e.target.selectedIndex].text;

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setCompany(prevCompany => ({
        ...prevCompany,
        address: {
          ...prevCompany.address,
          [addressField]: value,
          state: addressField === "city"
            ? CitiesObj.find(item => item.city === value)?.state
            : prevCompany?.address?.state
        },
      }));
    } else {
      setCompany(prevCompany => ({ ...prevCompany, [name]: value }));
    }
  }, [])

  return (
    <S.Section>
      <S.Header>
        <S.HeaderTitle>
          Empresa&nbsp;&nbsp;
          <PortraitIcon />
        </S.HeaderTitle>
        <p>Configurações gerais da empresa!</p>
      </S.Header>
      <S.FormContainer>
        <PreviewFragment preview={preview} data={company} folder={"companies"} />
        <InputFile
          text="Imagem"
          name="images"
          handleOnChange={onFileChange}
          multiple={false}
        />
        <Input
          text="Nome Fantasia ou Razão Social"
          type="text"
          name="name"
          placeholder="Digite o nome"
          handleOnChange={handleChange}
          value={company?.name || ""}
          required={true}
        />
        <InputMask
          text="Telefone ou Celular"
          type="text"
          name="phone"
          placeholder="Digite o numero"
          handleOnChange={handleChange}
          value={company?.phone || ""}
          required={true}
          mask={telMask}
        />
        <InputMask
          text="CNPJ"
          type="text"
          name="cnpj"
          placeholder="Digite o cnpj"
          handleOnChange={handleChange}
          value={company?.cnpj || ""}
          required={true}
          mask="99.999.999/9999-99"
          tooltipText='Cadastro Nacional de Pessoas Jurídicas'
        />
        <Input
          text="Email"
          type="email"
          name="email"
          placeholder="Digite o email"
          handleOnChange={handleChange}
          value={company?.email || ""}
        />
        <AddressFragment
          handleChange={handleChange}
          handleSelect={handleSelect}
          address={company?.address || {}}
        />
        <S.SubmitButton onClick={handleSubmit}>
          Editar&nbsp;
          <SaveIcon />
        </S.SubmitButton>
      </S.FormContainer>
    </S.Section>
  )
}