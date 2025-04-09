import styles from "@/styles/Location.module.css"

export default function Location() {
  return (
    <section id="location" className={styles.location}>
      <div className={styles.container}>
        <h2>Nuestra Ubicación</h2>
        <p className={styles.subtitle}>Convenientemente ubicados en Barranquilla, Colombia</p>

        <div className={styles.locationContent}>
          <div className={styles.locationInfo}>
            <div className={styles.addressCard}>
              <h3>Dirección del consultorio</h3>
              <p>Carrera 52 # 82 - 63</p>
              <p>Barranquilla, Colombia</p>

              <div className={styles.contactInfo}>
                <h4>Información de Contacto</h4>
                <p>Teléfono: +57 301 725 5638</p>
                <p>Email: pscarolinaborge@gmail.com</p>
              </div>

              <div className={styles.hours}>
                <h4>Horario de Atención</h4>
                <p>Lunes - Viernes: 4:00 PM - 8:00 PM</p>
                <p>Sábado: 8:00 AM - 4:00 PM</p>
                <p>Domingo: Cerrado</p>
              </div>
            </div>
          </div>

          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.2291923114396!2d-74.81301492394826!3d11.007661889155966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42d8f5c7f3a67%3A0x27b993f6c51c8daa!2sCra.%2052%20%2382-63%2C%20Barranquilla%2C%20Atl%C3%A1ntico!5e0!3m2!1ses!2sco!4v1712510000000!5m2!1ses!2sco"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de la Oficina"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
