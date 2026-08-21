import { Routes, Route } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import RouteTracker from '@/components/RouteTracker'
import Home from '@/pages/Home'
import CouplesTherapy from '@/pages/CouplesTherapy'
import './index.css'

function App() {
  return (
    <div className="app">
      <RouteTracker />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terapia-de-pareja-barranquilla" element={<CouplesTherapy />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App