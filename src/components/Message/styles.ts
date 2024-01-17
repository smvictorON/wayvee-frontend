import styled, { css } from "styled-components";
import "../../styles/variables.css"

interface FormControlProps {
  type: string;
}

export const FormControl = styled.div<FormControlProps>`
  min-width: 40%;
  padding: 0.6rem;
  border: 1px solid black;
  margin: 0.5em auto 0;
  border-radius: 5px;
  text-align: center;
  position: absolute;
  left: 30%;

  ${(props) =>
    props.type === "success" &&
    css`
      color: #155724;
      background-color: #daedda;
      border-color: #c3e6cb;
    `}

  ${(props) =>
    props.type === "error" &&
    css`
      color: #721c24;
      background-color: #f8d7da;
      border-color: #f5c6cb;
    `}
`
