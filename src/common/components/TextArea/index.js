/**
 * Created by aleksandr on 9/6/17.
 * moonion.com
 */


import React, {Component} from 'react';

import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import {withStyles, createStyleSheet} from 'material-ui/styles';

const styleSheet = createStyleSheet('TextArea', (theme) => ({
    maxCaption: {
        marginTop: 4
    }
}));

class TextArea extends Component {

    handleChange = event => {
        event.preventDefault();
        if (this.props.max && event.target.value.length > this.props.max) return false;
        this.props.onChange(event);
        return false;
    };
    render() {
        const {
            classes,
            max,
            ...props
        } = this.props;

        return (
            <div>
                <TextField
                    multiline
                    {...props}
                    onChange={this.handleChange}
                />
                <Typography type="caption" align="right"
                            className={classes.maxCaption}>{props.value.length}{max && ` / ${max}`}</Typography>
            </div>

        );
    }
}


export default withStyles(styleSheet)(TextArea);