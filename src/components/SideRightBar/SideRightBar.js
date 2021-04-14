import React from 'react';
import Aux from '../../hoc/Aux';
import SideRightBarItems from './SideRightBarItems/SideRightBarItems'

import classes from './SideRightBar.module.css';

const SideRightBar = (props) => {
    return (
        <Aux>
            <div className={classes.SideRightBar}>
                <SideRightBarItems/>
            </div>
        </Aux>
    );
};

export default SideRightBar;