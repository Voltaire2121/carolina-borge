import styles from "@/styles/AboutMe.module.css"

export default function AboutMe() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <h2>Acerca de Mí</h2>
        <p className={styles.subtitle}>Conoce a tu psicóloga</p>

        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <img
                src="/images/carolina-borge.jpeg"
                alt="Foto de Carolina Borge"
                width={300}
                height={300}
                className={styles.profileImage}
              />
            </div>
          </div>

          <div className={styles.textContent}>
            <h3>Carolina Borge</h3>
            <p className={styles.credentials}>Psicóloga Clínica • Experta en Terapia Cognitivo-Conductual</p>

            <div className={styles.bio}>
              <p>
                Con más de 10 años de experiencia en el campo de la psicología clínica, me dedico a proporcionar un
                espacio seguro y de apoyo para que mis pacientes puedan explorar sus pensamientos, emociones y
                comportamientos.
              </p>
              <p>
                Mi enfoque terapéutico se basa en técnicas cognitivo-conductuales, pero adapto mis métodos según las
                necesidades individuales de cada persona. Creo firmemente que cada individuo es único y merece un
                tratamiento personalizado.
              </p>
              <p>
                Me especializo en el tratamiento de ansiedad, depresión, estrés, problemas de autoestima y relaciones
                interpersonales. Mi objetivo es ayudarte a desarrollar herramientas efectivas para enfrentar los
                desafíos de la vida y alcanzar un mayor bienestar emocional.
              </p>
            </div>

            <div className={styles.education}>
              <h4>Formación Académica</h4>
              <ul>
                <li>Profesional en psicología - Universidad de la Sabana</li>
                <li>Diplomado en terapias de tercera generación - Universidad de la Sabana</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
