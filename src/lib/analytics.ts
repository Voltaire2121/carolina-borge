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

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

function normalizePhoneE164(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  if (digits.startsWith("57")) return `+${digits}`
  return `+57${digits}`
}

// Enhanced Conversions for Leads: gtag.js accepts pre-hashed values via the
// sha256_* field names (as opposed to `email`/`phone_number`, which are for
// raw values that Google hashes itself). We hash client-side so plaintext
// PII never leaves the browser. Respects Consent Mode automatically — gtag
// won't transmit user_data when ad_user_data is denied.
export async function setEnhancedConversionUserData(email: string, phone: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  const normalizedEmail = email.trim().toLowerCase()
  const normalizedPhone = normalizePhoneE164(phone)
  const [hashedEmail, hashedPhone] = await Promise.all([sha256Hex(normalizedEmail), sha256Hex(normalizedPhone)])
  window.gtag("set", "user_data", {
    sha256_email_address: hashedEmail,
    sha256_phone_number: hashedPhone,
  })
}

export function grantConsent() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  window.gtag("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  })
}
