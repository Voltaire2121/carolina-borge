import Header from '@/components/Header'
import Hero from '@/components/Hero'
import AboutMe from '@/components/AboutMe'
import Services from '@/components/Services'
import Pricing from '@/components/Pricing'
import Blog from '@/components/Blog'
import Location from '@/components/Location'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import './index.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <AboutMe />
        <Services />
        <Pricing />
        <Blog />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App