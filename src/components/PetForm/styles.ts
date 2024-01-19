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

export const SubmitButton = styled.input`
  border-radius: 5px;
  background-color: var(--light-blue);
  color: white;
  border: none;
  min-width: 100px;
  min-height: 2.5em;
  width: 100%;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: bold;
  transition: 0.2s;
  margin: 2rem auto;

  &:hover{
    background-color: var(--light-blue-2);
  }
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