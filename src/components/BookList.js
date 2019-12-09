import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries';
import BookDetails from './BookDetails';

class BookList extends Component {
  constructor() {
    super();
    this.state = {
      bookId: null,
    };
  }

  onSelect = e => {
    e.preventDefault();
    this.setState({
      bookId: e.target.id,
    });
  };

  displayBooks = () => {
    const { data } = this.props;
    if (data.loading) {
      return <div>Loading book ...</div>;
    }
    return data.books.map(book => {
      return (
        <li key={book.id} id={book.id} onClick={this.onSelect}>
          {book.name}
        </li>
      );
    });
  };

  render() {
    return (
      <>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.bookId} />
      </>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
