import styled, { css, CSSObject } from "styled-components";
import "../../styles/variables.css"

const breakpoints = {
  small: "576px",
  medium: "768px",
  large: "992px",
  extraLarge: "1200px",
} as const;

type Breakpoints = keyof typeof breakpoints;

const media = (Object.keys(breakpoints) as Breakpoints[]).reduce(
  (acc, label) => {
    acc[label] = (styles: CSSObject) => css`
      @media (max-width: ${breakpoints[label]}) {
        ${css(styles)}
      }
    `;

    return acc;
  },
  {} as Record<Breakpoints, (styles: CSSObject) => ReturnType<typeof css>>
);

export const LoginContainer = styled.section`
  max-width: 500px;
  margin: 2rem auto;
  background-color: var(--light-gray);
  border-radius: 5px;
  border: 5px solid white;
  padding: 2rem;
`

export const LoginHeader = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`

export const LoginHeaderTitle = styled.h1`
  margin: 0;
  color: var(--blue);
  display: flex;
  align-items: center;
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