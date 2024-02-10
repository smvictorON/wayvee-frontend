import React, { ChangeEvent, FormEvent, useState } from 'react'
import * as S from './styles'
import { Input } from '../Input'
import { InputFile } from '../InputFile'
import { InputMask } from '../InputMask'
import { Select } from '../Select'
import IUser from '../../interfaces/IUser'
import SaveIcon from '@mui/icons-material/Save';

interface FormUserProps {
  handleSubmit: (event: any) => void;
  userData: IUser;
  btnText: string
}

export const FormUser = ({
  handleSubmit,
  userData,
  btnText
}: FormUserProps) => {
  const [user, setUser] = useState(userData || {})
  const [preview, setPreview] = useState<File[]>([])

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if(files && files.length){
      setPreview(Array.from(files))
      setUser({ ...user, image: [...Array.from(files)] })
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    setUser({ ...user, [name]: e.target.options[e.target.selectedIndex].text as string });
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(user)
  }

  return (
    <S.FormContainer onSubmit={submit}>
      <S.PreviewContainer>
        {preview.length > 0 ?
          preview.map((image, index) => (
            <S.Image src={URL.createObjectURL(image)} alt={user.name} key={`${user.name}+${index}`} />
          ))
          :
          user.image &&
          user.image.map((image, index) => (
            <S.Image src={`${process.env.REACT_APP_API}/images/users/${image}`} alt={user.name} key={`${user.name}+${index}`} />
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
        value={user.name || ""}
        required={true}
      />
      <InputMask
        text="Telefone"
        type="text"
        name="phone"
        placeholder="Digite o telefone"
        handleOnChange={handleChange}
        value={user.phone || ""}
        required={true}
        mask="(99)99999-9999"
      />
      <Input
        text="Email"
        type="email"
        name="email"
        placeholder="Digite o email"
        handleOnChange={handleChange}
        value={user.email || ""}
      />
      <S.SubmitButton>
        {btnText}&nbsp;
        <SaveIcon/>
      </S.SubmitButton>
    </S.FormContainer>
  )
}