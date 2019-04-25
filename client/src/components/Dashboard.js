import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import UserProfile from './UserProfile';
import '../App.css'

class Dashboard extends Component {

  handleClick = id => {
    if(id === 'books') this.props.history.push('/books');
    else if(id === 'cr') this.props.history.push('/changerequests');
    else if(id === 'myCr') this.props.history.push(`/mychangerequests/${UserProfile.getId()}`);
  }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        {UserProfile.getRole() === 'user' && 
        <h2 className='controlLabel'>Points: {UserProfile.getPoints()}</h2>
        }
        <div className="dashboard-buttons">
        <Button
            onClick={() => this.handleClick("books")}
            className="btn btn-secondary dashboard-btn"
          >
            Books
          </Button>
          {UserProfile.getRole() ==='admin' &&
          <Button
            onClick={() => this.handleClick("cr")}
            className="btn btn-secondary dashboard-btn"
          >
            Change Requests
          </Button>
          }
          {UserProfile.getRole() ==='user' &&
            <Button
            onClick={() => this.handleClick("myCr")}
            className="btn btn-secondary dashboard-btn"
          >
            My Change Requests
          </Button>
          }
            </div>
      </div>
    )
  }
}

export default withRouter(Dashboard);