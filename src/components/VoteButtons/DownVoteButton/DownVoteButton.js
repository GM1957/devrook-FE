import React from 'react';

import classes from './DownVoteButton.module.css';

const DownVoteButton = (props) => (
    <div>
        <div className={classes.DownVoteButton}>

        <i className={["icon caret down", classes.icon].join(" ")} />
        </div>
    </div>
);

export default DownVoteButton;