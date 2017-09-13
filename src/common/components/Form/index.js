/**
 * Created by aleksandr on 7/20/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import {withStyles, createStyleSheet} from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Switch from 'material-ui/Switch';
import TextField from 'material-ui/TextField';
import {FormGroup, FormControlLabel} from 'material-ui/Form';
import Radio, {RadioGroup} from 'material-ui/Radio';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';


import {Autosuggest, Pagination, TextArea, DropDownCheckBoxes} from '../';


const styleSheet = createStyleSheet('Typography', theme => ({
    root: {
        paddingLeft: 136,
        paddingRight: 136,
        [theme.breakpoints.down('md')]: {
            paddingLeft: 16,
            paddingRight: 16,
        }
    },
}));


class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            switch: false,
            TextField: '',
            TextFieldError: 'Text',
            TextFieldMulti: '',
            DropdownValue: '',
            DropDownCheckBoxes: []
        };

    }

    render() {
        const {classes} = this.props;
        return (
            <Grid container gutter={8} className={classes.root}>
                <Grid item xs={12}>
                    <Typography type="headline">Form</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Text Input</Typography>
                    <TextField
                        label="Name"
                        value={this.state.TextField}
                        placeholder="Placeholder"
                        onChange={event => this.setState({TextField: event.target.value})}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Disabled Text Input</Typography>
                    <TextField
                        disabled
                        InputLabelProps={{disabled: true}}
                        label="Name"
                        value="Disabled Text Input"/>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Error Text Input</Typography>
                    <TextField
                        error
                        helperText="Incorrect username or password."
                        label="Name"
                        value={this.state.TextFieldError}
                        onChange={event => this.setState({TextFieldError: event.target.value})}
                    />

                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Multi-line Field (need to do new component)</Typography>
                    <TextArea
                        fullWidth
                        max={500}
                        rowsMax="4"
                        label="Name"
                        value={this.state.TextFieldMulti}
                        onChange={event => this.setState({TextFieldMulti: event.target.value})}
                    />

                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Dropdown</Typography>

                    <Autosuggest fullWidth
                                 suggestions={[{label: 'Option 1'}, {label: 'Option 2'}]}
                                 label="Dropdown with no selection"
                                 value={this.state.DropdownValue || ''}
                                 onSuggestionSelected={(event, {suggestionValue}) => {
                                     this.setState({DropdownValue: suggestionValue});
                                 }}/>


                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">DropDownCheckBoxes</Typography>

                    <DropDownCheckBoxes fullWidth
                                        options={[{label: 'Option 1', value: 1}, {label: 'Option 2', value: 2}]}
                                        value={this.state.DropDownCheckBoxes}
                                        label="Dropdown with no selection"
                                        onChange={(DropDownCheckBoxes) => this.setState({DropDownCheckBoxes})}/>
                </Grid>

                <Grid item xs={12}>
                    <Typography type="body1">Tags (need to do component)</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Checkbox</Typography>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.Checkbox}
                                onChange={() => this.setState({Checkbox: !this.state.Checkbox})}
                                value="checkedA"
                            />
                        }
                        label="Checkbox Label"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Radio button</Typography>
                    <RadioGroup
                        selectedValue={this.state.radio}
                        onChange={(event, radio) => this.setState({radio})}
                    >
                        <FormControlLabel value="male" control={<Radio/>} label="Radio label"/>
                        <FormControlLabel value="female" control={<Radio/>} label="Radio label"/>
                        <FormControlLabel value="disabled" disabled control={<Radio/>} label="Disabled"/>
                    </RadioGroup>
                </Grid>

                <Grid item xs={12}>
                    <Typography type="body1">Switch</Typography>
                    <Switch checked={this.state.switch} onChange={() => this.setState({switch: !this.state.switch})}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Buttons</Typography>
                    <Button raised color="primary">primary</Button>
                    <span style={{margin: 40}}/>
                    <Button raised>secondary</Button>
                </Grid>


                <Grid item xs={12}>
                    <Typography type="body1">Pagination</Typography>
                    <Pagination currentPage={1} perPage={10} total={30}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Pagination</Typography>
                    <Pagination currentPage={2} perPage={10} total={30}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Pagination</Typography>
                    <Pagination currentPage={3} perPage={10} total={30}/>
                </Grid>


                <Grid item xs={12}>
                    <Typography type="body1">Pagination</Typography>
                    <Pagination currentPage={1} perPage={10} total={70}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Pagination</Typography>
                    <Pagination currentPage={2} perPage={10} total={70}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Pagination</Typography>
                    <Pagination currentPage={3} perPage={10} total={70}/>
                </Grid>

                <Grid item xs={12}>
                    <Typography type="body1">Pagination</Typography>
                    <Pagination currentPage={4} perPage={10} total={70}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Pagination</Typography>
                    <Pagination currentPage={5} perPage={10} total={70}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Pagination</Typography>
                    <Pagination currentPage={6} perPage={10} total={70}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Pagination</Typography>
                    <Pagination currentPage={7} perPage={10} total={70}/>
                </Grid>

                <Grid item xs={12}>
                    <Typography type="body1">Pagination</Typography>
                    <Pagination currentPage={1} perPage={10} total={100}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Pagination</Typography>
                    <Pagination currentPage={2} perPage={10} total={100}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Pagination</Typography>
                    <Pagination currentPage={3} perPage={10} total={100}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Pagination</Typography>
                    <Pagination currentPage={4} perPage={10} total={100}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Pagination</Typography>
                    <Pagination currentPage={5} perPage={10} total={100}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Pagination</Typography>
                    <Pagination currentPage={6} perPage={10} total={100}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Pagination</Typography>
                    <Pagination currentPage={7} perPage={10} total={100}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Pagination</Typography>
                    <Pagination currentPage={8} perPage={10} total={100}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Pagination</Typography>
                    <Pagination currentPage={9} perPage={10} total={100}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography type="body1">Pagination</Typography>
                    <Pagination currentPage={10} perPage={10} total={100}/>
                </Grid>
                <span style={{margin: 40}}/>
            </Grid>
        )
    }
};

Form.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Form);