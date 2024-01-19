import styled, { css } from "styled-components";

interface SquareImageProps {
    width?: string;
  }

export const SquareImage = styled.img<SquareImageProps>`
  // width: 200px;
  height: 200px;
  border-radius: 5px;
  margin: 0px 10px 0px 0px;

  ${({ width }) => width === "px75" && css`
    // width: 75px;
    height: 75px;
  `}
`;
