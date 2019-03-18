const VIDEO_WEB_SITES_CONFIG = {
  'youtube.com': { videoTag: '.html5-main-video', captionTag: '.captions-text', containerTag: '#ytd-player' },
  'ted.com': { videoTag: 'video', captionTag: '#ted-player', containerTag: '#ted-player' }
}

const VIDEO_WEB_SITES = Object.keys(VIDEO_WEB_SITES_CONFIG)

export {
  VIDEO_WEB_SITES,
  VIDEO_WEB_SITES_CONFIG
}
