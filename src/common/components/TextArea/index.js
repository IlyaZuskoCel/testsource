/**
 * Created by aleksandr on 9/6/17.
 * moonion.com
 */


import React, {Component} from 'react';

import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';


class TextArea extends Component {

    handleChange = event => {
        event.preventDefault();
        if (this.props.max && event.target.value.length > this.props.max) return false;
        this.props.onChange(event);
        return false;
    };

    render() {
        const {
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
                <Typography type="caption" align="right">{props.value.length}{max && ` / ${max}`}</Typography>
            </div>

        );
    }
}


export default TextArea;