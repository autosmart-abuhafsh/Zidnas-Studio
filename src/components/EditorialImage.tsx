import React, { useState, useMemo, useEffect } from 'react';
import {
  getEditorialPlateDataUrl,
  PlateTheme,
} from '../utils/editorialPlateGenerator';
import { resolveAssetUrl } from '../utils/resolveAssetUrl';

interface EditorialImageProps {
  id: string;
  src?: string;
  alt: string;
  theme: PlateTheme;
  aspect?: 'portrait' | 'landscape' | 'square' | 'wide';
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

/**
 * Resilient Editorial Image component with Zero-Broken-Image Policy
 * and automatic GitHub Pages subfolder path resolution.
 */
export const EditorialImage: React.FC<EditorialImageProps> = ({
  id,
  src,
  alt,
  theme,
  aspect = 'portrait',
  className = '',
  imgClassName = '',
  priority = false,
}) => {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const resolvedCustomSrc = useMemo(() => resolveAssetUrl(src), [src]);

  useEffect(() => {
    setImgError(false);
  }, [resolvedCustomSrc, id]);

  const fallbackDataUrl = useMemo(
    () =>
      getEditorialPlateDataUrl({
        id,
        theme,
        title: alt,
        aspect,
      }),
    [id, theme, alt, aspect]
  );

  const activeSrc =
    resolvedCustomSrc && !imgError ? resolvedCustomSrc : fallbackDataUrl;
  const isDataUri = activeSrc.startsWith('data:');

  return (
    <div className={`relative overflow-hidden bg-[#171518] ${className}`}>
      {activeSrc ? (
        <img
          src={activeSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => {
            if (!isDataUri) setIsLoaded(true);
          }}
          onError={() => {
            setImgError(true);
            setIsLoaded(true);
          }}
          className={`w-full h-full object-cover object-center ${
            isLoaded || isDataUri ? 'opacity-100' : 'opacity-0 transition-opacity duration-300'
          } ${imgClassName}`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#171518] via-[#651B32]/40 to-[#35251F] p-6 text-center">
          <span className="font-editorial italic text-sm text-[#F7F0E5]/70">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
};
