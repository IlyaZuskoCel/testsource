/**
 * Created by aleksandr on 8/23/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';

import {DateTextField, HeightTextField, Autosuggest, Link, Icon} from '../../../common/components';

import defaultPhoto from './assets/images/default-photo.png';

import {GENDER_LIST, POS_LIST, SHOT_LIST} from '../../constants';

const genderOptions = Object.keys(GENDER_LIST).map(value => ({
    label: GENDER_LIST[value],
    value
}));

const positionOptions = Object.keys(POS_LIST).map(value => ({
    label: POS_LIST[value],
    value
}));

const shotOptions = Object.keys(SHOT_LIST).map(value => ({
    label: SHOT_LIST[value],
    value
}));

const styleSheet = createStyleSheet('PlayerForm', theme => ({
    root: {
        width: '100%',
        maxWidth: 1168,
        margin: 'auto',
        marginTop: 56,
        [theme.breakpoints.down('lg')]: {
            paddingLeft: 16,
            paddingRight: 16,
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: 48,
            width: 'auto',
        },
    },
    content: {
        paddingTop: 32,
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },

    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'row',
        },
    },
    pictureWrap: {
        width: 270,
        height: 280,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',

        [theme.breakpoints.down('sm')]: {
            height: 72,
            width: 72,
        },
    },
    pictureDefaultWrap: {
        justifyContent: 'center',
    },
    picture: {
        maxWidth: 270,
        maxHeight: 270,
        [theme.breakpoints.down('sm')]: {
            height: 72,
            width: 72,
        },
    },
    pictureDefault: {
        width: 176,
        [theme.breakpoints.down('sm')]: {
            width: 72,
        },
    },
    pictureLinks: {
        display: 'flex',
        flexDirection: 'column',
    },
    link: {
        color: '#eb3941',
        cursor: 'pointer',
        textDecoration: 'underline',
        marginTop: 24,
        [theme.breakpoints.down('sm')]: {
            marginTop: 8,
            marginLeft: 24,
        },
    },
    uploadWrap: {
        position: 'relative'
    },
    uploadInput: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0,
        cursor: 'pointer',
    },
    formWrap: {
        marginLeft: 88,
        paddingBottom: 96,
        [theme.breakpoints.down('md')]: {
            marginLeft: 40,
            marginRight: 40,
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            marginRight: 0,
            marginTop: 40,
            paddingBottom: 40,
        },
        width: '100%',
        maxWidth: 688
    },
    headerNavigation: {
        height: 48,
        zIndex: 500,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: 60,
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(287deg, #f55e58, #c9011b)'
    },
    backLink: {
        ...theme.typography.bottom,
        color: '#fff',
        textTransform: 'uppercase',
        width: 72
    },
    headerNavigationTitle: {
        color: '#fff',
    },
    subTitle: {marginTop: 80, marginBottom: 40},
    buttons: {
        marginTop: 56
    },
    buttonCancel: {
        marginRight: 24,
        marginBottom: 24
    },
    rememberTitle: {
        paddingBottom: 24
    }
}));


const getUserState = user => ({
    first_name: user.first_name,
    last_name: user.last_name,
    birthday: user.birthday,
    gender: user.gender,
    nationality: user.nationality,
    position: user.position,
    shot: user.shot,
    player_num: user.player_num,
    height: user.height,
    weight: user.weight,
    id_league: user.id_league,
    id_team_current: user.id_team_current,
    biography: user.biography,
});

class PlayerForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...getUserState(props.user),
            errors: []
        };
    }

    componentDidMount() {
        this.props.fetchData();
    }

    componentWillReceiveProps(nextProps) {
        this.setState(getUserState(nextProps.user))
    }

    handleChange = name => event => {
        return this.setState({[name]: event.target.value})
    };

    onUploadPicture = event => {
        event.preventDefault();
        if (!event.target.files.length) return;

        this.props.uploadPicture(event.target.files[0]);

    };
    onDeletePicture = event => {
        event.preventDefault();
        this.props.uploadPicture(null);
    };

    cancel = event => {
        event.preventDefault();
        this.props.cancel();
        return false;
    };
    submit = event => {
        event.preventDefault();
        this.props.save(this.state);
        return false;
    };

    render() {
        const {classes, user} = this.props;

        return <div className={classes.root}>
            <Hidden smUp>
                <div className={classes.headerNavigation}>
                    <Link to="/" onClick={this.cancel} invert disabledUnderline className={classes.backLink}>
                        <Icon>previous</Icon>
                    </Link>
                    <Typography type="body2" className={classes.headerNavigationTitle}>Edit Profile</Typography>
                    <Link to="/" onClick={this.submit} invert disabledUnderline className={classes.backLink}>
                        <Icon>checkmark</Icon> Save
                    </Link>
                </div>
            </Hidden>
            <Hidden xsDown>
                <Typography type="headline">Edit Profile</Typography>
            </Hidden>
            <div className={classes.content}>
                <div className={classes.left}>

                    <div
                        className={classNames(classes.pictureWrap, {[classes.pictureDefaultWrap]: !user.profile_picture})}>
                        <img
                            className={classNames(classes.picture, {[classes.pictureDefault]: !user.profile_picture})}
                            src={user.profile_picture || defaultPhoto}/>

                    </div>

                    <div className={classes.pictureLinks}>
                        <Typography type="body1" className={classNames(classes.link, classes.uploadWrap)}>
                            Update profile picture
                            <input autoComplete="off" type="file" onChange={this.onUploadPicture}
                                   className={classes.uploadInput}/>
                        </Typography>
                        <Typography type="body1" onClick={this.onDeletePicture} className={classes.link}>
                            Delete profile picture
                        </Typography>

                    </div>
                </div>


                <form className={classes.formWrap} onSubmit={this.submit}>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth
                                       error={this.state.errors.indexOf('first_name') > -1}
                                       required
                                       label="First Name"
                                       value={this.state.first_name || ''}
                                       onChange={this.handleChange('first_name')}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth
                                       error={this.state.errors.indexOf('last_name') > -1}
                                       required
                                       label="Last Name"
                                       value={this.state.last_name || ''}
                                       onChange={this.handleChange('last_name')}/>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <DateTextField required
                                           fullWidth
                                           error={this.state.errors.indexOf('birthday') > -1}
                                           label="Date of Birth"
                                           value={this.state.birthday}
                                           onChange={this.handleChange('birthday')}/>

                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Autosuggest fullWidth
                                         error={this.state.errors.indexOf('gender') > -1}
                                         suggestions={genderOptions}
                                         onSuggestionsFetchRequested={() => {
                                         }}
                                         onSuggestionsClearRequested={() => {
                                         }}
                                         inputProps={{
                                             label: "Gender",
                                             value: GENDER_LIST[this.state.gender] || '',
                                             onChange: (event, {newValue}) => this.setState({gender: newValue}),
                                         }}
                            />

                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Autosuggest fullWidth
                                         error={this.state.errors.indexOf('nationality') > -1}
                                         suggestions={this.props.nationalityOptions}
                                         onSuggestionsFetchRequested={() => {
                                         }}
                                         onSuggestionsClearRequested={() => {
                                         }}
                                         inputProps={{
                                             label: "Nationality",
                                             value: this.props.nationalities[this.state.nationality] || '',
                                             onChange: (event, {newValue}) => this.setState({nationality: newValue}),
                                         }}
                            />

                        </Grid>

                    </Grid>
                    <Typography type="subheading" className={classes.subTitle}>Hockey Information</Typography>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <Autosuggest fullWidth
                                         error={this.state.errors.indexOf('position') > -1}
                                         suggestions={positionOptions}
                                         onSuggestionsFetchRequested={() => {
                                         }}
                                         onSuggestionsClearRequested={() => {
                                         }}
                                         inputProps={{
                                             label: "Position",
                                             value: POS_LIST[this.state.position] || '',
                                             onChange: (event, {newValue}) => this.setState({position: newValue}),
                                         }}
                            />
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Autosuggest fullWidth
                                         error={this.state.errors.indexOf('shot') > -1}
                                         suggestions={shotOptions}
                                         onSuggestionsFetchRequested={() => {
                                         }}
                                         onSuggestionsClearRequested={() => {
                                         }}
                                         inputProps={{
                                             label: "Shot",
                                             value: SHOT_LIST[this.state.shot] || '',
                                             onChange: (event, {newValue}) => this.setState({shot: newValue}),
                                         }}
                            />
                        </Grid>

                        <Grid item xs={6} md={6}>
                            <TextField fullWidth
                                       label="Jersey number"
                                       error={this.state.errors.indexOf('player_num') > -1}
                                       value={this.state.player_num || ''}
                                       onChange={this.handleChange('player_num')}/>
                        </Grid>

                        <Grid item xs={6} md={6}>
                            <HeightTextField fullWidth
                                             error={this.state.errors.indexOf('height') > -1}
                                             label="Height"
                                             value={this.state.height}
                                             onChange={this.handleChange('height')}/>

                        </Grid>

                        <Grid item xs={6} md={6}>
                            <TextField fullWidth
                                       error={this.state.errors.indexOf('weight') > -1}
                                       label="Weight (lbs)"
                                       value={this.state.weight || ''}
                                       onChange={this.handleChange('weight')}/>
                        </Grid>


                    </Grid>
                    <Typography type="subheading" className={classes.subTitle}>Team Information</Typography>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <Autosuggest fullWidth
                                         error={this.state.errors.indexOf('id_league') > -1}
                                         suggestions={this.props.leagueOptions}
                                         onSuggestionsFetchRequested={() => {
                                         }}
                                         onSuggestionsClearRequested={() => {
                                         }}
                                         inputProps={{
                                             label: "Current or Most Recent League",
                                             value: this.props.leagues[this.state.id_league] || '',
                                             onChange: (event, {newValue}) => this.setState({id_league: newValue}),
                                         }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>

                            <Autosuggest fullWidth
                                         error={this.state.errors.indexOf('id_team_current') > -1}
                                         suggestions={this.state.id_league ? this.props.teamOptions.filter(i => i.item.id_league === parseInt(this.state.id_league)) : this.props.teamOptions}
                                         onSuggestionsFetchRequested={() => {
                                         }}
                                         onSuggestionsClearRequested={() => {
                                         }}
                                         inputProps={{
                                             label: "Current or Most Recent Team",
                                             value: this.props.teams[this.state.id_team_current] || '',
                                             onChange: (event, {newValue}) => this.setState({id_team_current: newValue}),
                                         }}
                            />
                        </Grid>
                    </Grid>


                    <Typography type="subheading" className={classes.subTitle}>About Me</Typography>
                    <Typography type="caption" className={classes.rememberTitle}>Remember, scouts will be reading this
                        before
                        they decide to contact
                        you.</Typography>
                    <Grid container>
                        <Grid item xs={12} md={12}>
                            <TextField fullWidth
                                       error={this.state.errors.indexOf('weight') > -1}
                                       multiline
                                       rowsMax="4"
                                       rows="1"
                                       label="Tell us about yourself"
                                       value={this.state.biography || ''}
                                       onChange={this.handleChange('biography')}/>

                        </Grid>
                    </Grid>
                    <Hidden xsDown>
                        <div className={classes.buttons}>
                            <Button raised onClick={this.props.cancel} className={classes.buttonCancel}>Cancel</Button>
                            <Button raised color="primary" type="submit">Save</Button>
                        </div>
                    </Hidden>
                </form>
            </div>
        </div>
    }
}

PlayerForm.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styleSheet), withWidth())(PlayerForm);