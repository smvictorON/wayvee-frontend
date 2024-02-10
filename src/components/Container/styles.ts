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

export const Container = styled.main`
  min-height: 90vh;
  padding: 3rem 6rem;
  margin: 0 auto;
  background-color: var(--light-gray);
  overflow: scroll;
  scroll-behavior: smooth;

  ${media.medium({
    padding: "1rem"
  })}
`
