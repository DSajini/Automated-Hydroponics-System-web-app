import React from 'react';

import { AuthUserContext } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization } from '../Session';







const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h4>Account: {authUser.email}</h4>
       
      

        
               
        <h3></h3>
        <PasswordForgetForm />
        <PasswordChangeForm />
       
        
        
        
      </div>
    )}
  </AuthUserContext.Consumer>
);

const authCondition = authUser => !!authUser;




export default withAuthorization(authCondition)(AccountPage);
