/**
 * Created by aleksandr on 8/30/17.
 * moonion.com
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';


import {Autosuggest, DateTextField} from '../../../common/components';

const styleSheet = createStyleSheet('Form', theme => ({
    root: {
        marginTop: 40,
        marginLeft: 80
    },

    buttons: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
}));

class Form extends Component {

    state = {
        errors: []
    };
    handleChange = name => event => {
        return this.props.updateField(name, event.target.value);
    };
    handleChangeTags = (event, {newValue}) => {
        return this.props.updateField('tags', [newValue]);
    };


    render() {
        const {classes, video} = this.props;

        return <div className={classes.root}>

            <TextField required
                       fullWidth
                       error={this.state.errors.indexOf('title') > -1}
                       label="Title"
                       value={video.title || ''}
                       onChange={this.handleChange('title')}/>

            <DateTextField fullWidth
                           error={this.state.errors.indexOf('date') > -1}
                           label="Date"
                           value={video.date || ''}
                           onChange={this.handleChange('date')}/>

            <TextField fullWidth
                       error={this.state.errors.indexOf('description') > -1}
                       label="Description"
                       value={video.description || ''}
                       onChange={this.handleChange('description')}/>

            <Autosuggest fullWidth
                         error={this.state.errors.indexOf('tags') > -1}
                         suggestions={this.props.tagOptions}
                         onSuggestionsFetchRequested={() => {
                         }}
                         onSuggestionsClearRequested={() => {
                         }}
                         inputProps={{
                             label: "Tags (max 3)",
                             value: (video.tags && video.tags.length && video.tags.map(i => this.props.tags[i]).join(', ')) || '',
                             onChange: this.handleChangeTags,
                         }}/>

            <div className={classes.buttons}>
                <Hidden smUp>
                    <Button onClick={this.props.onPrev} raised>
                        Previous
                    </Button>
                </Hidden>
                <Button onClick={this.props.onSubmit} raised
                        color={video.title && video.video_path ? 'primary' : 'default'}
                        disabled={!video.title || !video.video_path}>
                    Update the Video
                </Button>
            </div>
        </div>;
    }
}

Form.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Form);