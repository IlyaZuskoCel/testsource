/**
 * Created by kirill on 7/25/17.
 * moonion.com
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import {Link, Icon, Pagination , Autosuggest} from '../../../common/components';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';



const styleSheet = createStyleSheet('ScoutFilter' , theme => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textField: {
        width: 360,
        maxWidth: 360,
        margin: [0, 44, 44, 0],

        [theme.breakpoints.down('sm')]: {
            margin: [0 , 15 , 44 , 15]
        }
    }
}));

class ScoutFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            DropdownValue: '',
        }
    }

    render() {
        const {classes} = this.props;
        return ( <div className={classes.row}>

            <Autosuggest
                suggestions={[{label: 'Option 1'}, {label: 'Option 2'}]}
                onSuggestionsFetchRequested={() => {
                }}
                onSuggestionsClearRequested={() => {
                }}
                inputProps={{
                    label: "League",
                    value: this.state.DropdownValue,
                    onChange: (event, {newValue}) => this.setState({DropdownValue: newValue}),

                }}
                className={classes.textField}/>


            <TextField
                id="name"
                label="Team"
                value={'Dima'}
                margin="normal"
                className={classes.textField}
            />


            <TextField
                id="name"
                label="Name"
                value={'Dima'}
                margin="normal"
                className={classes.textField}
            />


        </div>)
    }
}


ScoutFilter.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    width: PropTypes.string,
};

export default compose(withStyles(styleSheet), withWidth())(ScoutFilter);