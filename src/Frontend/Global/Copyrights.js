/*eslint-disable*/
import React, { Component } from 'react';
import Link from '@material-ui/core/Typography';

class Copyrights extends Component {
    state = {  }
    render() { 
        return ( 
        <div style={{color:"#000"}}><br/>
           <span variant="body2" color="textSecondary" align="center">
           <Link color="inherit" href="https://material-ui.com/">{'Copyright © '}ICE {' '}
      {new Date().getUTCFullYear()}
      {'.'}</Link>
    </span>
        </div>
);
    }
}
export default Copyrights;