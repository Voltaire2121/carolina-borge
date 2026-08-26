import { Routes, Route } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import RouteTracker from '@/components/RouteTracker'
import ScrollToTop from '@/components/ScrollToTop'
import CookieConsentBanner from '@/components/CookieConsentBanner'
import Home from '@/pages/Home'
import CouplesTherapy from '@/pages/CouplesTherapy'
import PrivacyPolicy from '@/pages/PrivacyPolicy'
import Terms from '@/pages/Terms'
import NotFound from '@/pages/NotFound'
import './index.css'

function App() {
  return (
    <div className="app">
      <RouteTracker />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terapia-de-pareja-barranquilla" element={<CouplesTherapy />} />
        <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
        <Route path="/terminos-y-condiciones" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
      <CookieConsentBanner />
    </div>
  )
}

export default App