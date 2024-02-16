import React from 'react'
import * as S from './styles'

interface PreviewFragmentProps {
  preview: File[],
  data: any
}

const getPreviewImageSrc = (preview: File[], data: any) => {
  if (preview.length > 0) {
    return URL.createObjectURL(preview[0]);
  } else if (data.images?.length) {
    return `${process.env.REACT_APP_API}/images/companies/${data.images[0]}`;
  } else {
    return null;
  }
}

export const PreviewFragment = ({
  preview,
  data
}: PreviewFragmentProps) => {
  const previewImageSrc = getPreviewImageSrc(preview, data);

  return (
    <S.PreviewContainer>
      {previewImageSrc && <S.Image src={previewImageSrc} alt={data.name} />}
    </S.PreviewContainer>
  )
}
