import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import BookList from './components/BookList'
import AddBook from './components/AddBook'
import Login from './components/Login'
import { AuthContext } from './context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const { logout, isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="App">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>GraphQL Bookstore</h1>
          {isAuthenticated && <button onClick={logout}>Logout</button>}
        </header>
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/books" replace /> : <Login />
          } />
          <Route path="/books" element={
            <ProtectedRoute>
              <>
                <BookList />
                <AddBook />
              </>
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/books" : "/login"} replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

