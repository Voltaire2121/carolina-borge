"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Calendar, Clock, Check, Loader2, AlertCircle } from "lucide-react"
import styles from "@/styles/AppointmentModal.module.css"

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  appointmentType?: "presencial" | "virtual" | null
}

interface TimeSlot {
  time: string
  available: boolean
}

export default function AppointmentModal({ isOpen, onClose, appointmentType = null }: AppointmentModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })
  const [step, setStep] = useState(1)

  // Función para generar fechas disponibles (próximos 30 días)
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()

    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      // Solo incluir días de la semana (1-5 = Lunes-Viernes, 6 = Sábado)
      const dayOfWeek = date.getDay()
      if (dayOfWeek >= 1 && dayOfWeek <= 6) {
        dates.push(date)
      }
    }

    return dates
  }

  // Función para generar horarios disponibles basados en la fecha seleccionada
  const generateTimeSlots = (date: Date) => {
    const dayOfWeek = date.getDay()
    let slots: TimeSlot[] = []

    // Lunes a Viernes (4pm - 8pm)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      slots = [
        { time: "16:00", available: true },
        { time: "17:00", available: true },
        { time: "18:00", available: true },
        { time: "19:00", available: true },
      ]
    }
    // Sábado (8am - 4pm)
    else if (dayOfWeek === 6) {
      slots = [
        { time: "08:00", available: true },
        { time: "09:00", available: true },
        { time: "10:00", available: true },
        { time: "11:00", available: true },
        { time: "12:00", available: true },
        { time: "13:00", available: true },
        { time: "14:00", available: true },
        { time: "15:00", available: true },
      ]
    }

    return slots
  }

  // Actualizar slots disponibles cuando se selecciona una fecha
  useEffect(() => {
    if (selectedDate) {
      setAvailableSlots(generateTimeSlots(selectedDate))
    }
  }, [selectedDate])

  // Función para formatear la fecha en formato legible
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Función para manejar la reserva de la cita
  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDate || !selectedSlot) return

    setIsLoading(true)
    setSubmitStatus({ type: null, message: null })

    try {
      // Formatear la fecha para el correo
      const formattedDate = formatDate(selectedDate)

      // Determinar el tipo de cita (presencial, virtual o no especificado)
      const tipoConsulta = appointmentType
        ? `Tipo de consulta: ${appointmentType === "presencial" ? "Presencial" : "Virtual"}`
        : "Tipo de consulta: No especificado"

      // Preparar el mensaje con todos los detalles de la cita
      const appointmentMessage = `
        NUEVA CITA PROGRAMADA
        
        Fecha: ${formattedDate}
        Hora: ${selectedSlot}
        ${tipoConsulta}
        
        DATOS DEL PACIENTE:
        Nombre: ${name}
        Email: ${email}
        Teléfono: ${phone}
        
        Motivo de consulta:
        ${notes || "No especificado"}
      `

      // Usar FormSubmit.co para enviar el correo
      const response = await fetch("https://formsubmit.co/ajax/caroborge3@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          message: appointmentMessage,
          _subject: `Nueva Cita ${appointmentType ? (appointmentType === "presencial" ? "Presencial" : "Virtual") : ""}: ${name} - ${formattedDate} ${selectedSlot}`,
        }),
      })

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "¡Cita reservada con éxito! Carolina recibirá los detalles y se pondrá en contacto contigo pronto.",
        })

        // Resetear el formulario después de 3 segundos y cerrar el modal
        setTimeout(() => {
          setSubmitStatus({ type: null, message: null })
          setSelectedDate(null)
          setSelectedSlot(null)
          setName("")
          setEmail("")
          setPhone("")
          setNotes("")
          setStep(1)
          onClose()
        }, 3000)
      } else {
        throw new Error("Error al enviar el formulario")
      }
    } catch (error) {
      console.error("Error al reservar cita:", error)
      setSubmitStatus({
        type: "error",
        message: "Hubo un problema al reservar la cita. Por favor intenta nuevamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>

        {submitStatus.type === "success" ? (
          <div className={styles.successMessage}>
            <Check size={48} className={styles.successIcon} />
            <h3>¡Cita Reservada con Éxito!</h3>
            <p>{submitStatus.message}</p>
          </div>
        ) : (
          <>
            <h2 className={styles.modalTitle}>
              Reserva tu Cita
              {appointmentType && (
                <span className={styles.appointmentTypeTag}>
                  {appointmentType === "presencial" ? "Presencial" : "Virtual"}
                </span>
              )}
            </h2>

            {submitStatus.type === "error" && (
              <div className={styles.errorMessage}>
                <AlertCircle size={20} />
                <p>{submitStatus.message}</p>
              </div>
            )}

            {step === 1 && (
              <div className={styles.dateSelection}>
                <h3>Selecciona una Fecha</h3>
                <div className={styles.calendar}>
                  {getAvailableDates().map((date, index) => (
                    <button
                      key={index}
                      className={`${styles.dateButton} ${selectedDate && date.toDateString() === selectedDate.toDateString() ? styles.selected : ""}`}
                      onClick={() => setSelectedDate(date)}
                    >
                      <span className={styles.dayName}>{date.toLocaleDateString("es-ES", { weekday: "short" })}</span>
                      <span className={styles.dayNumber}>{date.getDate()}</span>
                      <span className={styles.month}>{date.toLocaleDateString("es-ES", { month: "short" })}</span>
                    </button>
                  ))}
                </div>

                {selectedDate && (
                  <>
                    <h3>Selecciona una Hora</h3>
                    <p className={styles.selectedDate}>
                      <Calendar size={16} />
                      {formatDate(selectedDate)}
                    </p>

                    <div className={styles.timeSlots}>
                      {availableSlots.map((slot, index) => (
                        <button
                          key={index}
                          className={`${styles.timeButton} ${selectedSlot === slot.time ? styles.selected : ""} ${!slot.available ? styles.unavailable : ""}`}
                          onClick={() => slot.available && setSelectedSlot(slot.time)}
                          disabled={!slot.available}
                        >
                          <Clock size={16} />
                          {slot.time}
                        </button>
                      ))}
                    </div>

                    <button
                      className={styles.nextButton}
                      onClick={() => selectedDate && selectedSlot && setStep(2)}
                      disabled={!selectedDate || !selectedSlot}
                    >
                      Continuar
                    </button>
                  </>
                )}
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleBookAppointment} className={styles.appointmentForm}>
                <h3>Completa tus Datos</h3>
                <p className={styles.appointmentDetails}>
                  <Calendar size={16} />
                  {selectedDate && formatDate(selectedDate)} a las {selectedSlot}
                  {appointmentType && (
                    <span className={styles.appointmentTypeIndicator}>
                      {appointmentType === "presencial" ? "Presencial" : "Virtual"}
                    </span>
                  )}
                </p>

                <div className={styles.formGroup}>
                  <label htmlFor="name">Nombre Completo</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Ingresa tu nombre completo"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="ejemplo@correo.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">Teléfono</label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+57 300 123 4567"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="notes">Motivo de la Consulta (Opcional)</label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe brevemente el motivo de tu consulta"
                    rows={3}
                  />
                </div>

                <div className={styles.formActions}>
                  <button type="button" className={styles.backButton} onClick={() => setStep(1)}>
                    Volver
                  </button>
                  <button type="submit" className={styles.submitButton} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className={styles.spinner} />
                        Reservando...
                      </>
                    ) : (
                      "Confirmar Reserva"
                    )}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  )
}
