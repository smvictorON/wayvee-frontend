import styled from "styled-components";
import "../../styles/variables.css"

export const FormControl = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 30%;
`

export const Input = styled.input`
  padding: 0.7rem;
  border: 0;
  border-radius: 5px;
  width: 100%;
  margin-right: 5px;

  ::placeholder {
    color: #777
  }
`