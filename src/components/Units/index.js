import React from 'react';

import { withAuthorization } from '../Session';
import './Unit.css';
import DisplayData from '../DisplayData';
import DisplayUnits from '../DisplayUnits';
import WriteData from '../WriteData';
import Background from '../template/images/bg_1.jpg';




const UnitsPage = () => (
  <div>

    
   
    <DisplayUnits/>
    
 
    
        
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(UnitsPage);
