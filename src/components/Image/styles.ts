import styled, { css } from "styled-components";
import { SquareImageProps } from './index'

export const SquareImage = styled.img<SquareImageProps>`
  width: 200px;
  height: 200px;
  border-radius: 5px;
  margin: 0px 10px 0px 0px;
  object-fit: cover;

  ${({ width }) => width === "px75" && css`
    width: 75px;
    height: 75px;
  `}

  ${({ shape }) => shape === "round" && css`
    border-radius: 50%;
  `}
`;
