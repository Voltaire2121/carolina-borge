import { Link } from "react-router-dom";
import styles from "@/styles/Legal.module.css";
import { useSEO } from "@/hooks/useSEO";

export default function PrivacyPolicy() {
  useSEO({
    title: "Política de Privacidad | Carolina Borge - Psicóloga",
    description:
      "Política de tratamiento de datos personales del sitio de Carolina Borge, psicóloga clínica en Barranquilla, conforme a la Ley 1581 de 2012.",
    canonical: "https://carolinaborge.com/politica-de-privacidad",
  });

  return (
    <main className={styles.legal}>
      <div className="container">
        <h1>Política de Privacidad y Tratamiento de Datos Personales</h1>
        <p className={styles.updated}>
          Última actualización: 26 de agosto de 2026
        </p>

        <div className={styles.content}>
          <h2>1. Responsable del tratamiento</h2>
          <p>
            Carolina Borge, psicóloga clínica, con domicilio profesional en
            Carrera 52 # 82 - 63, Barranquilla, Atlántico, Colombia, es la
            responsable del tratamiento de los datos personales recolectados a
            través de este sitio web (<strong>carolinaborge.com</strong>).
            Contacto: pscarolinaborge@gmail.com · +57 301 725 5638.
          </p>

          <h2>2. Datos que recolectamos</h2>
          <p>Al usar este sitio y agendar una cita, podemos recolectar:</p>
          <ul>
            <li>
              Datos de identificación y contacto: nombre completo, correo
              electrónico, número de teléfono.
            </li>
            <li>
              Motivo de consulta que decidas compartir voluntariamente al
              agendar (campo opcional).
            </li>
            <li>
              Datos de navegación y publicidad: dirección IP, tipo de
              dispositivo, páginas visitadas, e identificadores de campañas
              publicitarias (como <em>gclid</em>) recolectados mediante Google
              Analytics y Google Ads, sujetos a tu consentimiento de cookies.
            </li>
          </ul>

          <h2>3. Finalidades del tratamiento</h2>
          <ul>
            <li>
              Gestionar la solicitud y confirmación de citas de terapia
              psicológica.
            </li>
            <li>
              Responder consultas enviadas por WhatsApp, correo electrónico o el
              formulario del sitio.
            </li>
            <li>
              Medir el desempeño del sitio y de campañas publicitarias (Google
              Analytics, Google Ads).
            </li>
            <li>
              Cumplir obligaciones legales y contractuales relacionadas con la
              prestación del servicio.
            </li>
          </ul>

          <h2>4. Cookies y publicidad</h2>
          <p>
            Este sitio usa cookies propias y de terceros (Google Analytics,
            Google Ads) para analizar el uso del sitio y medir campañas
            publicitarias. Puedes aceptar o rechazar estas cookies desde el
            banner que se muestra al ingresar al sitio; si las rechazas, no se
            almacenarán cookies de analítica ni publicidad y esos datos no se
            recolectarán.
          </p>

          <h2>5. Confidencialidad clínica</h2>
          <p>
            La información compartida durante las sesiones de terapia está
            protegida por el secreto profesional del psicólogo, conforme a la
            Ley 1090 de 2006 (Código Deontológico y Bioético del ejercicio de la
            Psicología en Colombia). Esta información no se comparte con
            terceros salvo obligación legal expresa.
          </p>

          <h2>6. Tus derechos (Ley 1581 de 2012)</h2>
          <p>
            Como titular de tus datos personales, y de acuerdo con la Ley 1581
            de 2012 y el Decreto 1074 de 2015, tienes derecho a:
          </p>
          <ul>
            <li>Conocer, actualizar y rectificar tus datos personales.</li>
            <li>Solicitar prueba de la autorización otorgada.</li>
            <li>Ser informado sobre el uso que se le ha dado a tus datos.</li>
            <li>
              Presentar quejas ante la Superintendencia de Industria y Comercio
              por infracciones a la ley.
            </li>
            <li>
              Revocar la autorización y/o solicitar la supresión de tus datos,
              cuando no exista un deber legal o contractual que lo impida.
            </li>
            <li>
              Acceder de forma gratuita a tus datos personales que hayan sido
              objeto de tratamiento.
            </li>
          </ul>

          <h2>7. Canal para ejercer tus derechos</h2>
          <p>
            Puedes ejercer cualquiera de estos derechos escribiendo a{" "}
            <a href="mailto:pscarolinaborge@gmail.com">
              pscarolinaborge@gmail.com
            </a>
            , indicando tu nombre completo y la solicitud concreta.
            Responderemos dentro de los términos establecidos por la ley.
          </p>

          <h2>8. Cambios a esta política</h2>
          <p>
            Esta política puede actualizarse periódicamente. La fecha de la
            última actualización aparece al inicio de este documento.
          </p>

          <p>
            Ver también nuestros{" "}
            <Link to="/terminos-y-condiciones">Términos y Condiciones</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
