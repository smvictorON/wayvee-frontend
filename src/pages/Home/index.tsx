import React, { useState, useEffect } from 'react'
import * as S from './styles'
import api from '../../utils/api'
import { IPet } from '../../interfaces/IPet'

export const Home = () => {
  const [pets, setPets] = useState<IPet[]>([])

  useEffect(() => {
    api.get('/pets').then((res) => {
      setPets(res.data.pets)
    }).catch((err) => console.log(err))
  }, [])

  console.log(pets)

  return (
    <section>
      <S.Header>
        <S.HeaderTitle>Adote um Pet</S.HeaderTitle>
        <S.Paragraph>Veja os detalhes de cada um e conheça o tutor deles!</S.Paragraph>
      </S.Header>

      <S.PetContainer>
        {pets.length > 0 && (
          pets.map((pet, index) => (
            <S.PetCard key={index}>
              <S.PetCardImage style={{ backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})` }}></S.PetCardImage>
              <h3>{pet.name}</h3>
              <S.Paragraph>
                <span className='bold'>Peso: </span> {pet.weight}kg
              </S.Paragraph>

              {pet.available ? (
                <S.LinkRouter to={`pet/${pet._id}`}>Mais detalhes</S.LinkRouter>
              ) : (
                <S.AdoptedText>Adotado!</S.AdoptedText>
              )}
            </S.PetCard>
          ))
        )}
        {pets.length === 0 && (<p>Não há pets cadastrados ou disponíveis para a adoção no momento!</p>)}
      </S.PetContainer>
    </section>
  )
}