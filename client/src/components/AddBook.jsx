import React, { useState } from 'react'
import { useQuery, useMutation } from 'urql'
import { GET_AUTHORS, ADD_BOOK } from '../queries/queries'

function AddBook() {
    const [name, setName] = useState('')
    const [genre, setGenre] = useState('')
    const [authorId, setAuthorId] = useState('')

    const [{ data, fetching, error }] = useQuery({
        query: GET_AUTHORS,
    })

    const [, executeAddBook] = useMutation(ADD_BOOK)

    const submitForm = (e) => {
        e.preventDefault()
        executeAddBook({
            name: name,
            genre: genre,
            authorid: authorId
        }).then(() => {
            setName('')
            setGenre('')
            setAuthorId('')
        })
    }

    const displayAuthors = () => {
        if (fetching) {
            return <option disabled>Loading authors...</option>
        } else if (error) {
            return <option disabled>Error loading authors</option>
        } else {
            return data?.authors.map((author) => {
                return (
                    <option key={author.id} value={author.id}>
                        {author.name}
                    </option>
                )
            })
        }
    }

    return (
        <form id="add-book" onSubmit={submitForm}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
            </div>
            <div className="field">
                <label>Author:</label>
                <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
                    <option value="">Select author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button> + </button>
        </form>
    )
}

export default AddBook;