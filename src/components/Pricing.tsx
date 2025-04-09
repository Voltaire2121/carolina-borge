"use client"

import type React from "react"

import { useState } from "react"
import { Check } from "lucide-react"
import styles from "@/styles/Pricing.module.css"
import AppointmentModal from "./AppointmentModal"

export default function Pricing() {
  const [modalOpen, setModalOpen] = useState(false)

  const openWhatsApp = (e: React.MouseEvent<HTMLAnchorElement>, planType: string) => {
    e.preventDefault()
    const phoneNumber = "573017255638" // Formato internacional sin el "+"
    const message = encodeURIComponent(`Hola, estoy interesado en más información acerca del plan ${planType}.`)
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const openAppointmentModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setModalOpen(true)
  }

  return (
    <>
      <section id="pricing" className={styles.pricing}>
        <div className={styles.container}>
          <h2>Planes de Precios</h2>
          <p className={styles.subtitle}>Opciones transparentes y flexibles para tu proceso terapéutico</p>

          <div className={styles.pricingCards}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>Sesión Individual</h3>
                <div className={styles.price}>
                  <span className={styles.amount}>$110.000</span>
                </div>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li>
                    <Check size={18} /> Consulta de 50 minutos
                  </li>
                  <li>
                    <Check size={18} /> Evaluación inicial
                  </li>
                  <li>
                    <Check size={18} /> Enfoque personalizado
                  </li>
                  <li>
                    <Check size={18} /> Disponible presencial o virtual
                  </li>
                </ul>
                <a href="#" className={styles.pricingButton} onClick={openAppointmentModal}>
                  Reservar Ahora
                </a>
              </div>
            </div>

            <div className={`${styles.card} ${styles.featured}`}>
              <div className={styles.popularTag}>Más Popular</div>
              <div className={styles.cardHeader}>
                <h3>Paquete 5 sesiones</h3>
                <div className={styles.price}>
                  <span className={styles.amount}>$495.000</span>
                </div>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li>
                    <Check size={18} /> 2 meses máximo de duración
                  </li>
                  <li>
                    <Check size={18} /> Asignación de tareas
                  </li>
                  <li>
                    <Check size={18} /> Soporte por whatsapp
                  </li>
                  <li>
                    <Check size={18} /> 10% de ahorro sobre precio regular
                  </li>
                  <li>
                    <Check size={18} /> Disponible presencial o virtual
                  </li>
                </ul>
                <a href="#" className={styles.pricingButton} onClick={(e) => openWhatsApp(e, "Paquete 5 sesiones")}>
                  Contactar Ahora
                </a>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>Paquete 8 sesiones</h3>
                <div className={styles.price}>
                  <span className={styles.amount}>$700.000</span>
                </div>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li>
                    <Check size={18} /> 3 meses máximo duración
                  </li>
                  <li>
                    <Check size={18} /> Asignación de tareas
                  </li>
                  <li>
                    <Check size={18} /> Programación prioritaria
                  </li>
                  <li>
                    <Check size={18} /> Soporte por whatsapp
                  </li>
                  <li>
                    <Check size={18} /> 20% de ahorro sobre precio regular
                  </li>
                  <li>
                    <Check size={18} /> Disponible presencial o virtual
                  </li>
                </ul>
                <a href="#" className={styles.pricingButton} onClick={(e) => openWhatsApp(e, "Paquete 8 sesiones")}>
                  Contactar Ahora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
