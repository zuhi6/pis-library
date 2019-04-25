import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Books from './components/Books';
import Book from './components/Book';
import Dashboard from './components/Dashboard';
import ChangeRequest from './components/ChangeRequest';
import ChangeRequests from './components/ChangeRequests';
import ChangeRequestDetail from './components/ChangeRequestDetail';
import './App.css';


class App extends Component {
  render() {
    return (
      
        <Router>
          <div className="container">
            <Route exact path="/" component={Login} />
            <Route exact path="/books" component={Books} />
            <Route exact path="/book/:id_param" component={Book} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/changerequest/:id_param" component={ChangeRequest} />
            <Route exact path="/changerequests" component={ChangeRequests} />
            <Route exact path="/changerequestdetail/:id_param" component={ChangeRequestDetail} />
            {<Route exact path="/mychangerequests/:id_param" component={ChangeRequests} /> }
          </div>
        </Router>
    );
  }
}

export default App;
