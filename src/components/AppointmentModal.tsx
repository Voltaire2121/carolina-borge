"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { X, Calendar, Clock, Check, Loader2, AlertCircle, MessageCircle } from "lucide-react"
import styles from "@/styles/AppointmentModal.module.css"
import { trackEvent, trackGoogleAdsConversion, setEnhancedConversionUserData } from "@/lib/analytics"
import { getAttribution } from "@/lib/attribution"

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

const SESSION_PRICE: Record<"presencial" | "virtual" | "pareja_presencial" | "pareja_virtual", number> = {
  presencial: 150000,
  virtual: 150000,
  pareja_presencial: 180000,
  pareja_virtual: 150000,
}

function formatCOP(amount: number) {
  return `$${amount.toLocaleString("es-CO")}`
}

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  appointmentType?: "presencial" | "virtual" | "pareja" | null
}

const appointmentTypeLabels: Record<"presencial" | "virtual" | "pareja", string> = {
  presencial: "Presencial",
  virtual: "Virtual",
  pareja: "Terapia de Pareja",
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
  const [dataConsent, setDataConsent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })
  const [step, setStep] = useState(1)
  const [modality, setModality] = useState<"presencial" | "virtual">("presencial")
  const [showAllDates, setShowAllDates] = useState(false)
  const [honeypot, setHoneypot] = useState("")
  const formStartedRef = useRef(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastFocusedElementRef = useRef<HTMLElement | null>(null)
  const timeSectionRef = useRef<HTMLHeadingElement>(null)
  const formSectionRef = useRef<HTMLHeadingElement>(null)

  const serviceParam = appointmentType ?? "unspecified"
  const priceKey =
    appointmentType === "pareja" ? (`pareja_${modality}` as const) : appointmentType === "virtual" ? "virtual" : "presencial"
  const sessionPrice = appointmentType ? SESSION_PRICE[priceKey] : null

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

  // Funnel: vista del formulario al llegar al paso 2
  useEffect(() => {
    if (isOpen && step === 2) {
      trackEvent("booking_form_view", { appointment_type: serviceParam })
    }
  }, [isOpen, step, serviceParam])

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  // Bloqueo de scroll del body mientras el modal está abierto
  useEffect(() => {
    if (!isOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  // Foco: al abrir, guardar el elemento que abrió el modal y mover el foco
  // dentro del modal; al cerrar, devolver el foco a ese elemento.
  useEffect(() => {
    if (isOpen) {
      lastFocusedElementRef.current = document.activeElement as HTMLElement | null
      closeButtonRef.current?.focus()
    } else {
      lastFocusedElementRef.current?.focus()
    }
  }, [isOpen])

  // Trampa de foco: Tab/Shift+Tab no debe salir del modal
  useEffect(() => {
    if (!isOpen) return
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !modalRef.current) return
      const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", handleTab)
    return () => document.removeEventListener("keydown", handleTab)
  }, [isOpen])

  // Auto-scroll suave al avanzar de sección dentro del modal
  useEffect(() => {
    if (selectedDate) {
      timeSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [selectedDate])

  useEffect(() => {
    if (step === 2) {
      formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [step])

  const handleFormFieldFocus = () => {
    if (formStartedRef.current) return
    formStartedRef.current = true
    trackEvent("booking_form_start", { appointment_type: serviceParam })
  }

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

    if (!selectedDate || !selectedSlot || !dataConsent) return

    // Honeypot: los bots suelen rellenar todos los campos, incluido este,
    // que un usuario real nunca ve. Si tiene valor, se ignora en silencio.
    if (honeypot) return

    setIsLoading(true)
    setSubmitStatus({ type: null, message: null })

    try {
      // Formatear la fecha para el correo
      const formattedDate = formatDate(selectedDate)

      // Determinar el tipo de cita (presencial, virtual, pareja o no especificado)
      const tipoConsulta = appointmentType
        ? `Tipo de consulta: ${appointmentTypeLabels[appointmentType]}${appointmentType === "pareja" ? ` (${modality === "presencial" ? "Presencial" : "Virtual"})` : ""}`
        : "Tipo de consulta: No especificado"

      // Atribución de campaña (gclid/UTM), si el visitante llegó desde un anuncio
      // en los últimos 90 días. Se incluye en el correo porque FormSubmit.co es
      // el único backend hoy — no hay CRM que la reciba de forma estructurada.
      const attribution = getAttribution()
      const attributionLines = attribution
        ? Object.entries(attribution)
            .filter(([key]) => key !== "timestamp")
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n        ")
        : "Sin datos de campaña"

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

        Atribución de campaña:
        ${attributionLines}
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
          _subject: `Nueva Cita ${appointmentType ? appointmentTypeLabels[appointmentType] : ""}: ${name} - ${formattedDate} ${selectedSlot}`,
        }),
      })

      if (response.ok) {
        await setEnhancedConversionUserData(email, phone)
        trackEvent("generate_lead", { appointment_type: serviceParam, modality: appointmentType === "pareja" ? modality : undefined })
        trackGoogleAdsConversion(import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL_LEAD, {
          appointment_type: serviceParam,
        })

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
          setDataConsent(false)
          setStep(1)
          setModality("presencial")
          setShowAllDates(false)
          setHoneypot("")
          formStartedRef.current = false
          onClose()
        }, 3000)
      } else {
        throw new Error("Error al enviar el formulario")
      }
    } catch (error) {
      console.error("Error al reservar cita:", error)
      const errorMessage = error instanceof Error ? error.message : "unknown_error"
      trackEvent("booking_error", { appointment_type: serviceParam, error_message: errorMessage })
      setSubmitStatus({
        type: "error",
        message: "Hubo un problema al reservar la cita. Por favor intenta nuevamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  const allDates = getAvailableDates()
  const visibleDates = showAllDates ? allDates : allDates.slice(0, 7)

  const waFollowUpMessage = encodeURIComponent(
    `Hola Carolina, acabo de reservar una cita${selectedDate ? ` para el ${formatDate(selectedDate)} a las ${selectedSlot}` : ""}. Quería confirmar los detalles.`,
  )

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose} ref={closeButtonRef} aria-label="Cerrar">
          <X size={24} />
        </button>

        {submitStatus.type === "success" ? (
          <div className={styles.successMessage}>
            <Check size={48} className={styles.successIcon} />
            <h3>¡Cita Reservada con Éxito!</h3>
            <p>{submitStatus.message}</p>
            <a
              href={`https://wa.me/573017255638?text=${waFollowUpMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.successWhatsapp}
            >
              <MessageCircle size={18} />
              Confirmar por WhatsApp
            </a>
          </div>
        ) : (
          <>
            <h2 className={styles.modalTitle} id="appointment-modal-title">
              Reserva tu Cita
              {appointmentType && (
                <span className={styles.appointmentTypeTag}>{appointmentTypeLabels[appointmentType]}</span>
              )}
            </h2>
            <p className={styles.stepIndicator}>Paso {step} de 2</p>

            {submitStatus.type === "error" && (
              <div className={styles.errorMessage}>
                <AlertCircle size={20} />
                <p>{submitStatus.message}</p>
              </div>
            )}

            {step === 1 && (
              <div className={styles.dateSelection}>
                {appointmentType === "pareja" && (
                  <div className={styles.modalitySelector}>
                    <h3>Modalidad</h3>
                    <div className={styles.modalityOptions}>
                      <button
                        type="button"
                        className={`${styles.modalityButton} ${modality === "presencial" ? styles.selected : ""}`}
                        onClick={() => setModality("presencial")}
                      >
                        Presencial
                      </button>
                      <button
                        type="button"
                        className={`${styles.modalityButton} ${modality === "virtual" ? styles.selected : ""}`}
                        onClick={() => setModality("virtual")}
                      >
                        Virtual
                      </button>
                    </div>
                  </div>
                )}

                {sessionPrice && (
                  <p className={styles.priceInfo}>
                    Sesión de 50 minutos · {formatCOP(sessionPrice)}
                  </p>
                )}

                <h3>Selecciona una Fecha</h3>
                <div className={styles.calendar}>
                  {visibleDates.map((date, index) => (
                    <button
                      key={index}
                      className={`${styles.dateButton} ${selectedDate && date.toDateString() === selectedDate.toDateString() ? styles.selected : ""}`}
                      onClick={() => {
                        trackEvent("booking_date_selected", { appointment_type: serviceParam })
                        setSelectedDate(date)
                      }}
                    >
                      <span className={styles.dayName}>{date.toLocaleDateString("es-ES", { weekday: "short" })}</span>
                      <span className={styles.dayNumber}>{date.getDate()}</span>
                      <span className={styles.month}>{date.toLocaleDateString("es-ES", { month: "short" })}</span>
                    </button>
                  ))}
                </div>

                {!showAllDates && allDates.length > visibleDates.length && (
                  <button
                    type="button"
                    className={styles.showMoreDatesButton}
                    onClick={() => setShowAllDates(true)}
                  >
                    Ver más fechas
                  </button>
                )}

                {selectedDate && (
                  <>
                    <h3 ref={timeSectionRef}>Selecciona una Hora</h3>
                    <p className={styles.selectedDate}>
                      <Calendar size={16} />
                      {formatDate(selectedDate)}
                    </p>

                    <div className={styles.timeSlots}>
                      {availableSlots.map((slot, index) => (
                        <button
                          key={index}
                          className={`${styles.timeButton} ${selectedSlot === slot.time ? styles.selected : ""} ${!slot.available ? styles.unavailable : ""}`}
                          onClick={() => {
                            if (!slot.available) return
                            trackEvent("booking_time_selected", { appointment_type: serviceParam })
                            setSelectedSlot(slot.time)
                          }}
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
                <h3 ref={formSectionRef}>Completa tus Datos</h3>
                <p className={styles.appointmentDetails}>
                  <Calendar size={16} />
                  {selectedDate && formatDate(selectedDate)} a las {selectedSlot}
                  {appointmentType && (
                    <span className={styles.appointmentTypeIndicator}>{appointmentTypeLabels[appointmentType]}</span>
                  )}
                </p>
                {sessionPrice && (
                  <p className={styles.priceInfo}>Sesión de 50 minutos · {formatCOP(sessionPrice)}</p>
                )}

                {/* Campo señuelo para bots — invisible y fuera del flujo de tabulación para usuarios reales */}
                <input
                  type="text"
                  name="company"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className={styles.honeypot}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className={styles.formGroup}>
                  <label htmlFor="name">Nombre Completo</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={handleFormFieldFocus}
                    required
                    autoComplete="name"
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
                    onFocus={handleFormFieldFocus}
                    required
                    autoComplete="email"
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
                    onFocus={handleFormFieldFocus}
                    required
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+57 300 123 4567"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="notes">Motivo de la Consulta (Opcional)</label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    onFocus={handleFormFieldFocus}
                    placeholder="Describe brevemente el motivo de tu consulta"
                    rows={3}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.consentLabel}>
                    <input
                      type="checkbox"
                      checked={dataConsent}
                      onChange={(e) => setDataConsent(e.target.checked)}
                      required
                    />
                    <span>
                      Autorizo el tratamiento de mis datos personales según la{" "}
                      <Link to="/politica-de-privacidad" target="_blank" rel="noopener noreferrer">
                        Política de Privacidad
                      </Link>
                      .
                    </span>
                  </label>
                </div>

                <div className={styles.formActions}>
                  <button type="button" className={styles.backButton} onClick={() => setStep(1)}>
                    Volver
                  </button>
                  <button type="submit" className={styles.submitButton} disabled={isLoading || !dataConsent}>
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
