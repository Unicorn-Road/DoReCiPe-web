// Google Analytics event tracking
declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      eventParams?: Record<string, any>
    ) => void;
  }
}

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

export const trackDownloadClick = (location: string) => {
  trackEvent('download_click', {
    button_location: location,
    event_category: 'engagement',
    event_label: 'App Store Download',
  });
};

export const trackFeatureView = (featureName: string) => {
  trackEvent('feature_view', {
    feature_name: featureName,
    event_category: 'engagement',
  });
};
