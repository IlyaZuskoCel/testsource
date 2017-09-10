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


import {DateTextField, TextArea, DropDownCheckBoxes} from '../../../common/components';

const styleSheet = createStyleSheet('Form', theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            marginTop: 40,
            marginLeft: 80,
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 16,
            paddingRight: 16,
        }

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
    handleChangeTags = (tags) => {
        if (tags.length < 4)
            return this.props.updateField('tags', tags);
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

            <TextArea fullWidth
                      rowsMax="4"
                      max={500}

                      error={this.state.errors.indexOf('description') > -1}
                      label="Description"
                      value={video.description || ''}
                      onChange={this.handleChange('description')}/>

            <DropDownCheckBoxes fullWidth
                                error={this.state.errors.indexOf('tags') > -1}
                                options={this.props.tagOptions || []}
                                label="Tags (max 3)"
                                value={video.tags ? video.tags.map(v => '' + v) : []}
                                onChange={this.handleChangeTags}/>

            <div className={classes.buttons}>
                <Hidden smUp>
                    <Button onClick={this.props.onPrev} raised>
                        Previous
                    </Button>
                </Hidden>
                {!this.props.hideButton && (
                    <Button onClick={this.props.onSubmit} raised
                            color={!video.title || !video.video_path || video.time_end - video.time_start > 60000 ? 'default' : 'primary'}
                            disabled={!video.title || !video.video_path || video.time_end - video.time_start > 60000}>
                        Post the Video
                    </Button>
                )}

            </div>
        </div>;
    }
}

Form.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Form);