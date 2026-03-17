import { gql, useQuery } from 'urql'

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
      age
    }
  }
`

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
      genre
    }
  }
`

const GET_BOOK_DETAILS = gql`
  query GetBookDetails($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
            name
            genre
            id
        }
      }
    }
  }
`

const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre: String!, $authorid: ID!) {
    addBook(name: $name, genre: $genre, authorid: $authorid) {
      name
      id
    }
  }
`

export { GET_AUTHORS, GET_BOOKS, GET_BOOK_DETAILS, ADD_BOOK }
