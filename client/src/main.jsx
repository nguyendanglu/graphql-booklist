import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Client, Provider, cacheExchange, fetchExchange } from 'urql'

const client = new Client({
  url: import.meta.env.VITE_GRAPHQL_URI,
  exchanges: [cacheExchange, fetchExchange],
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </StrictMode>,
)
