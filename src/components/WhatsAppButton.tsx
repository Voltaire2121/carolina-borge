"use client"

import { useLocation } from "react-router-dom"
import styles from "@/styles/WhatsAppButton.module.css"
import { trackEvent, trackGoogleAdsConversion } from "@/lib/analytics"

const PAREJA_PATH = "/terapia-de-pareja-barranquilla"

export default function WhatsAppButton() {
  const { pathname } = useLocation()
  const phoneNumber = "573017255638"
  const isPareja = pathname === PAREJA_PATH

  const message = encodeURIComponent(
    isPareja
      ? "Hola Carolina, vengo de la web y quiero información sobre terapia de pareja en Barranquilla."
      : "Hola, estoy interesado en más información acerca de sus sesiones terapéuticas",
  )

  const handleClick = () => {
    trackEvent("whatsapp_click", { location: "floating_button" })
    trackGoogleAdsConversion(import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL_WHATSAPP, {
      location: "floating_button",
    })
  }

  // En /terapia-de-pareja-barranquilla, StickyMobileCTA ya ofrece WhatsApp en
  // móvil, y ambos se superponen visualmente en la misma esquina — se oculta
  // el flotante solo ahí y solo en móvil (en escritorio no hay conflicto).
  const hideOnMobile = isPareja

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.whatsappButton} ${hideOnMobile ? styles.hideOnMobile : ""}`}
      onClick={handleClick}
      aria-label="Contactar por WhatsApp"
    >
      <div className={styles.whatsappIcon}>
        <img src="/images/whatsapp-logo.png" alt="WhatsApp Logo" width={28} height={28} />
      </div>
    </a>
  )
}
