import React, { ChangeEvent, FormEvent, useState } from 'react'
import * as S from './styles'
import { Input } from '../Input'
import { InputFile } from '../InputFile'
import { InputMask } from '../InputMask'
import { Select } from '../Select'
import ICompany from '../../interfaces/ICompany'
import SaveIcon from '@mui/icons-material/Save';

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

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if(files && files.length){
      setPreview(Array.from(files))
      setCompany({ ...company, image: [...Array.from(files)] })
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    setCompany({ ...company, [name]: e.target.options[e.target.selectedIndex].text as string });
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(company)
  }

  return (
    <S.FormContainer onSubmit={submit}>
      <S.PreviewContainer>
        {preview.length > 0 ?
          preview.map((image, index) => (
            <S.Image src={URL.createObjectURL(image)} alt={company.name} key={`${company.name}+${index}`} />
          ))
          :
          company.image &&
          company.image.map((image, index) => (
            <S.Image src={`${process.env.REACT_APP_API}/images/companys/${image}`} alt={company.name} key={`${company.name}+${index}`} />
          ))
        }
      </S.PreviewContainer>
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
        text="Telefone"
        type="text"
        name="phone"
        placeholder="Digite o telefone"
        handleOnChange={handleChange}
        value={company.phone || ""}
        required={true}
        mask="(99)99999-9999"
      />
      <Input
        text="Email"
        type="email"
        name="email"
        placeholder="Digite o email"
        handleOnChange={handleChange}
        value={company.email || ""}
      />
      <S.SubmitButton>
        {btnText}&nbsp;
        <SaveIcon/>
      </S.SubmitButton>
    </S.FormContainer>
  )
}