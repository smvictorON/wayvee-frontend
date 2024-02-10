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
interface FormControlProps {
  type: string;
}

export const FormControl = styled.div<FormControlProps>`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid;
  margin: 0em auto;
  text-align: center;
  position: absolute;

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

  ${media.medium({
    padding: "0.1rem"
  })}
`
