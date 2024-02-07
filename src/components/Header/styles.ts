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

export const Navbar = styled.nav`
	display: flex;
	justify-content: space-between;
	padding: 1rem 1.5rem;
	color: var(--blue);
	height: 4rem;
`

export const NavbarLogo = styled.div`
	display: flex;
	align-items: center;
  margin-top: 0.5rem;
`

export const ImgLogo = styled.img`
	width: 190px;
	margin-right: 0.8em;

  ${media.small({
    width: "120px"
  })}
`

export const List = styled.ul`
	display: flex;
	align-items: center;
	list-style: none;
`

export const ListItem = styled.li`
  color: var(--blue);
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  // padding: 0.5em 0.8em;
  border-radius: 5px;
  margin: 0 5px;
  border: 1px solid;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: var(--blue);
    color: white;

    a {
      color: white;
    }
  }

  a {
    color:var(--blue);
    text-decoration: none;
    display: flex;
    padding: 0.5em 0.8em;
  }

  span{
    margin-right: 0.2rem;
    ${media.small({
      display: "none"
    })}
  }
`;
