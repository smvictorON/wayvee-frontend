import React from 'react'
import * as S from './styles'

interface SquareImageProps {
  src: string;
  alt?: string;
  width?: string;
}

export const SquareImage = ({
	src,
	alt,
	width
}: SquareImageProps) => {
	return (
		<S.SquareImage src={src} alt={alt} width={width} />
	)
}