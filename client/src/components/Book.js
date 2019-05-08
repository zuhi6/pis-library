import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book : null,
      id_param : this.props.match.params.id_param,
      authors : null,
      rating : null
    }
    this.getBook();
    this.getAuthor();
  }
 

  
  getBook = () => {
    axios.post('http://localhost:5000/book',{book_id: this.state.id_param}).then(data => {
     
      this.setState({book:data.data.books});
      this.getRating();
    }) 
  }
  getAuthor = () => {
    axios.post('http://localhost:5000/author',{book_id: this.state.id_param}).then(data => {
      this.setState({authors:data.data.map(item => item.name).join(', ')});
    })
  }

  getRating = () => {
    if(!this.state.book.url){
      return  
    }
    axios.post('http://localhost:5000/getgoodreadrating',{url: this.state.book.url}).then(data => {
      this.setState({rating: data.data})
    })
  }
  render() {
    if(!this.state.book || !this.state.authors){
      return null;
    }
    return (
      
      
      <div>
        <h4 className="controlLabel">Book Details</h4>
        <ul className="list-group">
          <li className="list-group-item">
            Title: {this.state.book.name}
          </li>
          <li className="list-group-item">
            Year: {this.state.book.year}
          </li>
          <li className="list-group-item">
            ISBN: {this.state.book.isbn}
          </li>
          <li className="list-group-item">
            Description:
            <p> {this.state.book.description}</p>
          </li>
          <li className="list-group-item">
            Language: {this.state.book.language}
          </li>
          <li className="list-group-item">
            Pages: {this.state.book.pages}
          </li>
          <li className="list-group-item">
            Authors: {this.state.authors}
          </li>
          {this.state.rating && 
            <li className="list-group-item"> 
              Goodreads Rating: {this.state.rating}  
            </li>
          }
        </ul> 
        <Link to="/books" className="btn btn-secondary">
          Back
        </Link>
        {UserProfile.getRole() === 'user' && 
        <Link to={`/changerequest/${this.state.book.id}`} className="btn btn-secondary">
          Change Request
        </Link>
        }
      </div>
    );
  }
}
