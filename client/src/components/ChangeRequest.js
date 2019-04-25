import React, { Component } from 'react'
import axios from 'axios';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import UserProfile from './UserProfile';
import { Link } from 'react-router-dom';

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book : null,
      id_param : this.props.match.params.id_param
    }
    this.getBook();
  }
 
  handleChange = event => {
    let book = Object.assign({}, this.state.book);    //creating copy of object
    book[event.target.id]= event.target.value;                      //updating value
    this.setState({book});
  }
  handleSubmit = () => {
      axios.post('http://localhost:5000/changeRequest',{book:this.state.book, userId:UserProfile.getId()})
      .then(() => {
        this.props.history.push(`/books`);
      })
  }
  
  getBook = () => {
    console.log(this.state);
    axios.post('http://localhost:5000/book',{book_id: this.state.id_param}).then(data => {
      let book = data.data.books;
      book.additional_info = "None";
      this.setState({book:book});

    }) 
  }
  
  render() {
    if(!this.state.book){
      return null;
    }
    return (
     <div className="controlLabel">
      <h1>Change Request</h1>
      <form onSubmit={this.handleSubmit} onKeyPress={this.handleKeyPress}>
      <FormGroup controlId='name'>
          <ControlLabel>Title</ControlLabel>
          <FormControl
            autoFocus
            type='text'
            defaultValue={this.state.book.name}
            onChange={this.handleChange}
            
          />
        </FormGroup>
        <FormGroup controlId='year'>
          <ControlLabel>Year</ControlLabel>
          <FormControl
            defaultValue={this.state.book.year}
            onChange={this.handleChange}
            type='text'
          />
      </FormGroup>
      <FormGroup controlId='isbn'>
          <ControlLabel>ISBN</ControlLabel>
          <FormControl
            defaultValue={this.state.book.isbn}
            onChange={this.handleChange}
            type='text'
          />
      </FormGroup>
      <FormGroup controlId='description'>
          <ControlLabel>Description</ControlLabel>
          <FormControl
            as='textarea'
            rows='6'
            defaultValue={this.state.book.description}
            onChange={this.handleChange}
            
          />
      </FormGroup>
      <FormGroup controlId='pages'>
          <ControlLabel>Pages</ControlLabel>
          <FormControl
            defaultValue={this.state.book.pages}
            onChange={this.handleChange}
            type='text'
          />
      </FormGroup>
      <FormGroup controlId='language'>
          <ControlLabel>Language</ControlLabel>
          <FormControl
            defaultValue={this.state.book.language}
            onChange={this.handleChange}
            type='text'
          />
      </FormGroup>
      <FormGroup controlId='additional_info'>
          <ControlLabel>Additional Info</ControlLabel>
          <FormControl
            defaultValue="None"
            onChange={this.handleChange}
            type='text'
          />
      </FormGroup>

      <Button
            onClick={this.handleSubmit}
            className="btn btn-primary"
          >
         
            Submit Change
          </Button>
      <Link to={`/book/${this.state.book.id}`} className="btn btn-secondary">
          Back
        </Link>
      </form>
     </div>
    );
   
  }
}
