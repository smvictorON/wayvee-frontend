import styled from "styled-components";
import "../../styles/variables.css"
import { Link } from 'react-router-dom'

export const Header = styled.div`
  margin-bottom: 2rem;
`

export const HeaderTitle = styled.h1`
  margin-bottom: 0.3rem;
  color: var(--blue);
`

export const PetContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`

export const PetCard = styled.div`
  width: 22%;
  margin: 1.5%;
  display: flex;
  flex-direction: column;
  text-align: center;
`

export const PetCardImage = styled.div`
  background-size: cover;
  background-position: center;
  height: 225px;
  width: 100%;
  margin-bottom: 1.2rem;
  border-radius: 5px
`

export const Subtitle = styled.h3`
  color: var(--blue);
  margin-bottom: 1rem;
  font-size: 1.6rem;
  padding: 8px;
`

export const LinkRouter = styled(Link)`
  text-decoration: none;
  background-color: var(--light-blue);
  color: var(--white);
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  padding: 15px;
  border-radius: 5px;
  font-size: 1.1rem;

  &:hover{
    background-color: var(--light-blue-2);
  }
`

export const Paragraph = styled.p`
  margin-bottom: 1rem;
`

export const AdoptedText = styled.p`
  color: var(--blue);
  font-weight: bold;
  padding: 15px;
`