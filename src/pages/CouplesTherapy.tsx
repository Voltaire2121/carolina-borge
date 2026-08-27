import { useState } from "react"
import { Link } from "react-router-dom"
import { Award, GraduationCap } from "lucide-react"
import styles from "@/styles/CouplesTherapy.module.css"
import AppointmentModal from "@/components/AppointmentModal"
import StickyMobileCTA from "@/components/StickyMobileCTA"
import Location from "@/components/Location"
import { useSEO } from "@/hooks/useSEO"
import { trackEvent } from "@/lib/analytics"

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
  {
    question: "¿Cuánto cuesta una sesión de terapia de pareja?",
    answer:
      "La sesión presencial de 50 minutos tiene un valor de $180.000 COP y la sesión virtual de $150.000 COP. Los precios se muestran de forma transparente desde el primer contacto.",
  },
  {
    question: "¿Atienden a parejas del mismo sexo?",
    answer:
      "Sí. El espacio está abierto a todo tipo de parejas, sin importar su orientación sexual o identidad de género, con el mismo respeto y enfoque profesional.",
  },
  {
    question: "¿Es confidencial lo que hablamos en sesión?",
    answer:
      "Sí. Todo lo compartido en sesión está protegido por el secreto profesional del psicólogo, conforme a la normativa colombiana que rige el ejercicio de la psicología.",
  },
  {
    question: "¿Cada cuánto se debe asistir a terapia de pareja?",
    answer:
      "Lo habitual es una sesión semanal o quincenal, especialmente al inicio del proceso. La frecuencia se ajusta según el avance y las necesidades de cada pareja.",
  },
]

export default function CouplesTherapy() {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (origin: string) => {
    trackEvent("booking_modal_open", { origin, service: "pareja" })
    setModalOpen(true)
  }

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
      {
        "@type": "Person",
        "@id": "https://carolinaborge.com/#carolina-borge",
        name: "Carolina Borge",
        jobTitle: "Psicóloga Clínica",
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Universidad de la Sabana",
        },
        worksFor: { "@id": "https://carolinaborge.com/#business" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://carolinaborge.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Terapia de Pareja en Barranquilla",
            item: "https://carolinaborge.com/terapia-de-pareja-barranquilla",
          },
        ],
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
              openModal("pareja_hero")
            }}
          >
            Reservar Cita de Pareja
          </a>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.credentials}`}>
          <img
            src="/images/carolina-borge.jpeg"
            alt="Carolina Borge, psicóloga clínica"
            width={140}
            height={140}
            className={styles.credentialsPhoto}
          />
          <div>
            <h2 className={styles.credentialsName}>Carolina Borge</h2>
            <p className={styles.credentialsRole}>Psicóloga Clínica</p>
            <ul className={styles.credentialsList}>
              <li>
                <GraduationCap size={18} />
                Profesional en psicología, Universidad de la Sabana
              </li>
              <li>
                <Award size={18} />
                Más de 10 años de experiencia clínica
              </li>
              <li>
                <Award size={18} />
                Enfoque cognitivo-conductual
              </li>
            </ul>
          </div>
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
              <span className={styles.mi} style={{ fontSize: "26px", color: "#8a2be2" }} aria-hidden="true">
                loop
              </span>
              <h3>Discusiones que se repiten</h3>
              <p>Vuelven una y otra vez al mismo conflicto sin encontrar acuerdos.</p>
            </div>
            <div className={styles.triggerCard}>
              <span className={styles.mi} style={{ fontSize: "26px", color: "#8a2be2" }} aria-hidden="true">
                forum
              </span>
              <h3>Ya no se hablan de verdad</h3>
              <p>Hablan de la rutina, pero les cuesta expresar lo que sienten.</p>
            </div>
            <div className={styles.triggerCard}>
              <span className={styles.mi} style={{ fontSize: "26px", color: "#8a2be2" }} aria-hidden="true">
                healing
              </span>
              <h3>Una infidelidad o una mentira</h3>
              <p>Quieren saber si es posible reconstruir la confianza y por dónde empezar.</p>
            </div>
            <div className={styles.triggerCard}>
              <span className={styles.mi} style={{ fontSize: "26px", color: "#8a2be2" }} aria-hidden="true">
                favorite_border
              </span>
              <h3>Distancia emocional o sexual</h3>
              <p>Viven juntos, pero sienten que cada uno está llevando su vida por separado.</p>
            </div>
            <div className={styles.triggerCard}>
              <span className={styles.mi} style={{ fontSize: "26px", color: "#8a2be2" }} aria-hidden="true">
                alt_route
              </span>
              <h3>Una decisión difícil</h3>
              <p>Necesitan claridad para decidir sobre convivir, casarse, tener hijos o separarse.</p>
            </div>
            <div className={styles.triggerCard}>
              <span className={styles.mi} style={{ fontSize: "26px", color: "#8a2be2" }} aria-hidden="true">
                family_restroom
              </span>
              <h3>Cambios que los desbordan</h3>
              <p>La llegada de un hijo, una mudanza, una pérdida o el estrés del trabajo los supera.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.ctaBanner}`}>
        <div className="container">
          <h2>¿Listos para dar el siguiente paso?</h2>
          <p>Agenda una primera sesión y empieza a construir una comunicación más sana.</p>
          <a
            href="#"
            className={styles.ctaButton}
            onClick={(e) => {
              e.preventDefault()
              openModal("pareja_mid_page")
            }}
          >
            Reservar Cita de Pareja
          </a>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2>Inversión en tu relación</h2>
          <div className={styles.pricingGrid}>
            <div className={styles.priceCard}>
              <h3>Presencial</h3>
              <p className={styles.priceAmount}>$180.000</p>
              <p className={styles.priceDetail}>Sesión de 50 minutos · Consultorio en Barranquilla</p>
            </div>
            <div className={styles.priceCard}>
              <h3>Virtual</h3>
              <p className={styles.priceAmount}>$150.000</p>
              <p className={styles.priceDetail}>Sesión de 50 minutos · Videollamada desde cualquier lugar</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2>Qué esperar en la primera sesión</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>1</span>
              <h3>Conversación inicial</h3>
              <p>Cada persona comparte, con libertad, cómo ve la relación y qué le gustaría trabajar.</p>
            </div>
            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>2</span>
              <h3>Un espacio sin juicios</h3>
              <p>El objetivo es entender, no señalar culpables. Ambos son escuchados por igual.</p>
            </div>
            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>3</span>
              <h3>Plan orientativo</h3>
              <p>Al cierre, se define en conjunto un plan de trabajo ajustado a los objetivos de la pareja.</p>
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

      {/* Prueba social: pendiente — se agrega cuando lleguen los testimonios reales */}

      <Location />

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
              openModal("pareja_cta_final")
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

      <StickyMobileCTA onReservar={() => openModal("pareja_sticky_cta")} />

      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} appointmentType="pareja" />
    </main>
  )
}
