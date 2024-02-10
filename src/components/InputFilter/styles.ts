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


export const FormControl = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 30%;

  ${media.medium({
    width: "60%"
  })}
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