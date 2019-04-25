import React, { Component, Fragment } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import PointsPopUp from './PointsPopUp';
import UserProfile from './UserProfile'

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changerequest : null,
      id_param : this.props.match.params.id_param,
      book : null,
      showPointsPopUp: false
    }
    this.getChangeRequest();
  }

  togglePopup = () => {
    if(this.state.showPointsPopUp === true) {
      this.props.history.push('/changerequests');
    }
    this.setState({
      showPointsPopUp: !this.state.showPointsPopUp
    })
  }
 
  handleSubmit = approval => {
    let changerequest = Object.assign({}, this.state.changerequest);    //creating copy of object
    changerequest.status = approval;                     //updating value

    if(approval === 'Delete') {
      return axios.post('http://localhost:5000/deletechangerequest', {cr_id : changerequest.id}).then(() => {
          this.props.history.push(`/mychangerequests/${UserProfile.getId()}`);
      })
    }
    axios.post('http://localhost:5000/updatechangerequest',{changerequest_id: this.state.id_param,changerequest: changerequest}).then(() => {
        if(approval === 'Approved') {
            axios.post('http://localhost:5000/updatebook',{book_id: this.state.changerequest.book_id, changerequest:this.state.changerequest}).then(()=>{
              this.togglePopup();
            }) 
        }
        else if(approval === 'Declined') {
          this.props.history.push('/changerequests');  
        }
        
    })
  }
  
  getChangeRequest = () => {
    axios.post('http://localhost:5000/changerequestdetail',{changerequest_id: this.state.id_param}).then(data => {
        this.setState({changerequest: data.data});
        this.getOriginalBookData();
    })
     
  }

  getOriginalBookData = () => {
    axios.post('http://localhost:5000/book',{book_id: this.state.changerequest.book_id}).then(data => {
        this.setState({book:data.data.books});
    }) 
    
  }
  render() {
    if(!this.state.changerequest || !this.state.book){
      return null;
    }
    let coloringScheme = {
        title: this.state.book.name === this.state.changerequest.name,
        year: this.state.book.year === this.state.changerequest.year,
        isbn: this.state.book.isbn === this.state.changerequest.isbn,
        description: this.state.book.description === this.state.changerequest.description,
        language: this.state.book.language === this.state.changerequest.language,
        pages: this.state.book.pages === this.state.changerequest.pages
    }
    
    return (
      
      <div>
           <h4 className="controlLabel">Change Request Detail - {this.state.id_param}</h4>
           <h4 className={`${this.state.changerequest.status}`}>{this.state.changerequest.status}</h4>
      <form className='flol'>
        <h5 className="controlLabel">Original</h5>
        <div>
        <ul className="list-group">
          <li className={`list-group-item orig-${coloringScheme.title}`}>
            Title: {this.state.book.name}
          </li>
          <li className={`list-group-item orig-${coloringScheme.year}`}>
            Year: {this.state.book.year}
          </li>
          <li className={`list-group-item orig-${coloringScheme.isbn}`}>
            ISBN: {this.state.book.isbn}
          </li>
          <li className={`list-group-item orig-${coloringScheme.description}`}>
            Description:
            <p> {this.state.book.description}</p>
          </li>
          <li className={`list-group-item orig-${coloringScheme.language}`}>
            Language: {this.state.book.language}
          </li>
          <li className={`list-group-item orig-${coloringScheme.pages}`}>
            Pages: {this.state.book.pages}
          </li>
        </ul> 
        </div>
        </form>
        <form className='flor'>
            <h5 className='controlLabel'>Requested Changes</h5>
            <div>
        <ul className="list-group">
          <li className={`list-group-item req-${coloringScheme.title}`}>
            Title: {this.state.changerequest.name}
          </li>
          <li className={`list-group-item req-${coloringScheme.year}`}>
            Year: {this.state.changerequest.year}
          </li>
          <li className={`list-group-item req-${coloringScheme.isbn}`}>
            ISBN: {this.state.changerequest.isbn}
          </li>
          <li className={`list-group-item req-${coloringScheme.description}`}>
            Description:
            <p> {this.state.changerequest.description}</p>
          </li>
          <li className={`list-group-item req-${coloringScheme.language}`}>
            Language: {this.state.changerequest.language}
          </li>
          <li className={`list-group-item req-${coloringScheme.pages}`}>
            Pages: {this.state.changerequest.pages}
          </li>
        </ul>
        </div>
        </form>
        <form className='controlLabel Login w-50 m-a center'>
        <FormGroup controlId='AdditionalInfo'>
            <ControlLabel>Additional Info</ControlLabel>
            <FormControl
              readOnly={true}
              value={this.state.changerequest.additional_info}
              type='text'
            />
          </FormGroup>
        </form>
        {UserProfile.getRole() === 'admin' &&
        <Link to="/changerequests" className="btn btn-secondary">
          Back
        </Link>
        }
        {UserProfile.getRole() === 'user' && 
           <Link to={`/mychangerequests/${UserProfile.getId()}`} className="btn btn-secondary">
           Back
         </Link>
        }
        {this.state.changerequest.status === 'Pending' &&  UserProfile.getRole() === 'admin' && 
        <Fragment>
            <Button onClick={this.handleSubmit.bind(this,'Approved')} className="btn btn-success">Approve
          </Button>
          <Button onClick={this.handleSubmit.bind(this,'Declined')} className="btn btn-danger">Decline</Button>
        </Fragment>
        }
         {this.state.changerequest.status === 'Pending' &&  UserProfile.getRole() === 'user' && 
        <Fragment>
            <Button onClick={this.handleSubmit.bind(this,'Delete')} className="btn btn-warning">Delete
          </Button>
         </Fragment>
        }
        {this.state.showPointsPopUp &&
          <PointsPopUp
            user_id = {this.state.changerequest.user_id}
            closePopup={this.togglePopup}
          />
        }
      </div>
    );
  }
}
