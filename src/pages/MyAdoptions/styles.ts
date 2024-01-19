import styled from "styled-components";
import "../../styles/variables.css"
import { Link } from 'react-router-dom'

export const PetListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2em;
`

export const PetListHeaderTitle = styled.h1`
  margin: 0;
  color: var(--blue);
`

export const PetListHeaderLink = styled(Link)`
  text-decoration: none;
  background-color: var(--blue);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  padding: 0.5em 0.8em;
  border: 2px solid var(--blue);
  border-radius: 5px;

  &:hover{
    background-color: transparent;
    color: var(--blue)
  }
`

export const PetListContainer = styled.div`
  display: flex;
  flex-direction: column
`

export const PetListRow = styled.div`
  border-bottom: 1px solid var(--blue);
  padding: 1em;
  margin: 1em;
  display: flex;
  align-items: center;
`

export const PetListRowImg = styled.img`
  margin-right: 1em;
`

export const PetListRowSpan = styled.span`
  min-width: 100px;
`

export const Actions = styled.div`
  margin-left: auto;
`

export const ActionsButton = styled.button`
  text-decoration: none;
  background-color: transparent;
  color: var(--blue);
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  padding: 7px 12px;
  border: 2px solid var(--blue);
  border-radius: 5px;
  font-size: 12px;
  margin-left: 1em;

  &:hover{
    background-color: var(--blue);
    color: white;
  }
`

export const ActionsLink = styled(Link)`
  text-decoration: none;
  background-color: transparent;
  color: var(--blue);
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  padding: 7px 12px;
  border: 2px solid var(--blue);
  border-radius: 5px;
  font-size: 12px;
  margin-left: 1em;

  &:hover{
    background-color: var(--blue);
    color: white;
  }
`

export const ActionsConcludeButton = styled.button`
  color: #25b456;
  border-color: #25b456;

  &:hover{
    color: white;
    background-color: #25b456;
  }
`

export const Contacts = styled.div`
  margin-left: 2em;
`

export const ContactsParagraph = styled.p`
  margin-bottom: .5em;
`