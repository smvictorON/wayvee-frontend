import React, { useState, useEffect } from 'react'
import * as S from './styles'
import api from '../../utils/api'
import { useParams, Link } from 'react-router-dom'
import useFlashMessage from '../../hooks/useFlashMessage'
import { IPet } from '../../interfaces/IPet'

export const PetDetails = () => {
  const [pet, setPet] = useState<IPet | undefined>()
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api.get(`/pets/${id}`).then((res) => {
      setPet(res.data.pet)
    }).catch((err) => console.log(err))
  }, [id])

  const schedule = async () => {
    let msgType = "success"

    const data = await api.patch(`/pets/schedule/${pet?._id}`, {}, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      },
    }).then((res) => {
      return res.data
    }).catch((err) => {
      msgType = 'error'
      return err.response.data
    })

    setFlashMessage(data.message, msgType)
  }

  return (
    <>
      {pet?.name && (
        <S.PetDetailsContainer>
          <S.PetDetailsHeader>
            <S.PetDetailsHeaderTitle>Conhecendo o Pet: {pet.name}</S.PetDetailsHeaderTitle>
            <S.PetDetailsParagraph>Se tiver interesse marque uma visita para conheçe-lo!</S.PetDetailsParagraph>
          </S.PetDetailsHeader>

          <S.PetImagesContainer>
            {pet?.images.map((img, index) => (
              <S.PetImage src={`${process.env.REACT_APP_API}/images/pets/${img}`} alt={pet.name} key={index} />
            ))}
          </S.PetImagesContainer>

          <S.PetDetailsParagraph>
            <strong>Peso: </strong> {pet?.weight}kg
          </S.PetDetailsParagraph>
          <S.PetDetailsParagraph>
            <strong>Idade: </strong> {pet?.age} anos
          </S.PetDetailsParagraph>

          {token ? (
            <S.PetDetailsContainerButton onClick={schedule}>Solicitar uma visita!</S.PetDetailsContainerButton>
          ) : (
            <p>Você precisa <Link to="/register">criar uma conta</Link> para solicitar a visita!</p>
          )}
        </S.PetDetailsContainer>
      )}
    </>
  )
}