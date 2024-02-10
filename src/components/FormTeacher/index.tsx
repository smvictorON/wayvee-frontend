import React, { ChangeEvent, FormEvent, useState } from 'react'
import * as S from './styles'
import { Input } from '../Input'
import { InputFile } from '../InputFile'
import { InputDate } from '../InputDate'
import { InputMask } from '../InputMask'
import { Select } from '../Select'
import ITeacher from '../../interfaces/ITeacher'
import SaveIcon from '@mui/icons-material/Save';
import { States, Cities } from '../../interfaces/IAddress'

interface FormTeacherProps {
  handleSubmit: (event: any) => void;
  teacherData: ITeacher;
  btnText: string
}

export const FormTeacher = ({
  handleSubmit,
  teacherData,
  btnText
}: FormTeacherProps) => {
  const [teacher, setTeacher] = useState(teacherData || {})
  const [preview, setPreview] = useState<File[]>([])
  const states: string[] = Object.values(States);
  const cities = Cities

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if(files && files.length){
      setPreview(Array.from(files))
      setTeacher({ ...teacher, images: [...Array.from(files)] })
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setTeacher({
        ...teacher,
        address: {
          ...teacher.address,
          [addressField]: value,
        },
      });
    } else {
      setTeacher({ ...teacher, [name]: value });
    }
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setTeacher({
        ...teacher,
        address: {
          ...teacher.address,
          [addressField]: e.target.options[e.target.selectedIndex].text as string,
        },
      });
    } else {
      setTeacher({ ...teacher, [name]: e.target.options[e.target.selectedIndex].text as string });
    }
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(teacher)
  }

  return (
    <S.FormContainer onSubmit={submit}>
      <S.PreviewContainer>
        {preview.length > 0 ?
          preview.map((image, index) => (
            <S.Image src={URL.createObjectURL(image)} alt={teacher.name} key={`${teacher.name}+${index}`} />
          ))
          :
          teacher.images &&
          teacher.images.map((image, index) => (
            <S.Image src={`${process.env.REACT_APP_API}/images/teachers/${image}`} alt={teacher.name} key={`${teacher.name}+${index}`} />
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
        value={teacher.name || ""}
        required={true}
      />
      <InputMask
        text="Telefone"
        type="text"
        name="phone"
        placeholder="Digite o telefone"
        handleOnChange={handleChange}
        value={teacher.phone || ""}
        required={true}
        mask="(99)99999-9999"
      />
      <InputMask
        text="CPF"
        type="text"
        name="cpf"
        placeholder="Digite o cpf"
        handleOnChange={handleChange}
        value={teacher.cpf || ""}
        required={true}
        mask="999.999.999-99"
      />
      <Input
        text="Email"
        type="email"
        name="email"
        placeholder="Digite o email"
        handleOnChange={handleChange}
        value={teacher.email || ""}
      />
      <InputDate
        text="Data de Nascimento"
        name="birthdate"
        handleOnChange={handleChange}
        value={teacher.birthdate ? new Date(teacher.birthdate).toISOString().split('T')[0] : ""}
      />
      <InputMask
        text="RG"
        type="text"
        name="rg"
        placeholder="Digite o rg"
        handleOnChange={handleChange}
        value={teacher.rg || ""}
        mask="99.999.999-*"
      />
      <Input
        text="Rua"
        type="text"
        name="address.street"
        placeholder="Nome da rua"
        handleOnChange={handleChange}
        value={teacher?.address?.street || ""}
      />
      <InputMask
        text="CEP"
        type="text"
        name="address.zipCode"
        placeholder="Digite o CEP"
        handleOnChange={handleChange}
        value={teacher?.address?.zipCode || ""}
        mask="99999-999"
      />
      <Select
        name="address.city"
        text="Cidade"
        options={cities}
        handleOnChange={handleSelect}
        value={teacher.address?.city || ""}
      />
      <Select
        name="address.state"
        text="Estado (UF)"
        options={states}
        handleOnChange={handleSelect}
        value={teacher.address?.state || ""}
      />
      <S.SubmitButton>
        {btnText}&nbsp;
        <SaveIcon/>
      </S.SubmitButton>
    </S.FormContainer>
  )
}