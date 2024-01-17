import styled from "styled-components";
import "../../styles/variables.css"
import { Link } from 'react-router-dom'

export const Header = styled.div`
  margin-bottom: 2em;
`

export const HeaderTitle = styled.h1`
  margin-bottom: .3em;
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
  margin-bottom: 1.2em;
`

export const Subtitle = styled.h3`
  color: #0097FE;
  margin-bottom: 1em;
  font-size: 1.6em;
  padding: 8px;
`

export const LinkRouter = styled(Link)`
  text-decoration: none;
  background-color: #ffd400;
  color: #0097FE;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  padding: 15px;
  border-radius: 5px;
  font-size: 1.1em;

  :hover{
    background-color: #e7c30d;
    color: white;
  }
`

export const Paragraph = styled.p`
  margin-bottom: 1em;
`

export const AdoptedText = styled.p`
  color: #25b456;
  font-weight: bold;
  padding: 15px;
`