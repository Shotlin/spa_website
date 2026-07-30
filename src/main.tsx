import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { SiteDataProvider } from './lib/site-data.tsx'

function setupStudioPwa() {
  if (!window.location.pathname.startsWith('/admin')) return

  document.title = 'VIP Spa Studio'

  const manifest = document.createElement('link')
  manifest.rel = 'manifest'
  manifest.href = '/manifest.webmanifest'
  document.head.appendChild(manifest)

  const themeColor = document.createElement('meta')
  themeColor.name = 'theme-color'
  themeColor.content = '#100b0d'
  document.head.appendChild(themeColor)

  const mobileCapable = document.createElement('meta')
  mobileCapable.name = 'mobile-web-app-capable'
  mobileCapable.content = 'yes'
  document.head.appendChild(mobileCapable)

  const appleCapable = document.createElement('meta')
  appleCapable.name = 'apple-mobile-web-app-capable'
  appleCapable.content = 'yes'
  document.head.appendChild(appleCapable)

  const appleTitle = document.createElement('meta')
  appleTitle.name = 'apple-mobile-web-app-title'
  appleTitle.content = 'VIP Spa Studio'
  document.head.appendChild(appleTitle)

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      void navigator.serviceWorker.register('/studio-sw.js', { scope: '/admin/' }).catch(() => {
        // The dashboard remains fully online if the browser blocks service workers.
      })
    }, { once: true })
  }
}

setupStudioPwa()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SiteDataProvider>
        <App />
      </SiteDataProvider>
    </BrowserRouter>
  </StrictMode>,
)
