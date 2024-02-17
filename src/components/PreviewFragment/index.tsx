import React, { useMemo } from 'react'
import * as S from './styles'

interface PreviewFragmentProps {
  preview: File[],
  data: any;
  folder: string;
}

const getPreviewImageSrc = (preview: File[], data: any, folder: string) => {
  if (preview.length > 0) {
    return URL.createObjectURL(preview[0]);
  } else if (data.images?.length) {
    return `${process.env.REACT_APP_API}/images/${folder}/${data.images[0]}`;
  } else {
    return null;
  }
}

export const PreviewFragment = ({
  preview,
  data,
  folder
}: PreviewFragmentProps) => {
  const previewImageSrc = useMemo(() => {
    return getPreviewImageSrc(preview, data, folder);
  }, [preview]);

  return (
    <S.PreviewContainer>
      {previewImageSrc && <S.Image src={previewImageSrc} alt={'image'} />}
    </S.PreviewContainer>
  )
}