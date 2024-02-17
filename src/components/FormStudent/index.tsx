import React, { ChangeEvent, FormEvent, useState, useCallback } from 'react'
import * as S from '../styles-forms'
import { Input } from '../Input'
import { InputFile } from '../InputFile'
import { InputDate } from '../InputDate'
import { InputMask } from '../InputMask'
import { Select } from '../Select'
import IStudent from '../../interfaces/IStudent'
import { Genders } from '../../interfaces/Common'
import SaveIcon from '@mui/icons-material/Save';
import { CitiesObj } from '../../interfaces/IAddress'
import { AddressFragment } from '../../components/AddressFragment'
import { PreviewFragment } from '../../components/PreviewFragment'
import { checkTelMask } from '../../utils/utils'

interface FormStudentProps {
  handleSubmit: (event: any) => void;
  studentData: IStudent;
  btnText: string
}

export const FormStudent = ({
  handleSubmit,
  studentData,
  btnText
}: FormStudentProps) => {
  const [student, setStudent] = useState(studentData || {})
  const [preview, setPreview] = useState<File[]>([])
  const [telMask, setTelMask] = useState(checkTelMask(student.phone))

  const onFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if(files && files.length){
      setPreview(Array.from(files))
      setStudent(prevStudent => ({ ...prevStudent, images: [...Array.from(files)] }))
    }
  }, [])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if(name === 'phone')
      setTelMask(checkTelMask(value))

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setStudent(prevStudent => ({
        ...prevStudent,
        address: {
          ...prevStudent.address,
          [addressField]: value,
        },
      }));
    } else {
      setStudent(prevStudent => ({ ...prevStudent, [name]: value }));
    }
  }, [])

  const handleSelect = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    let value:any;

    if(name === "gender")
      value = e.target.options[e.target.selectedIndex].value;
    else
      value = e.target.options[e.target.selectedIndex].text;

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setStudent(prevStudent => ({
        ...prevStudent,
        address: {
          ...prevStudent.address,
          [addressField]: value,
          state: addressField === "city"
            ? CitiesObj.find(item => item.city === value)?.state
            : prevStudent?.address?.state
        },
      }));
    } else {
      setStudent(prevStudent => ({ ...prevStudent, [name]: value }));
    }
  }, [])

  const submit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(student)
  }, [handleSubmit, student])

  return (
    <S.FormContainer onSubmit={submit}>
      <PreviewFragment preview={preview} data={student} folder={"students"} />
      <InputFile
        text="Imagens"
        name="images"
        handleOnChange={onFileChange}
        multiple={false}
      />
      <Input
        text="Nome Completo"
        type="text"
        name="name"
        placeholder="Digite o nome"
        handleOnChange={handleChange}
        value={student.name || ""}
        required={true}
      />
      <InputMask
        text="Telefone ou Celular"
        type="text"
        name="phone"
        placeholder="Digite o numero"
        handleOnChange={handleChange}
        value={student.phone || ""}
        required={true}
        mask={telMask}
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
        tooltipText='Cadastro de Pessoas Físicas'
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
      <Select
        text="Sexo"
        name="gender"
        options={Genders}
        handleOnChange={handleSelect}
        value={student?.gender || ""}
      />
      <InputMask
        text="RG"
        type="text"
        name="rg"
        placeholder="Digite o rg"
        handleOnChange={handleChange}
        value={student.rg || ""}
        mask="99.999.999-*"
        tooltipText='Registro Geral'
      />
      <AddressFragment
        handleChange={handleChange}
        handleSelect={handleSelect}
        address={student?.address || {}}
      />
      <S.SubmitButton>
        {btnText}&nbsp;
        <SaveIcon/>
      </S.SubmitButton>
    </S.FormContainer>
  )
}