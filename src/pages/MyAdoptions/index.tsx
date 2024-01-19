import React, { useState, useEffect } from 'react'
import * as S from './styles'
import api from '../../utils/api'
import { SquareImage } from '../../components/SquareImage'
import { IPet } from '../../interfaces/IPet'

export const MyAdoptions = () => {
  const [pets, setPets] = useState<IPet[] | undefined>()
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api.get('/pets/myadoptions', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setPets(res.data.pets)
    }).catch((err) => {
      console.log(err);
    })
  }, [token])

  return (
    <section>
      <S.PetListHeader>
        <S.PetListHeaderTitle>Minhas adoções</S.PetListHeaderTitle>
      </S.PetListHeader>

      <S.PetListContainer>
        {pets && pets.length > 0 && pets.map((pet) => (
          <S.PetListRow key={pet._id}>
            <SquareImage src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`} alt={pet.name} width="px75" />
            <strong>{pet.name}</strong>

            <S.Contacts>
              <S.ContactsParagraph>
                <span className='bold'>Ligue para:</span> {pet?.user?.phone}
              </S.ContactsParagraph>
              <S.ContactsParagraph>
                <span className='bold'>Fale com:</span> {pet?.user?.name}
              </S.ContactsParagraph>
            </S.Contacts>

            <S.Actions>
              {pet.available ? (
                <p>Adoção em Processo.</p>
              ) : (
                <p>Parabéns por concluir a adoção!</p>
              )}
            </S.Actions>
          </S.PetListRow>
        ))}

        {pets && pets.length === 0 && (<p>Ainda não há adoções de Pets!</p>)}
      </S.PetListContainer>
    </section>
  )
}