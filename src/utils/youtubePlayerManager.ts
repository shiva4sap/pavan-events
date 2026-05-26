let globalListenerAdded = false;

/**
 * Initializes a global postMessage event listener that intercepts YouTube events
 * on the page. When any YouTube iframe begins playing (playerState = 1), we
 * propagate a pause command to all other YouTube frames and HTML5 videos in the DOM.
 */
export function setupYouTubePostMessageManager() {
  if (typeof window === 'undefined') return;
  if (globalListenerAdded) return;
  globalListenerAdded = true;

  window.addEventListener('message', (event) => {
    // Determine if message is likely from YouTube
    let isYoutube = false;
    if (event.origin && event.origin.includes('youtube.com')) {
      isYoutube = true;
    }

    let data: any = null;
    try {
      if (typeof event.data === 'string') {
        const trimmed = event.data.trim();
        // Parse if JSON formatted
        if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
          data = JSON.parse(trimmed);
        }
      } else {
        data = event.data;
      }
    } catch (err) {
      // Safe to swallow
    }

    if (!data) return;

    // Check if player state indicates PLAYING (state 1)
    if (isYoutube || data.event || data.info || data.id) {
      let isPlaying = false;

      if (data.info && typeof data.info.playerState !== 'undefined') {
        if (data.info.playerState === 1) { // 1 = PLAYING
          isPlaying = true;
        }
      } else if (typeof data.playerState !== 'undefined') {
        if (data.playerState === 1) {
          isPlaying = true;
        }
      } else if (data.event === 'onStateChange' && (data.info === 1 || data.args?.[0] === 1)) {
        isPlaying = true;
      }

      if (isPlaying) {
        pauseAllOtherPlayers(event.source);
      }
    }
  });
}

/**
 * Sends a pause command to all other YouTube iframes and HTML5 video elements.
 */
export function pauseAllOtherPlayers(activeSource: MessageEventSource | null) {
  // Pause other YouTube embeds
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach((iframe) => {
    try {
      if (iframe.contentWindow && iframe.contentWindow !== activeSource && iframe.src && iframe.src.includes('youtube.com')) {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'pauseVideo',
            args: []
          }),
          '*'
        );
      }
    } catch (e) {
      // Ignored
    }
  });

  // Pause HTML5 target elements
  const videos = document.querySelectorAll('video');
  videos.forEach((video) => {
    try {
      video.pause();
    } catch (e) {}
  });
}
