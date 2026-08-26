const STORAGE_KEY = "attribution_data"
const WINDOW_MS = 90 * 24 * 60 * 60 * 1000 // 90 días, alineado con la ventana de conversión de Google Ads

const TRACKED_PARAMS = [
  "gclid",
  "wbraid",
  "gbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const

type AttributionData = Partial<Record<(typeof TRACKED_PARAMS)[number], string>> & { timestamp: number }

// Se llama una vez al cargar la app. Si la URL trae parámetros de campaña
// (llegada real desde un anuncio), los persiste; si no, no toca lo que ya
// haya guardado de una visita anterior dentro de la ventana de 90 días.
export function captureAttribution() {
  if (typeof window === "undefined") return

  const params = new URLSearchParams(window.location.search)
  const found: Partial<Record<(typeof TRACKED_PARAMS)[number], string>> = {}
  let hasAny = false

  for (const key of TRACKED_PARAMS) {
    const value = params.get(key)
    if (value) {
      found[key] = value
      hasAny = true
    }
  }

  if (!hasAny) return

  try {
    const data: AttributionData = { ...found, timestamp: Date.now() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage no disponible (modo privado, cuota llena, etc.) — se ignora
  }
}

export function getAttribution(): AttributionData | null {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    const data: AttributionData = JSON.parse(stored)
    if (Date.now() - data.timestamp > WINDOW_MS) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return data
  } catch {
    return null
  }
}
