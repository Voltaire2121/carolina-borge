"use client"

import type React from "react"

import { Mail, Phone, MapPin, Instagram } from "lucide-react"
import styles from "@/styles/Footer.module.css"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()

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

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <img
              src="images/logo.png"
              alt="Logo de Carolina Borge"
              width={80}
              height={80}
              className={styles.logoImage}
            />
            <h3>Carolina Borge</h3>
            <p>Servicios Psicológicos Profesionales</p>
          </div>

          <div className={styles.footerLinks}>
            <h4>Enlaces Rápidos</h4>
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
            </ul>
          </div>

          <div className={styles.footerContact}>
            <h4>Contáctanos</h4>
            <ul>
              <li>
                <MapPin size={16} />
                <span>Carrera 52 # 82 - 63, Barranquilla</span>
              </li>
              <li>
                <Phone size={16} />
                <span>+57 301 725 5638</span>
              </li>
              <li className={styles.emailItem}>
                <Mail size={16} className={styles.emailIcon} />
                <span>pscarolinaborge@gmail.com</span>
              </li>
            </ul>
          </div>

          <div className={styles.footerSocial}>
            <h4>Síguenos</h4>
            <div className={styles.socialIcons}>
              <a
                href="https://www.instagram.com/psicologacarolinaborge/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Carolina Borge"
              >
                <Instagram size={24} />
              </a>
              <a href="mailto:pscarolinaborge@gmail.com" aria-label="Email">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} Carolina Borge. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
