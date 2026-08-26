"use client"

import type React from "react"
import { useState } from "react"
import styles from "@/styles/Hero.module.css"
import AppointmentModal from "./AppointmentModal"
import { trackEvent } from "@/lib/analytics"

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false)

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0
      const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset - headerHeight
      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth",
      })
    }
  }

  const openAppointmentModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    trackEvent("booking_modal_open", { origin: "hero", service: "unspecified" })
    setModalOpen(true)
  }

  return (
    <>
      <section id="home" className={styles.hero}>
        <div className={styles.backgroundImage}>
          <img
            src="/images/brain-detailed.png"
            alt="Ilustración de cerebro"
            sizes="100vw"
            className={styles.brainImage}
          />
        </div>
        <div className={styles.heroContent}>
          <h1>Tu Camino al Bienestar Mental Comienza Aquí</h1>
          <p>Servicios psicológicos profesionales adaptados a tus necesidades únicas</p>
          <div className={styles.ctaButtons}>
            <a href="#" className={styles.primaryButton} onClick={openAppointmentModal}>
              Reservar Cita
            </a>
            <a href="#about" className={styles.secondaryButton} onClick={(e) => scrollToSection(e, "about")}>
              Conocer Más
            </a>
          </div>
        </div>
      </section>

      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
