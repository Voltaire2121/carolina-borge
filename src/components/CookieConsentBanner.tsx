import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "@/styles/CookieConsentBanner.module.css";
import { grantConsent } from "@/lib/analytics";

const STORAGE_KEY = "cookie_consent";

type CookieConsentBannerProps = {
  onVisibilityChange: (visible: boolean) => void;
};

export default function CookieConsentBanner({
  onVisibilityChange,
}: CookieConsentBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setVisible(true);
        onVisibilityChange(true);
        return;
      }
      const { status } = JSON.parse(stored);
      if (status === "granted") grantConsent();
    } catch {
      setVisible(true);
      onVisibilityChange(true);
    }
  }, [onVisibilityChange]);

  const saveChoice = (status: "granted" | "denied") => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ status, timestamp: Date.now() }),
      );
    } catch {
      // localStorage no disponible, no bloquea la elección de esta sesión
    }
    if (status === "granted") grantConsent();
    setVisible(false);
    onVisibilityChange(false);
  };

  if (!visible) return null;

  return (
    <div
      className={styles.banner}
      role="dialog"
      aria-live="polite"
      aria-label="Consentimiento de cookies"
    >
      <p>
        Usamos cookies propias y de terceros (Google Analytics, Google Ads) para
        analizar el uso del sitio y medir campañas publicitarias. Puedes
        aceptarlas o rechazarlas. Más información en nuestra{" "}
        <Link to="/politica-de-privacidad">Política de Privacidad</Link>.
      </p>
      <div className={styles.actions}>
        <button className={styles.reject} onClick={() => saveChoice("denied")}>
          Rechazar
        </button>
        <button className={styles.accept} onClick={() => saveChoice("granted")}>
          Aceptar
        </button>
      </div>
    </div>
  );
}
