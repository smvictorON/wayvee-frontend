import React from 'react'
import * as S from './styles'

export interface SquareImageProps {
  src: string;
  alt?: string;
  width?: string;
	shape?: string
}

export const SquareImage = ({
	src,
	alt,
	width,
	shape
}: SquareImageProps) => {
	return (
		<S.SquareImage src={src} alt={alt} width={width} shape={shape}/>
	)
}