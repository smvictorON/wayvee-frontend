import styled from "styled-components";
import "../../styles/variables.css"

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
`

export const Input = styled.input`
  padding: 0.7rem;
  border: 0;
  border-radius: 5px;

  ::placeholder {
    color: #7b7b7b
  }
`