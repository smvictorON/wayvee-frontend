import styled from "styled-components";
import "../../styles/variables.css"
import InputMask from 'react-input-mask';

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  align-items: flex-start;
`

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
`

export const MaskInput = styled(InputMask)`
  padding: 0.7rem;
  border: 0;
  border-radius: 5px;
  width: 100%;

  ::placeholder {
    color: #777
  }
`

export const StyledFileButton = styled.label`
  padding: 0.7rem;
  border: 0;
  border-radius: 5px;
  width: 100%;
  background-color: var(--blue);
  color: var(--white);
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: 0.2s;

  &:hover{
    background-color: var(--blue-2);
  }
`

export const Required = styled.span`
  color: red;
`