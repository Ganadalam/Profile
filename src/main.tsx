import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { PROFILE } from './constants/profile'

console.info(
  `%c🚀 Hello, Developer!%c\n\nLooking for a passionate frontend engineer?\nLet's build something awesome together.\n\n📬 ${PROFILE.email}\n🐙 ${PROFILE.github}`,
  "font-size: 24px; font-weight: bold; color: #5ea8ff;",
  "font-size: 14px; color: #a1a1aa; line-height: 1.5;"
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
