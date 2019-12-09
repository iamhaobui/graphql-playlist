import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookDetail } from '../queries';

class BookDetails extends Component {
  displayBookDetails = () => {
    const { book } = this.props.data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>
            <u>Genre:</u> <i>{book.genre}</i>
          </p>
          <p>
            <u>Author:</u> <i>{book.author.name}</i>
          </p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    }
    return <div>No books selected</div>;
  };

  render() {
    return (
      <>
        <div id="book-details">
          <p>Output book details here</p>
          {this.displayBookDetails()}
        </div>
      </>
    );
  }
}

export default graphql(getBookDetail, {
  options: props => {
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetails);
