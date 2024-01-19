import styled from "styled-components";
import "../../styles/variables.css"

export const LoginContainer = styled.section`
  max-width: 500px;
  margin: 2rem auto;
  background-color: var(--light-gray);
  border-radius: 5px;
  border: 5px solid white;
  padding: 2rem;
`

export const LoginTitle = styled.h1`
  color: var(--blue);
  margin-bottom: 1em;
  font-size: 2.1em;
  `

export const LoginSubmit = styled.input`
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

  &:hover {
    background-color: var(--light-blue-2);
  }
`