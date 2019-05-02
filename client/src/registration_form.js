import React, { Component } from 'react';
import Popup from "reactjs-popup";
import { Redirect } from 'react-router';

// Register class
class Registration extends Component {
  // Register constructor
  constructor(props) {
    super(props);

    this.state = { 
      open: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      artist: false,
      user: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAccountSelection = this.handleAccountSelection.bind(this);
    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
  }

  // Open register popup helper function
  openModal () {
    this.setState({ open: true });
  }

  // Close register popup helper function
  closeModal () {
    this.setState({ open: false });
  }

  // Registration form helper function  
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  // Radio button change helper function
  handleRadioButtonChange(event) {
    event.persist();
    this.setState(prevState => ({
      [event.target.id]: !prevState[event.target.id]
    }));
  }

  // Artist or user selection helper function
  handleAccountSelection(event) {
    event.preventDefault();
    this.setState({
      register: true
    });
  }

  // Render register popup
  render() {
    // Redirect to artist page per radio button selection
    if (this.state.artist && this.state.register) {
      return <Redirect to="/artist"/>
    }

    // Redirect to user page per radio button selection
    if (this.state.user && this.state.register) {
      return <Redirect to="/user"/>
    }

    return (
      <div>
        <button className="main-register" onClick={this.openModal}>
          Register 
        </button>
        
        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <div id="id02" className="modal">
            <a className="close" onClick={this.closeModal}>
              &times;
            </a>

            <form onSubmit={this.handleSubmit} className="registrationForm">
              <div className="info-register">
                <label htmlFor="first-name"><b>First Name</b></label>
                <input className="first-name-register" type="text" value={this.state.value} onBlur={this.handleChange} placeholder="First Name" id="firstName" required></input>

                <label htmlFor="last-name"><b>Last Name</b></label>
                <input className="last-name-register" type="text" value={this.state.value} onBlur={this.handleChange} placeholder="Last Name" id="lastName" required></input>

                <label htmlFor="email"><b>Email</b></label>
                <input className="email-register" type="text" value={this.state.value} onBlur={this.handleChange} placeholder="Email Address" id="email" required></input>

                <label htmlFor="psw"><b>Password</b></label>
                <input className="password-register" type="password" value={this.state.value} onBlur={this.handleChange} placeholder="Create a Password" id="password" required></input>

                <label htmlFor="account"><b>Account Type</b></label><br></br>

                <input 
                  className="check-artist" 
                  type="radio" 
                  checked={this.state.artist} 
                  onChange={this.handleRadioButtonChange} 
                  value={"artist"} 
                  checked={this.state.artist} 
                  id="artist" 
                  required>
                </input> Artist<br></br>

                <input 
                  className="check-user" 
                  type="radio"
                  checked={this.state.user}
                  onChange={this.handleRadioButtonChange} 
                  value={"user"}  
                  id="user" 
                  required>
                </input> User<br></br>

                <button className="submit-register" type="submit" value="submit" onClick={this.handleAccountSelection}>Register</button>
              </div>
            </form>
          </div>
        </Popup>
      </div>
    )
  }
}

export default Registration;
