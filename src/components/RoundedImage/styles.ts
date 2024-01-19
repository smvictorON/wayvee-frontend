import styled, { css } from "styled-components";

interface RoundedImageProps {
    width?: string;
  }

export const RoundedImage = styled.img<RoundedImageProps>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0px 10px 0px 0px;

  ${({ width }) => width === "px75" && css`
    width: 75px;
    height: 75px;
  `}
`;
