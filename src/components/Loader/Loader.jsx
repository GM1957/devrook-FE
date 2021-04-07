import React from 'react'
import { connect } from 'react-redux'
import classes from './Loader.module.css'

function GlobalLoader(props) {
    return (
        <div
            className={[classes.loaderwrapper,  classes.vsbl].join(" ")
            }
        >
            <div className={classes.loader_bar}>
                <b></b>
                <i></i>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    Loader: state.Loader,
})

export default connect(mapStateToProps, {})(GlobalLoader)
