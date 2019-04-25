import React, { Component } from 'react';
import { Button, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import '../App.css';
import axios from 'axios';

export default class ForgottenPasswordPopUp extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: ''
    }
  }
  handleSubmit = () => {
      return axios.post('http://localhost:5000/forgottenpassword',{email:this.state.email}).then(() => {
        this.props.closePopup();
      })
  }
  handleChange = (event) => {
    this.setState({
      [event.target.id] : event.target.value
    })
  }
  render() {
    return (
      <div>
        <Modal.Dialog>
  <Modal.Header>
    <Modal.Title>Forgotten Password</Modal.Title>
  </Modal.Header>

  <Modal.Body>
  <FormGroup controlId='email'>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              value={this.state.email}
              onChange={this.handleChange}
              type='email'
            />
          </FormGroup>
  </Modal.Body>

  <Modal.Footer>
    
    <Button className="btn-primary" onClick={this.handleSubmit}>Submit</Button>
  </Modal.Footer>
</Modal.Dialog>
      </div>
      
    )
  }
}

