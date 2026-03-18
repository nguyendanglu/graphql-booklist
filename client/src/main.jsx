import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Client, Provider, cacheExchange, fetchExchange } from 'urql'
import { AuthProvider } from './context/AuthContext.jsx'

const client = new Client({
  url: import.meta.env.VITE_GRAPHQL_URI,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    const token = localStorage.getItem('token');
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Provider value={client}>
        <App />
      </Provider>
    </AuthProvider>
  </StrictMode>,
)
