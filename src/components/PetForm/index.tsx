import React, { ChangeEvent, useState } from 'react'
import * as S from './styles'
import { Input } from '../Input'
import { Select } from '../Select'
import { IPet } from '../../interfaces/IPet'

interface PetFormProps {
  handleSubmit: (event: any) => void;
  petData: IPet;
  btnText: string
}

export const PetForm = ({
  handleSubmit,
  petData,
  btnText
}: PetFormProps) => {
  const [pet, setPet] = useState(petData || {})
  const [preview, setPreview] = useState<File[]>([])
  const colors = ["Branco", "Caramelo", "Cinza", "Marrom", "Mesclado", "Preto"]

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if(files && files.length){
      setPreview(Array.from(files))
      setPet({ ...pet, images: [...Array.from(files)] })
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPet({ ...pet, [e.target.name]: e.target.value })
  }

  const handleColor = (e: ChangeEvent<HTMLSelectElement>) => {
    setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text })
  }

  const submit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(pet)
  }

  return (
    <S.FormContainer onSubmit={submit}>
      <S.PreviewContainer>
        {preview.length > 0 ?
          preview.map((image, index) => (
            <img src={URL.createObjectURL(image)} alt={pet.name} key={`${pet.name}+${index}`} />
          ))
          :
          pet.images &&
          pet.images.map((image, index) => (
            <img src={`${process.env.REACT_APP_API}/images/pets/${image}`} alt={pet.name} key={`${pet.name}+${index}`} />
          ))
        }
      </S.PreviewContainer>
      <Input
        text="Imagens do Pet"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input
        text="Nome do Pet"
        type="text"
        name="name"
        placeholder="Digite o nome"
        handleOnChange={handleChange}
        value={pet.name || ""}
      />
      <Input
        text="Idade do Pet"
        type="text"
        name="age"
        placeholder="Digite a idade"
        handleOnChange={handleChange}
        value={pet.age || ""}
      />
      <Input
        text="Peso do Pet"
        type="number"
        name="weight"
        placeholder="Digite o peso"
        handleOnChange={handleChange}
        value={pet.weight || ""}
      />
      <Select
        name="color"
        text="Selecione a cor"
        options={colors}
        handleOnChange={handleColor}
        value={pet.color || ""}
      />
      <S.SubmitButton type="submit" value={btnText} />
    </S.FormContainer>
  )
}