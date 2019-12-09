import { gql } from 'apollo-boost';

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const getBookDetail = gql`
  query($id: ID) {
    book(id: $id) {
      name
      genre
      author {
        name
        age
        books {
          name
        }
      }
    }
  }
`;

const editBook = gql`
  mutation($id: ID, $name: String!, $genre: String!) {
    editBook(id: $id, name: $name, genre: $genre) {
      name
      genre
      author {
        name
        age
        books {
          name
        }
      }
    }
  }
`;

const deleteBook = gql`
  mutation($id: ID) {
    deleteBook(id: $id) {
      name
      genre
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookDetail, editBook, deleteBook };
