import styled from "styled-components";
import "../../styles/variables.css"

export const FormContainer = styled.form`
  max-width: 500px;
  margin: 2rem auto;
  background-color: var(--light-gray);
  border-radius: 5px;
  border: 5px solid white;
  padding: 2rem;
`

export const SubmitButton = styled.div`
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

  &:hover{
    background-color: var(--light-blue-2);
  }
`

export const SubmitInput = styled.input`
  background-color: transparent;
  color: white;
  border: none;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
`

export const Paragraph = styled.p`
  margin-top: 1em;
`

export const Link = styled.a`
  color: var(--blue);
  font-weight: bold;
`

export const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1em;
`
export const Image = styled.img`
  // width: 100px;
  height: 100px;
  margin-left: 1em;
  border-radius: 5px;
}
`