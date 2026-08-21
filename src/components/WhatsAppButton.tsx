"use client"

import styles from "@/styles/WhatsAppButton.module.css"
import { trackEvent, trackGoogleAdsConversion } from "@/lib/analytics"

export default function WhatsAppButton() {
  const phoneNumber = "573017255638"
  const message = encodeURIComponent("Hola, estoy interesado en más información acerca de sus sesiones terapéuticas")

  const handleClick = () => {
    trackEvent("whatsapp_click", { location: "floating_button" })
    trackGoogleAdsConversion(import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL_WHATSAPP, {
      location: "floating_button",
    })
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  return (
    <button className={styles.whatsappButton} onClick={handleClick} aria-label="Contactar por WhatsApp">
      <div className={styles.whatsappIcon}>
        <img src="images/whatsapp-logo.png" alt="WhatsApp Logo" width={28} height={28} />
      </div>
    </button>
  )
}
