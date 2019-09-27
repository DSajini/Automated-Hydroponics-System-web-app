import React from 'react';

import { withAuthorization } from '../Session';
import './home.css';
import DisplayData from '../DisplayData';
import WriteData from '../WriteData';
import Background from '../template/images/bg_1.jpg';


const HomePage = () => (
  <div>

    
    <DisplayData/>
    
        
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
