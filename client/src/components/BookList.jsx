import React, { useState } from 'react'
import { useQuery } from 'urql'
import { GET_BOOKS } from '../queries/queries'
import BookDetails from './BookDetails'

function BookList() {
    const [selectedBook, setSelectedBook] = useState(null)

    const [{ data, fetching, error }] = useQuery({
        query: GET_BOOKS,
    })

    if (fetching) return <p>Loading books...</p>
    if (error) return <p>Error loading books: {error.message}</p>

    return (
        <div>
            <ul id="book-list">
                {data.books.map((book) => (
                    <li key={book.id} onClick={(e) => setSelectedBook(book.id)}>
                        {book.name} - {book.genre}
                    </li>
                ))}
            </ul>
            <BookDetails bookId={selectedBook} />
        </div>
    )
}

export default BookList
