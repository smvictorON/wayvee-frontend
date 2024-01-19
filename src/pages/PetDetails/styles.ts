import styled from "styled-components";
import "../../styles/variables.css"

export const PetDetailsContainer = styled.section`
  text-align: center;
`

export const PetDetailsParagraph = styled.p`
  margin-bottom: 1em;
`

export const PetDetailsHeader = styled.div`
  margin-bottom: 2em;
`

export const PetDetailsHeaderTitle = styled.h1`
  color: var(--blue);
`

export const PetImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
  max-width: 1000px;
  margin: 0 auto;
  flex-wrap: wrap;
`

export const PetImage = styled.img`
  max-height: 100px;
  margin: 1em;
  border-radius: 5px;
`

export const PetDetailsContainerButton = styled.button`
  text-decoration: none;
  background-color: var(--light-blue);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  padding: 7px 15px;
  border-radius: 5px;
  font-size: 1.1em;
  margin-left: 1em;
  min-height: 2.5em;
  border: 0;

  &:hover{
    background-color: var(--light-blue-2);
  }
`
