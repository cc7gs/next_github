import NextImage, { ImageProps } from 'next/image';
import { useBasePath } from '../hooks/useBasePath';

function Image({ src, children, ...rest }: ImageProps) {
  const basePath = useBasePath();
  const finalSrc = basePath?.charAt(0) === '/' ? basePath + src : src;

  return (
    <NextImage src={finalSrc} {...rest}>
      {children}
    </NextImage>
  );
}
export default Image;
