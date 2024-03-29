import styled from "styled-components";
import "../styles/variables.css"
import InfoIcon from '@mui/icons-material/Info';
import InputMask from 'react-input-mask';

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  align-items: flex-start;
`

export const Label = styled.label`
  font-size: 0.8rem;
`

export const Input = styled.input`
  padding: 0.7rem;
  border: 0;
  border-radius: 5px;
  width: 100%;

  ::placeholder {
    color: #777
  }
`

export const Required = styled.span`
  color: red;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.2rem;
`
export const IconInfo = styled(InfoIcon)`
  color: lightgray;
  font-size: 10px;
`

export const InputFile = styled.input`
  display: none;
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

export const MaskInput = styled(InputMask)`
  padding: 0.7rem;
  border: 0;
  border-radius: 5px;
  width: 100%;

  ::placeholder {
    color: #777
  }
`

export const Select = styled.select`
  padding: 0.7rem;
  border: 0;
  border-radius: 5px;
  width: 100%;
  max-height: 200px
`