import { useState } from "react"
import { Link } from "react-router-dom"
import styles from "@/styles/CouplesTherapy.module.css"
import AppointmentModal from "@/components/AppointmentModal"
import { useSEO } from "@/hooks/useSEO"

const faqs = [
  {
    question: "¿Cuánto dura un proceso de terapia de pareja?",
    answer:
      "Depende de cada pareja y de la complejidad de la situación, pero muchos procesos muestran avances notables entre las 8 y 12 sesiones. En la primera consulta se define un plan orientativo según los objetivos de la pareja.",
  },
  {
    question: "¿Es necesario que ambas personas asistan a todas las sesiones?",
    answer:
      "La mayoría de las sesiones se realizan con ambos miembros de la pareja presentes, aunque en algunos momentos del proceso puede ser útil una sesión individual para profundizar en aspectos particulares.",
  },
  {
    question: "¿Ofrecen sesiones virtuales de terapia de pareja?",
    answer:
      "Sí. Puedes elegir sesiones presenciales en el consultorio en Barranquilla o sesiones virtuales por videollamada, con la misma calidad de atención.",
  },
  {
    question: "¿Qué pasa si solo uno de los dos quiere venir a terapia?",
    answer:
      "Es un buen punto de partida. Podemos comenzar con un proceso individual enfocado en la relación mientras la otra persona decide si desea sumarse más adelante.",
  },
]

export default function CouplesTherapy() {
  const [modalOpen, setModalOpen] = useState(false)

  useSEO({
    title: "Terapia de Pareja en Barranquilla | Carolina Borge - Psicóloga",
    description:
      "Terapia de pareja en Barranquilla con enfoque cognitivo-conductual. Mejora la comunicación, resuelve conflictos y fortalece tu relación. Sesiones presenciales y virtuales.",
    canonical: "https://carolinaborge.com/terapia-de-pareja-barranquilla",
  })

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Terapia de Pareja en Barranquilla",
        serviceType: "Terapia de pareja",
        areaServed: "Barranquilla, Colombia",
        provider: { "@id": "https://carolinaborge.com/#business" },
        url: "https://carolinaborge.com/terapia-de-pareja-barranquilla",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  }

  return (
    <main>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <section className={styles.hero}>
        <div className="container">
          <h1>Terapia de Pareja en Barranquilla</h1>
          <p className={styles.heroSubtitle}>
            Un espacio confidencial para trabajar la comunicación, resolver conflictos y fortalecer el vínculo,
            acompañados por una psicóloga clínica con enfoque cognitivo-conductual.
          </p>
          <a
            href="#"
            className={styles.ctaButton}
            onClick={(e) => {
              e.preventDefault()
              setModalOpen(true)
            }}
          >
            Reservar Cita de Pareja
          </a>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2>¿Qué es la terapia de pareja?</h2>
          <div className={styles.intro}>
            <p>
              La terapia de pareja es un proceso terapéutico en el que ambas personas trabajan junto a un psicólogo
              para identificar patrones de comunicación que generan malestar, entender las necesidades del otro y
              construir acuerdos concretos para mejorar la relación.
            </p>
            <p>
              No es solo para relaciones en crisis: también es útil para parejas que quieren prevenir conflictos,
              prepararse antes del matrimonio o simplemente fortalecer su vínculo.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2>¿Cuándo buscar terapia de pareja?</h2>
          <div className={styles.triggerGrid}>
            <div className={styles.triggerCard}>
              <h3>Comunicación difícil</h3>
              <p>Discusiones que se repiten sin llegar a acuerdos, o silencios que se prolongan.</p>
            </div>
            <div className={styles.triggerCard}>
              <h3>Infidelidad o pérdida de confianza</h3>
              <p>Procesos de reconstrucción del vínculo tras una ruptura de confianza.</p>
            </div>
            <div className={styles.triggerCard}>
              <h3>Decisiones de convivencia</h3>
              <p>Mudanza, finanzas compartidas, crianza u otros acuerdos importantes.</p>
            </div>
            <div className={styles.triggerCard}>
              <h3>Antes del matrimonio</h3>
              <p>Terapia preventiva para empezar una nueva etapa con herramientas claras.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2>Nuestro enfoque</h2>
          <div className={styles.intro}>
            <p>
              Con más de 10 años de experiencia en psicología clínica, Carolina Borge acompaña a las parejas con un
              enfoque cognitivo-conductual adaptado a las necesidades de cada relación, en un espacio seguro,
              confidencial y sin juicios.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2>Preguntas frecuentes</h2>
          <div className={styles.faq}>
            {faqs.map((faq) => (
              <div key={faq.question} className={styles.faqItem}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.ctaBanner}`}>
        <div className="container">
          <h2>Da el primer paso hacia una relación más sana</h2>
          <p>Sesiones presenciales en Barranquilla o virtuales, según lo que mejor se ajuste a ustedes.</p>
          <a
            href="#"
            className={styles.ctaButton}
            onClick={(e) => {
              e.preventDefault()
              setModalOpen(true)
            }}
          >
            Reservar Cita de Pareja
          </a>
        </div>
      </section>

      <div className={`container ${styles.internalLinks}`}>
        <Link to="/">Volver al inicio</Link>
        <Link to="/#services">Ver todos los servicios</Link>
      </div>

      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} appointmentType="pareja" />
    </main>
  )
}
