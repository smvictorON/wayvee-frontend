import React, { useState } from "react"
import * as S from "./styles"
import api from "../../utils/api"
import { useNavigate } from "react-router-dom"
import useFlashMessage from "../../hooks/useFlashMessage"
import { PetForm } from "../../components/PetForm"
import { IPet } from "../../interfaces/IPet"

export const AddPet = () => {
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()
  const voidPet: IPet = {
    _id: '',
    name: '',
    age: '',
    weight: '',
    color: '',
    images: [],
    available: false,
    adopter: ''
  }

  const registerPet = async (pet: any) => {
    let msgType = "success"

    const formData = new FormData()

    await Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append('images', pet[key][i])
        }
      } else {
        formData.append(key, pet[key])
      }
    })

    const data = await api.post('/pets/create', formData, {
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

    if (msgType !== 'error')
      navigate('/pet/mypets')
  }

  return (
    <S.Section>
      <div>
        <S.Header>Cadastre um Pet</S.Header>
        <p>Depois ele ficará disponível para adoção!</p>
      </div>
      <PetForm btnText="Cadastrar Pet" handleSubmit={registerPet} petData={voidPet}/>
    </S.Section>
  )
}