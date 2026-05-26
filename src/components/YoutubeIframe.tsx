import React, { useEffect } from 'react';
import { setupYouTubePostMessageManager } from '../utils/youtubePlayerManager';

interface YoutubeIframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  id: string; // A unique identifier to track the player across components
  videoId: string; // Just the YouTube Video ID, e.g. "IcWeRUuWMyI"
  srcParams?: string; // Optional URL parameters, e.g. "si=vpaR91KYU0Fzl3C-"
}

export const YoutubeIframe: React.FC<YoutubeIframeProps> = ({
  id,
  videoId,
  title,
  className,
  srcParams,
  ...rest
}) => {
  useEffect(() => {
    setupYouTubePostMessageManager();
  }, []);

  let src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`;
  if (srcParams) {
    src += `&${srcParams}`;
  }

  return (
    <iframe
      src={src}
      title={title}
      className={className}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      {...rest}
    />
  );
};
