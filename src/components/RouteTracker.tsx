import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { trackEvent } from "@/lib/analytics"
import { captureAttribution } from "@/lib/attribution"

export default function RouteTracker() {
  const { pathname } = useLocation()

  useEffect(() => {
    captureAttribution()
  }, [])

  useEffect(() => {
    trackEvent("page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname])

  return null
}
