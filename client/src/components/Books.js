import React, { Component, Fragment } from 'react';
import BookItem from './BookItem';
import axios from 'axios';
import { Link } from 'react-router-dom';


export class Books extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books : []
    };
  }
  componentWillMount() {
    this.getAllBooks();
  }
  getAllBooks = () => {
    return axios.get('http://localhost:5000/books').then(data => {
      this.setState({
        books : data.data
      })
    });
  }
  render() {
    return (
      <Fragment>
        <h1 className="display-4 my-3">Books</h1>
        <Link to={`/dashboard`} className="btn btn-secondary">
          Dashboard
        </Link>
              <Fragment>
                {this.state.books.length && this.state.books.map(book => {
                  return(
                     <BookItem key={book.name} book={book} />
                 )})
                })
                }
              </Fragment>
      </Fragment>
    );
  }
}

export default Books;
