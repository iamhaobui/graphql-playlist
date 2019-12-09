import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getBookDetail, deleteBook, editBook, getBooksQuery } from '../queries';

class BookDetails extends Component {
  constructor() {
    super();
    this.state = {
      isEdit: false,
      name: '',
      genre: '',
    };
  }

  onDelete = () => {
    this.props.deleteBook({
      variables: { id: this.props.bookId },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  onCancel = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };

  onEdit = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.editBook({
      variables: {
        id: this.props.bookId,
        name: this.state.name,
        genre: this.state.genre,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });

    this.setState({
      isEdit: !this.state.isEdit,
      name: '',
      genre: '',
    });
  };

  displayBookDetails = () => {
    this.props.data.refetch();
    const { book } = this.props.data;
    const { isEdit } = this.state;

    if (book) {
      return (
        <div>
          {!isEdit ? (
            <span>
              <h2>{book.name}</h2>
              <p>
                <u>Genre:</u> <i>{book.genre}</i>
              </p>
            </span>
          ) : (
            <span>
              <div className="field">
                <label>Book Name:</label>
                <input type="text" defaultValue={book.name} name="name" onChange={this.onChange} />
              </div>
              <div className="field">
                <label>Genre:</label>
                <input
                  type="text"
                  defaultValue={book.genre}
                  name="genre"
                  onChange={this.onChange}
                />
              </div>
            </span>
          )}
          <p>
            <u>Author:</u> <i>{book.author.name}</i>
          </p>

          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
          <button
            style={{ marginRight: '5px' }}
            type="button"
            className="btn btn-dark"
            onClick={!this.state.isEdit ? this.onEdit : this.onSubmit}
          >
            {!this.state.isEdit ? 'Edit' : 'Submit'}
          </button>

          <button
            type="button"
            className="btn btn-dark"
            onClick={!this.state.isEdit ? this.onDelete : this.onCancel}
          >
            {!this.state.isEdit ? 'Delete' : 'Cancel'}
          </button>
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

export default compose(
  graphql(getBookDetail, {
    options: props => {
      return {
        variables: {
          id: props.bookId,
        },
      };
    },
  }),
  graphql(editBook, { name: 'editBook' }),
  graphql(deleteBook, { name: 'deleteBook' }),
  graphql(getBooksQuery, { name: 'getBooksQuery' }),
)(BookDetails);
