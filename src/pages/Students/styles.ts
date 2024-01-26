import styled from "styled-components";
import "../../styles/variables.css"
import { Link } from 'react-router-dom'

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2em;
`

export const ListHeaderTitle = styled.h1`
  margin: 0;
  color: var(--blue);
  display: flex;
  align-items: center;
`

export const ListHeaderLink = styled(Link)`
  text-decoration: none;
  background-color: var(--blue);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  padding: 0.5em 0.8em;
  border: 2px solid var(--blue);
  border-radius: 5px;
  display: flex;
  flow-direction: row;
  align-items: center;
  justify-content: center;

  &:hover{
    background-color: transparent;
    color: var(--blue)
  }
`

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column
`

export const ListRow = styled.div`
  border-bottom: 1px solid var(--blue);
  padding: 0.5em;
  margin: 0.5em;
  display: flex;
  align-items: center;
`

export const ListRowImg = styled.img`
  margin-right: 1em;
`

export const ListRowSpan = styled.span`
  min-width: 100px;
`

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: -webkit-fill-available;
`

export const ActionsButton = styled.button`
  text-decoration: none;
  background-color: transparent;
  color: var(--blue);
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  padding: 7px 12px;
  border: 1px solid var(--blue);
  border-radius: 5px;
  font-size: 12px;
  margin-left: 1em;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100px;

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
  border: 1px solid var(--blue);
  border-radius: 5px;
  font-size: 12px;
  margin-left: 1em;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100px;

  &:hover{
    background-color: var(--blue);
    color: white;
  }
`