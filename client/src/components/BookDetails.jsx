import React from 'react'
import { useQuery } from 'urql'
import { GET_BOOK_DETAILS } from '../queries/queries'

function BookDetails({ bookId }) {
    const [{ data, fetching, error }] = useQuery({
        query: GET_BOOK_DETAILS,
        variables: { id: bookId },
        pause: !bookId
    })

    if (!bookId) {
        return <div id="book-details">No book selected...</div>
    }

    if (fetching) return <div id="book-details"><p>Loading book details...</p></div>
    if (error) return <div id="book-details"><p>Error loading book details: {error.message}</p></div>

    if (!data || !data.book) return <div id="book-details">No book found</div>

    return (
        <div id="book-details">
            <h2>{data.book.name}</h2>
            <p>{data.book.genre}</p>
            <p>{data.book.author.name}</p>
            <p>{data.book.author.age}</p>
            <h3>All books by this author:</h3>
            <ul className="other-books">
                {data.book.author.books.map((item) => {
                    return <li key={item.id}>{item.name} - {item.genre}</li>
                })}
            </ul>
        </div>
    )
}

export default BookDetails