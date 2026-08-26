import { MessageCircle, Calendar } from "lucide-react"
import styles from "@/styles/StickyMobileCTA.module.css"
import { trackEvent, trackGoogleAdsConversion } from "@/lib/analytics"

interface StickyMobileCTAProps {
  onReservar: () => void
}

export default function StickyMobileCTA({ onReservar }: StickyMobileCTAProps) {
  const handleWhatsApp = () => {
    trackEvent("whatsapp_click", { location: "sticky_mobile_cta" })
    trackGoogleAdsConversion(import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL_WHATSAPP, {
      location: "sticky_mobile_cta",
    })
    const message = encodeURIComponent(
      "Hola Carolina, vengo de la web y quiero información sobre terapia de pareja en Barranquilla.",
    )
    window.open(`https://wa.me/573017255638?text=${message}`, "_blank", "noopener,noreferrer")
  }

  return (
    <div className={styles.bar}>
      <button className={styles.reservarButton} onClick={onReservar}>
        <Calendar size={18} />
        Reservar Cita
      </button>
      <button className={styles.whatsappButton} onClick={handleWhatsApp}>
        <MessageCircle size={18} />
        WhatsApp
      </button>
    </div>
  )
}
