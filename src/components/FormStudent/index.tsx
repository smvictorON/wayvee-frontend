import React, { ChangeEvent, useEffect, useState } from 'react'
import * as S from './styles'
import { Input } from '../Input'
import { InputFile } from '../InputFile'
import { InputDate } from '../InputDate'
import { InputMask } from '../InputMask'
import { Select } from '../Select'
import IStudent from '../../interfaces/IStudent'
import SaveIcon from '@mui/icons-material/Save';
import { States, Cities } from '../../interfaces/IAddress'

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
  const states: string[] = Object.values(States);
  const cities = Cities

  // useEffect(() => {
  //   if (studentData?.birthdate) {
  //     const formattedBirthdate = moment(studentData.birthdate).format('YYYY-MM-DD');

  //     setStudent({
  //       ...student,
  //       birthdate: formattedBirthdate,
  //     });
  //   }
  // }, [])

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if(files && files.length){
      setPreview(Array.from(files))
      setStudent({ ...student, images: [...Array.from(files)] })
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setStudent({
        ...student,
        address: {
          ...student.address,
          [addressField]: value,
        },
      });
    } else {
      setStudent({ ...student, [name]: value });
    }
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setStudent({
        ...student,
        address: {
          ...student.address,
          [addressField]: e.target.options[e.target.selectedIndex].text as string,
        },
      });
    } else {
      setStudent({ ...student, [name]: e.target.options[e.target.selectedIndex].text as string });
    }
  }

  const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleSubmit(student)
  }

  return (
    <S.FormContainer>
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
        value={student.name || ""}
        required={true}
      />
      <InputMask
        text="Telefone"
        type="text"
        name="phone"
        placeholder="Digite o telefone"
        handleOnChange={handleChange}
        value={student.phone || ""}
        required={true}
        mask="(99)99999-9999"
      />
      <InputMask
        text="CPF"
        type="text"
        name="cpf"
        placeholder="Digite o cpf"
        handleOnChange={handleChange}
        value={student.cpf || ""}
        required={true}
        mask="999.999.999-99"
      />
      <Input
        text="Email"
        type="email"
        name="email"
        placeholder="Digite o email"
        handleOnChange={handleChange}
        value={student.email || ""}
      />
      <InputDate
        text="Data de Nascimento"
        name="birthdate"
        handleOnChange={handleChange}
        value={student.birthdate ? new Date(student.birthdate).toISOString().split('T')[0] : ""}
      />
      <InputMask
        text="RG"
        type="text"
        name="rg"
        placeholder="Digite o rg"
        handleOnChange={handleChange}
        value={student.rg || ""}
        mask="99.999.999-*"
      />
      <Input
        text="Rua"
        type="text"
        name="address.street"
        placeholder="Nome da rua"
        handleOnChange={handleChange}
        value={student?.address?.street || ""}
      />
      <InputMask
        text="CEP"
        type="text"
        name="address.zipCode"
        placeholder="Digite o CEP"
        handleOnChange={handleChange}
        value={student?.address?.zipCode || ""}
        mask="99999-999"
      />
      <Select
        name="address.city"
        text="Cidade"
        options={cities}
        handleOnChange={handleSelect}
        value={student.address?.city || ""}
      />
      <Select
        name="address.state"
        text="Estado (UF)"
        options={states}
        handleOnChange={handleSelect}
        value={student.address?.state || ""}
      />
      <S.SubmitButton onClick={submit}>
        {btnText}&nbsp;
        <SaveIcon/>
      </S.SubmitButton>
    </S.FormContainer>
  )
}