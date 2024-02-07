import styled, { css, CSSObject } from "styled-components";
import "../../styles/variables.css"
import { Link } from 'react-router-dom'

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


export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

export const ListHeaderTitle = styled.h1`
  margin: 0;
  color: var(--blue);
  display: flex;
  align-items: center;
`

export const ListHeaderLink = styled(Link)`
  text-decoration: none;
  background-color: var(--blue);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  padding: 0.5rem 0.8rem;
  border: 2px solid var(--blue);
  border-radius: 5px;
  display: flex;
  flow-direction: row;
  align-items: center;
  justify-content: center;

  &:hover{
    background-color: transparent;
    color: var(--blue)
  }

  span{
    ${media.small({
      display: "none"
    })}
  }
`

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column
`

export const ListRow = styled.div`
  border-bottom: 1px solid var(--blue);
  padding: 0.5rem;
  margin: 0.5rem;
  display: flex;
  align-items: center;
`

export const Data = styled.div`
  display: flex;
  flex-direction: column;
  flex: 7;
`

export const DataInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  div{
    display: flex;
    align-items: center;
    padding-right: 1rem;

    span{
      padding-left: 0.2rem;
    }
  }
`

export const DataDate = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-right: 1rem;
  color: gray;

  span{
    padding-left: 0.2rem;
  }
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  width: -webkit-fill-available;
  flex: 2;
`

export const ActionsButton = styled.button`
  text-decoration: none;
  background-color: transparent;
  color: var(--red);
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  padding: 7px 12px;
  border: 1px solid var(--red);
  border-radius: 5px;
  font-size: 12px;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100px;
  margin: 0.1rem;

  &:hover{
    background-color: var(--red);
    color: white;
  }

  span{
    ${media.small({
      display: "none"
    })}
  }

  ${media.small({
    width: "auto"
  })}
`

export const ActionsLink = styled(Link)`
  text-decoration: none;
  background-color: transparent;
  color: var(--blue);
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  padding: 7px 12px;
  border: 1px solid var(--blue);
  border-radius: 5px;
  font-size: 12px;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100px;
  margin: 0.1rem;

  &:hover{
    background-color: var(--blue);
    color: white;
  }

  span{
    ${media.small({
      display: "none"
    })}
  }

  ${media.small({
    width: "auto"
  })}
`