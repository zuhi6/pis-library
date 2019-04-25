import React, { Component } from 'react';
import { Button, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import '../App.css';
import axios from 'axios';

export default class PointsPopUp extends Component {
  constructor(props){
    super(props);

    this.state = {
      points: 0
    }
  }

  handleSubmit = () => {
      return axios.post('http://localhost:5000/updateuserpoints',{points:this.state.points, user_id : this.props.user_id}).then(() => {
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
    <Modal.Title>User Points</Modal.Title>
  </Modal.Header>

  <Modal.Body>
  <FormGroup controlId='points'>
            <ControlLabel>Points</ControlLabel>
            <FormControl
              value={this.state.points}
              onChange={this.handleChange}
              type='text'
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

