import React from 'react'
import * as S from './styles'

interface RoundedImageProps {
  src: string;
  alt?: string;
  width?: string;
}

export const RoundedImage = ({
	src,
	alt,
	width
}: RoundedImageProps) => {
	return (
		<S.RoundedImage src={src} alt={alt} width={width} />
	)
}