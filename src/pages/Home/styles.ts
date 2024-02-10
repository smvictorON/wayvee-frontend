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

export const Paragraph = styled.p`
  margin-bottom: 1rem;
`

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
`

export const Item = styled.div`
  width: 500px;
  height: 300px;
  border: 5px solid white;
  border-radius: 5px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`
