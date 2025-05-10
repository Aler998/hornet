import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'virtual:uno.css'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from './pages/Index.tsx'

import "./global.css"
import Trip from './pages/Trip.tsx'
import NotFound from './pages/NotFound.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/trip/:slug" element={<Trip />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>,
)
