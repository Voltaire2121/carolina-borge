import { Link } from "react-router-dom";
import styles from "@/styles/Legal.module.css";
import { useSEO } from "@/hooks/useSEO";

export default function Terms() {
  useSEO({
    title: "Términos y Condiciones | Carolina Borge - Psicóloga",
    description:
      "Términos y condiciones de uso del sitio y del servicio de agendamiento de citas de Carolina Borge, psicóloga clínica en Barranquilla.",
    canonical: "https://carolinaborge.com/terminos-y-condiciones",
  });

  return (
    <main className={styles.legal}>
      <div className="container">
        <h1>Términos y Condiciones</h1>
        <p className={styles.updated}>
          Última actualización: 26 de agosto de 2026
        </p>

        <div className={styles.content}>
          <h2>1. Sobre este sitio</h2>
          <p>
            Este sitio (<strong>carolinaborge.com</strong>) es operado por
            Carolina Borge, psicóloga clínica, y tiene como propósito informar
            sobre los servicios de psicoterapia ofrecidos y permitir la
            solicitud de citas.
          </p>

          <h2>2. Naturaleza del servicio</h2>
          <p>
            La reserva de una cita a través de este sitio es una{" "}
            <strong>solicitud</strong>, no una confirmación automática. Carolina
            Borge se pondrá en contacto por WhatsApp o correo electrónico para
            confirmar fecha, hora y modalidad. El contenido de este sitio (blog,
            descripciones de servicios) tiene fines informativos y no constituye
            un diagnóstico ni reemplaza una consulta profesional individual.
          </p>

          <h2>3. Uso del formulario de agendamiento</h2>
          <p>
            Al enviar el formulario de reserva de cita, confirmas que la
            información proporcionada (nombre, correo, teléfono) es veraz y
            autorizas el tratamiento de esos datos según nuestra{" "}
            <Link to="/politica-de-privacidad">Política de Privacidad</Link>,
            con el único fin de gestionar tu cita y contactarte al respecto.
          </p>

          <h2>4. Tarifas</h2>
          <p>
            Las tarifas de las sesiones se muestran en el sitio de forma
            informativa y pueden actualizarse sin previo aviso. La tarifa
            vigente al momento de confirmar la cita es la aplicable.
          </p>

          <h2>5. Cancelaciones y reprogramaciones</h2>
          <p>
            Si necesitas cancelar o reprogramar una cita, por favor comunícalo
            con la mayor anticipación posible por WhatsApp al +57 301 725 5638.
          </p>

          <h2>6. Emergencias</h2>
          <p>
            Este sitio y el canal de WhatsApp no están destinados a la atención
            de emergencias psicológicas o psiquiátricas. Si tú o alguien cercano
            está en riesgo, contacta a la línea de emergencias de tu ciudad o
            acude al servicio de urgencias más cercano.
          </p>

          <h2>7. Propiedad del contenido</h2>
          <p>
            Los textos, imágenes y demás contenido de este sitio pertenecen a
            Carolina Borge, salvo que se indique lo contrario, y no pueden
            reproducirse sin autorización.
          </p>

          <h2>8. Contacto</h2>
          <p>
            Para preguntas sobre estos términos, escribe a{" "}
            <a href="mailto:pscarolinaborge@gmail.com">
              pscarolinaborge@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
