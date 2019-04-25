import React, { Component } from 'react'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import ForgottenPasswordPopUp from './ForgottenPasswordPopUp';
import UserProfile from './UserProfile';



class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      showLoginPopUp: false,
      errmsg:false
    };
  }
  validateForm = () => this.state.email.trim().length > 0 && this.state.password.length > 0;

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  togglePopup = () => {
    this.setState({
      showLoginPopUp: !this.state.showLoginPopUp
    })
  }

  handleKeyPress = target => {
    target.charCode === 13 && this.validateForm() && this.handleSubmit();
  }
  handleSubmit = event => {
    const {email, password} = this.state;
    axios.post('http://localhost:5000/login',{email, password})
      .then((data) => {
        UserProfile.setName(data.data[0].name);
        UserProfile.setPoints(data.data[0].points);
        UserProfile.setId(data.data[0].id);
        UserProfile.setRole(data.data[0].role);
        this.props.history.push('/dashboard');
      })
      .catch(() => {
        this.setState({
          errmsg:true
        })
      });
  }

  render() {
    return (
      <div>
      <div className='Login controlLabel'>
        <h1>Book keepers app</h1>
        <form onSubmit={this.handleSubmit} className='login_form' onKeyPress={this.handleKeyPress}>
          <FormGroup controlId='email'>
            <ControlLabel>Email</ControlLabel>
            {this.state.errmsg && 
        <p className='red m-a'>You have entered wrong email or password</p>
        }
            <FormControl
              autoFocus
              type='email'
              value={this.state.email}
              onChange={this.handleChange}
              
            />
          </FormGroup>
          <FormGroup controlId='password'>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type='password'
            />
          </FormGroup>
          
          <Button
            disabled={!this.validateForm()}
            onClick={this.handleSubmit}
            className="btn btn-primary"
            
          >
            Login
          </Button>
          <Button
            onClick={this.togglePopup}
            className="btn btn-secondary"
          >
            Forgotten password?
          </Button>
         
          
        </form>
    
      </div>
      {this.state.showLoginPopUp &&
          <ForgottenPasswordPopUp
            closePopup={this.togglePopup}
          />
          }
      
      </div>
    );
  }
}

export default withRouter(Login);