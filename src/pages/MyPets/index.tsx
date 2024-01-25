import React, { useState, useEffect } from 'react'
import { SquareImage } from '../../components/SquareImage'
import useFlashMessage from '../../hooks/useFlashMessage'
import api from '../../utils/api'
import * as S from './styles'
import { IPet } from '../../interfaces/IPet'

export const MyPets = () => {
  const [pets, setPets] = useState<IPet[] | undefined>()
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api.get('/pets/mypets', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setPets(res.data.pets)
    })
  }, [token])

  const removePet = async (id: string) => {
    let msgType = "success"

    const data = await api.delete(`/pets/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      const updatedPets = pets?.filter((pet: IPet) => pet._id !== id)
      setPets(updatedPets)
      return res.data
    }).catch((err) => {
      msgType = "error"
      return err.response.data
    })

    setFlashMessage(data.message, msgType)
  }

  const concludeAdoption = async (id: string) => {
    let msgType = "success"

    const data = await api.patch(`/pets/conclude/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      return res.data
    }).catch((err) => {
      msgType = "error"
      return err.response.data
    })

    setFlashMessage(data.message, msgType)
  }

  return (
    <section>
      <S.PetListHeader>
        <S.PetListHeaderTitle>Meus Alunos</S.PetListHeaderTitle>
        <S.PetListHeaderLink to='/student/add'>Cadastrar Aluno</S.PetListHeaderLink>
      </S.PetListHeader>

      <S.PetListContainer>
        {pets && pets.length > 0 && pets.map((pet) => (
          <S.PetListRow key={pet._id}>
            <SquareImage src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`} alt={pet.name} width="px75" />
            <strong>{pet.name}</strong>
            <S.Actions>
              {pet.available ? (
                <>
                  {pet.adopter && (
                    <S.ActionsConcludeButton
                      onClick={() => concludeAdoption(pet._id)}>
                      Concluir adoção
                    </S.ActionsConcludeButton>
                  )
                  }
                  <S.ActionsLink to={`/pet/edit/${pet._id}`}>Editar</S.ActionsLink>
                  <S.ActionsButton onClick={() => removePet(pet._id)}>Excluir</S.ActionsButton>
                </>
              ) : (<p>Pet já adotado!</p>)}
            </S.Actions>
          </S.PetListRow>
        ))}
        {pets?.length === 0 && (<p>Não há alunos cadastrados!</p>)}
      </S.PetListContainer>
    </section>
  )
}