import './App.css'
import BookList from './components/BookList'
import AddBook from './components/AddBook'

function App() {
  return (
    <>
      <div className="App">
        <h1>GraphQL Bookstore</h1>
        <BookList />
        <AddBook />
      </div>
    </>
  )
}

export default App
