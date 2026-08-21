"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Video, Heart } from "lucide-react"
import styles from "@/styles/Services.module.css"
import AppointmentModal from "./AppointmentModal"

export default function Services() {
  const [modalOpen, setModalOpen] = useState(false)
  const [appointmentType, setAppointmentType] = useState<"presencial" | "virtual" | "pareja" | null>(null)

  const openAppointmentModal = (e: React.MouseEvent<HTMLAnchorElement>, type: "presencial" | "virtual" | "pareja") => {
    e.preventDefault()
    setAppointmentType(type)
    setModalOpen(true)
  }

  return (
    <>
      <section id="services" className={styles.services}>
        <div className={styles.container}>
          <h2>Nuestros Servicios</h2>
          <p className={styles.subtitle}>Opciones flexibles para satisfacer tus necesidades</p>

          <div className={styles.serviceCards}>
            <div className={styles.card}>
              <div className={styles.iconWrapper}>
                <MapPin size={40} />
              </div>
              <h3>Sesiones Presenciales</h3>
              <p>
                Consultas cara a cara en nuestro consultorio ubicado en la ciudad de Barranquilla. Conexión personal en
                un ambiente seguro y confidencial.
              </p>
              <ul>
                <li>Atención personalizada</li>
                <li>Espacio privado y confortable</li>
                <li>Horarios flexibles</li>
              </ul>
              <a href="#" className={styles.serviceButton} onClick={(e) => openAppointmentModal(e, "presencial")}>
                Reservar Presencial
              </a>
            </div>

            <div className={styles.card}>
              <div className={styles.iconWrapper}>
                <Video size={40} />
              </div>
              <h3>Sesiones Virtuales</h3>
              <p>
                Terapia en línea conveniente desde la comodidad de tu hogar. La misma calidad de atención, sin necesidad
                de desplazarte.
              </p>
              <ul>
                <li>Plataforma de video segura</li>
                <li>Accesible desde cualquier lugar</li>
                <li>Ahorra tiempo en desplazamientos</li>
              </ul>
              <a href="#" className={styles.serviceButton} onClick={(e) => openAppointmentModal(e, "virtual")}>
                Reservar Virtual
              </a>
            </div>

            <div className={styles.card} id="terapia-pareja">
              <div className={styles.iconWrapper}>
                <Heart size={40} />
              </div>
              <h3>Terapia de Pareja</h3>
              <p>
                Espacio para trabajar la comunicación, resolver conflictos y fortalecer el vínculo. Acompañamiento
                para parejas que atraviesan crisis, infidelidad o quieren prepararse antes del matrimonio.
              </p>
              <ul>
                <li>Comunicación efectiva</li>
                <li>Manejo de conflictos</li>
                <li>Fortalecimiento del vínculo</li>
              </ul>
              <a href="#" className={styles.serviceButton} onClick={(e) => openAppointmentModal(e, "pareja")}>
                Reservar Terapia de Pareja
              </a>
            </div>
          </div>
        </div>
      </section>

      <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} appointmentType={appointmentType} />
    </>
  )
}
