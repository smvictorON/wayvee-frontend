import styled from "styled-components";
import "../../styles/variables.css"
import { Link } from 'react-router-dom'

export const Section = styled.section`
  text-align: center;
  margin-bottom: 1.2rem;
`
export const Header = styled.h1`
  margin-bottom: 0.2rem;
  color: var(--blue);
`

export const FormContainerParagraph = styled.p`
  margin-top: 1rem;
`

export const FormContainerParagraphLink = styled(Link)`
  color: var(--blue);
  font-weight: bold;
  text-decoration: none;
`

export const FormContainer = styled.form`
  max-width: 600px;
  margin: 2rem auto;
  background-color: var(--light-gray);
  border-radius: 5px;
  border: 5px solid white;
  padding: 2rem;
`

export const SubmitButton = styled.button`
  border-radius: 5px;
  background-color: var(--light-blue);
  color: white;
  min-width: 100px;
  padding: 0.6rem;
  width: 100%;
  cursor: pointer;
  transition: 0.2s;
  margin: 2rem auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;

  &:hover{
    background-color: var(--light-blue-2);
  }
`

export const Paragraph = styled.p`
  margin-top: 1rem;
`

export const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`
export const Image = styled.img`
  height: 200px;
  margin-left: 1rem;
  border-radius: 5px;
}
`