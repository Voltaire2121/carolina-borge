"use client"

import type React from "react"

import { useState } from "react"
import styles from "@/styles/Header.module.css"
import AppointmentModal from "./AppointmentModal"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()

    // Cerrar el menú móvil si está abierto
    if (menuOpen) {
      setMenuOpen(false)
    }

    // Encontrar el elemento de destino
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Calcular la posición considerando el header fijo
      const headerHeight = document.querySelector("header")?.offsetHeight || 0
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

      // Hacer scroll suave hacia la sección
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  }

  const openAppointmentModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setModalOpen(true)
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img
            src='/images/logo.png'
            alt="Logo de Carolina Borge"
            width={60}
            height={60}
            className={styles.logoImage}
          />
          <h1>Carolina Borge</h1>
        </div>

        <div className={styles.mobileMenuButton} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`${styles.nav} ${menuOpen ? styles.active : ""}`}>
          <ul>
            <li>
              <a href="#home" onClick={(e) => handleNavClick(e, "home")}>
                Inicio
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleNavClick(e, "about")}>
                Acerca de Mí
              </a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleNavClick(e, "services")}>
                Servicios
              </a>
            </li>
            <li>
              <a href="#pricing" onClick={(e) => handleNavClick(e, "pricing")}>
                Precios
              </a>
            </li>
            <li>
              <a href="#blog" onClick={(e) => handleNavClick(e, "blog")}>
                Blog
              </a>
            </li>
            <li>
              <a href="#location" onClick={(e) => handleNavClick(e, "location")}>
                Ubicación
              </a>
            </li>
            <li>
              <a href="#" className={styles.ctaButton} onClick={openAppointmentModal}>
                Reservar Cita
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
