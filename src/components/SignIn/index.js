import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';


import { SignUpLink } from '../SignUp';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { BrowserRouter as Router, Route,Switch,Link } from "react-router-dom";


import './SignIn.css';

const SignInPage = () => (
  <div class="bg">

    <h1>AUTOPONICS</h1>
    <div class="signinpage">


    <br></br><br></br>
    <h2>Sign In To Your Account</h2>
    <SignInForm />
    <br></br>
    <br></br>
    <br></br>
    <br></br>
   
    
    </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};



class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.UNITS);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';
    

    return (
     
      <div>
                      
      <form onSubmit={this.onSubmit}>

        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}

        <br>
        </br>
        <br></br>

        <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      
        </p>
      </form>
      
  }  

      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
