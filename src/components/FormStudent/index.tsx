import React, { ChangeEvent, useState } from 'react'
import * as S from './styles'
import { Input } from '../Input'
import { Select } from '../Select'
import IStudent from '../../interfaces/IStudent'
import SaveIcon from '@mui/icons-material/Save';

interface StudentFormProps {
  handleSubmit: (event: any) => void;
  studentData: IStudent;
  btnText: string
}

export const StudentForm = ({
  handleSubmit,
  studentData,
  btnText
}: StudentFormProps) => {
  const [student, setStudent] = useState(studentData || {})
  const [preview, setPreview] = useState<File[]>([])
  // const options = ["Branco", "Caramelo", "Cinza", "Marrom", "Mesclado", "Preto"]

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if(files && files.length){
      setPreview(Array.from(files))
      setStudent({ ...student, images: [...Array.from(files)] })
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [e.target.name]: e.target.value })
  }

  // const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
  //   setStudent({ ...student, nameOfYourInterfaceField: e.target.options[e.target.selectedIndex].text })
  // }

  const submit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(student)
  }

  return (
    <S.FormContainer onSubmit={submit}>
      <S.PreviewContainer>
        {preview.length > 0 ?
          preview.map((image, index) => (
            <S.Image src={URL.createObjectURL(image)} alt={student.name} key={`${student.name}+${index}`} />
          ))
          :
          student.images &&
          student.images.map((image, index) => (
            <S.Image src={`${process.env.REACT_APP_API}/images/students/${image}`} alt={student.name} key={`${student.name}+${index}`} />
          ))
        }
      </S.PreviewContainer>
      <Input
        text="Imagens"
        type="file"
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
        value={student.name || ""}
        required={true}
      />
      <Input
        text="Telefone"
        type="text"
        name="phone"
        placeholder="Digite o telefone"
        handleOnChange={handleChange}
        value={student.phone || ""}
        required={true}
      />
      <Input
        text="CPF"
        type="text"
        name="cpf"
        placeholder="Digite o cpf"
        handleOnChange={handleChange}
        value={student.cpf || ""}
        required={true}
      />
      <Input
        text="Email"
        type="email"
        name="email"
        placeholder="Digite o email"
        handleOnChange={handleChange}
        value={student.email || ""}
      />
      <Input
        text="Data de Nascimento"
        type="date"
        name="birthdate"
        placeholder="Digite a data de nascimento"
        handleOnChange={handleChange}
        value={student.birthdate?.toString() || ""}
      />
      <Input
        text="RG"
        type="text"
        name="rg"
        placeholder="Digite o rg"
        handleOnChange={handleChange}
        value={student.rg || ""}
      />
      {/* <Select
        name="color"
        text="Selecione a cor"
        options={options}
        handleOnChange={handleSelect}
        value={student.color || ""}
      /> */}
      <S.SubmitButton>
        <S.SubmitInput type="submit" value={btnText}/>&nbsp;
        <SaveIcon/>
      </S.SubmitButton>
    </S.FormContainer>
  )
}