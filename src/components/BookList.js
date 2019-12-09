import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries';

class BookList extends Component {
  displayBooks() {
    const data = this.props.data;
    if (data.loading) {
      return <div>Loading data ...</div>;
    }
    return data.books.map(book => {
      return <li key={book.id}>{book.name}</li>;
    });
  }

  render() {
    return (
      <>
        <ul id="book-list">
          <li>{this.displayBooks()}</li>
        </ul>
      </>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
