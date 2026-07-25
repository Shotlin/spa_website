import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Discover } from './pages/Discover'
import { ProfileDetail } from './pages/ProfileDetail'
import { Experiences } from './pages/Experiences'
import { Membership } from './pages/Membership'
import { Faq } from './pages/Faq'
import { Safety } from './pages/Safety'
import { About } from './pages/About'

const AdminApp = lazy(() =>
  import('./admin/AdminApp').then(({ AdminApp: StudioAdminApp }) => ({
    default: StudioAdminApp,
  })),
)

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

function App() {
  const location = useLocation()
  const isStudio = location.pathname.startsWith('/admin')

  if (isStudio) {
    return (
      <div className="min-h-screen">
        <ScrollToTop />
        <Routes>
          <Route
            path="/admin/*"
            element={
              <Suspense
                fallback={
                  <div className="flex min-h-screen items-center justify-center bg-background px-6 text-sm text-muted-foreground">
                    Opening Studio…
                  </div>
                }
              >
                <AdminApp />
              </Suspense>
            }
          />
        </Routes>
      </div>
    )
  }

  return (
    <div className="grain min-h-screen">
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/profile/:id" element={<ProfileDetail />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
