import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getAuthorsQuery, addBookMutation } from '../queries';

class AddBook extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      genre: '',
      authorId: '',
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  displayAuthors = () => {
    const data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option>Loading data ...</option>;
    }
    return data.authors.map(author => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  };

  submitForm = e => {
    e.preventDefault();
    const { name, genre, authorId } = this.state;
    this.props.addBookMutation({
      variables: {
        name,
        genre,
        authorId,
      },
    });
  };

  render() {
    return (
      <>
        <form id="add-book" onSubmit={this.submitForm}>
          <div className="field">
            <label>Book name:</label>
            <input type="text" name="name" onChange={this.onChange} />
          </div>
          <div className="field">
            <label>Genre:</label>
            <input type="text" name="genre" onChange={this.onChange} />
          </div>
          <div className="field">
            <label>Author:</label>
            <select name="authorId" onChange={this.onChange}>
              <option>Select author</option>
              {this.displayAuthors()}
            </select>
          </div>
          <button>+</button>
        </form>
      </>
    );
  }
}
export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' }),
)(AddBook);
