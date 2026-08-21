declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  window.gtag("event", eventName, params)
}

export function trackGoogleAdsConversion(conversionLabel: string | undefined, params: Record<string, unknown> = {}) {
  const adsId = import.meta.env.VITE_GOOGLE_ADS_ID
  if (!adsId || !conversionLabel) return
  trackEvent("conversion", { send_to: `${adsId}/${conversionLabel}`, ...params })
}
