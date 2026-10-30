import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import 'leaflet/dist/leaflet.css'
import './styles.css'
const root = document.getElementById('root')
// The build pre-renders the page to HTML (good for Google), so hydrate it; in dev, render fresh.
root.hasChildNodes() ? hydrateRoot(root, <App />) : createRoot(root).render(<App />)
