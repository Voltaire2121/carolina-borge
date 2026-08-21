import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Hero from "@/components/Hero"
import AboutMe from "@/components/AboutMe"
import Services from "@/components/Services"
import Pricing from "@/components/Pricing"
import Blog from "@/components/Blog"
import Location from "@/components/Location"
import { useSEO } from "@/hooks/useSEO"

export default function Home() {
  const { hash } = useLocation()

  useSEO({
    title: "Carolina Borge | Psicóloga Clínica en Barranquilla | Terapia Presencial y Virtual",
    description:
      "Psicóloga clínica en Barranquilla y online en Colombia. Especialista en terapia cognitivo-conductual para ansiedad, depresión y desarrollo personal. Agenda tu cita presencial o virtual hoy.",
    canonical: "https://carolinaborge.com/",
  })

  useEffect(() => {
    if (!hash) return
    const targetId = hash.slice(1)
    const targetElement = document.getElementById(targetId)
    if (!targetElement) return

    const headerHeight = document.querySelector("header")?.offsetHeight || 0
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
    window.scrollTo({ top: targetPosition, behavior: "smooth" })
  }, [hash])

  return (
    <main>
      <Hero />
      <AboutMe />
      <Services />
      <Pricing />
      <Blog />
      <Location />
    </main>
  )
}
