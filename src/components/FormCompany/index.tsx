import React, { ChangeEvent, FormEvent, useState, useCallback } from 'react'
import * as S from './styles'
import { Input } from '../Input'
import { InputFile } from '../InputFile'
import { InputMask } from '../InputMask'
import ICompany from '../../interfaces/ICompany'
import SaveIcon from '@mui/icons-material/Save';
import { CitiesObj } from '../../interfaces/IAddress'
import { AddressFragment } from '../../components/AddressFragment'
import { PreviewFragment } from '../../components/PreviewFragment'

interface FormCompanyProps {
  handleSubmit: (event: any) => void;
  companyData: ICompany;
  btnText: string
}

export const FormCompany = ({
  handleSubmit,
  companyData,
  btnText
}: FormCompanyProps) => {
  const [company, setCompany] = useState(companyData || {})
  const [preview, setPreview] = useState<File[]>([])
  const [telMask, setTelMask] = useState("(99)9999-9999")

  const onFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files && files.length) {
      setPreview(Array.from(files))
      setCompany(prevCompany => ({ ...prevCompany, images: [...Array.from(files)] }))
    }
  }, [])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTelMask(name === 'phone' && value.substring(4, 5) === "9" ? "(99)99999-9999" : "(99)9999-9999")

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

  const submit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(company)
  }, [handleSubmit, company])

  return (
    <S.FormContainer onSubmit={submit}>
      <PreviewFragment preview={preview} data={company} />
      <InputFile
        text="Imagens"
        name="images"
        handleOnChange={onFileChange}
        multiple={false}
      />
      <Input
        text="Nome"
        type="text"
        name="name"
        placeholder="Digite o nome"
        handleOnChange={handleChange}
        value={company.name || ""}
        required={true}
      />
      <InputMask
        text="Telefone ou Celular"
        type="text"
        name="phone"
        placeholder="Digite o telefone ou celular"
        handleOnChange={handleChange}
        value={company.phone || ""}
        required={true}
        mask={telMask}
      />
      <InputMask
        text="CNPJ"
        type="text"
        name="cnpj"
        placeholder="Digite o cnpj"
        handleOnChange={handleChange}
        value={company.cnpj || ""}
        required={true}
        mask="99.999.999/9999-99"
      />
      <Input
        text="Email"
        type="email"
        name="email"
        placeholder="Digite o email"
        handleOnChange={handleChange}
        value={company.email || ""}
      />
      <AddressFragment
        handleChange={handleChange}
        handleSelect={handleSelect}
        address={company?.address || {}}
      />
      <S.SubmitButton>
        {btnText}&nbsp;
        <SaveIcon />
      </S.SubmitButton>
    </S.FormContainer>
  )
}