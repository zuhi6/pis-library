import React, { Component, Fragment } from 'react';
import ChangeRequestItem from './ChangeRequestItem';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';


export class Books extends Component {
  constructor(props) {
    super(props)

    this.state = {
      changerequests: [],
      status: false,
      id_param : this.props.match.params.id_param,
    };
  }
  componentWillMount() {
    if(!this.state.id_param){
      this.getAllChangeRequests();
    } 
    else {
      this.getMyChangeRequests();
    }
  }
  getAllChangeRequests = () => {
    return axios.get('http://localhost:5000/changerequests').then(data => {
      this.setState({
        changerequests : data.data
      })
    });
  }
  getMyChangeRequests = () => {
    return axios.post('http://localhost:5000/mychangerequests',{user_id:this.state.id_param}).then(data => {
      this.setState({
        changerequests : data.data
      })
    })
  }
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.checked
    });
  }
  render() {
    return (
      <Fragment>
        <h1 className="display-4 my-3">Change Requests</h1>
        <Link to={`/dashboard`} className="btn btn-secondary">
          Dashboard
        </Link>
        <FormGroup controlId='status' className="controlLabel w-50 p-50">
            <ControlLabel>Pending</ControlLabel>
            <FormControl
              size="sm"
              type='checkbox'
              className="checkbox-s"
              value={this.state.status}
              onChange={this.handleChange}
              
            />
          </FormGroup>
              <Fragment>
                {this.state.changerequests.length && this.state.status && this.state.changerequests.filter(changerequest => {
                  return changerequest.status === 'Pending';
                }).map(changerequest => {
                  return(
                    <ChangeRequestItem key={changerequest.id} changerequest={changerequest} />
                )
                })}
                {this.state.changerequests.length && !this.state.status && this.state.changerequests.map(changerequest => {
                  return(
                     <ChangeRequestItem key={changerequest.id} changerequest={changerequest} />
                 )})
                })
                }
              </Fragment>
      </Fragment>
    );
  }
}

export default Books;
