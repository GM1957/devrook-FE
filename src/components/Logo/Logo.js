import React from 'react';
import devrook from '../../assets/images/devrooklogo.png';
import classes from './Logo.module.css'

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={devrook} alt="devrooklogo"/>
    </div>
);

export default logo;