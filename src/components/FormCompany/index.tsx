import React, { ChangeEvent, FormEvent, useState } from 'react'
import * as S from './styles'
import { Input } from '../Input'
import { InputFile } from '../InputFile'
import { InputMask } from '../InputMask'
import { Select } from '../Select'
import ICompany from '../../interfaces/ICompany'
import SaveIcon from '@mui/icons-material/Save';
import { States, Cities } from '../../interfaces/IAddress'

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
  const states: string[] = Object.values(States);
  const cities = Cities

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if(files && files.length){
      setPreview(Array.from(files))
      setCompany({ ...company, images: [...Array.from(files)] })
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setCompany({
        ...company,
        address: {
          ...company.address,
          [addressField]: value,
        },
      });
    } else {
      setCompany({ ...company, [name]: value });
    }
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setCompany({
        ...company,
        address: {
          ...company.address,
          [addressField]: e.target.options[e.target.selectedIndex].text as string,
        },
      });
    } else {
      setCompany({ ...company, [name]: e.target.options[e.target.selectedIndex].text as string });
    }
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
          company.images &&
          company.images.map((image, index) => (
            <S.Image src={`${process.env.REACT_APP_API}/images/companies/${image}`} alt={company.name} key={`${company.name}+${index}`} />
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
      <Input
        text="Rua"
        type="text"
        name="address.street"
        placeholder="Nome da rua"
        handleOnChange={handleChange}
        value={company?.address?.street || ""}
      />
      <InputMask
        text="CEP"
        type="text"
        name="address.zipCode"
        placeholder="Digite o CEP"
        handleOnChange={handleChange}
        value={company?.address?.zipCode || ""}
        mask="99999-999"
      />
      <Select
        name="address.city"
        text="Cidade"
        options={cities}
        handleOnChange={handleSelect}
        value={company.address?.city || ""}
      />
      <Select
        name="address.state"
        text="Estado (UF)"
        options={states}
        handleOnChange={handleSelect}
        value={company.address?.state || ""}
      />
      <S.SubmitButton>
        {btnText}&nbsp;
        <SaveIcon/>
      </S.SubmitButton>
    </S.FormContainer>
  )
}