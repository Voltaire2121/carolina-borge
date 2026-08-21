import { useEffect } from "react"
import { Link } from "react-router-dom"
import styles from "@/styles/NotFound.module.css"

export default function NotFound() {
  useEffect(() => {
    document.title = "Página no encontrada | Carolina Borge"

    let robots = document.querySelector('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement("meta")
      robots.setAttribute("name", "robots")
      document.head.appendChild(robots)
    }
    robots.setAttribute("content", "noindex")

    return () => {
      robots?.setAttribute("content", "index, follow")
    }
  }, [])

  return (
    <main className={styles.notFound}>
      <div>
        <h1>Página no encontrada</h1>
        <p>La página que buscas no existe o fue movida.</p>
        <Link to="/" className={styles.homeLink}>
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
