/**
 * Created by aleksandr on 8/23/17.
 * moonion.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Prompt} from 'react-router';
import classNames from 'classnames';
import withWidth from 'material-ui/utils/withWidth';
import compose from 'recompose/compose';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';

import {DateTextField, HeightTextField, Autosuggest, Link, Icon, TextArea, DropDown} from '../../../common/components';

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
        [theme.breakpoints.down('md')]: {
            marginTop: 48,
            width: 'auto',
        },
    },
    content: {
        paddingTop: 32,
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },

    },
    left: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'row',
        },
    },
    pictureWrap: {
        width: 270,
        height: 270,
        overflow: 'hidden',
        position: 'relative',

        [theme.breakpoints.down('md')]: {
            height: 192,
            width: 218,
        },
    },
    pictureDefaultWrap: {
        justifyContent: 'center',
    },
    picture: {
        minWidth: '100%',
        minHeight: '100%',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        position: 'absolute',
        margin: 'auto',
    },
    pictureDefault: {
        width: 176,
        [theme.breakpoints.down('md')]: {
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
        [theme.breakpoints.down('md')]: {
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
        [theme.breakpoints.down('lg')]: {
            marginLeft: 40,
            marginRight: 40,
        },
        [theme.breakpoints.down('md')]: {
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
    weight: user.weight ? '' + parseFloat(user.weight) : '',
    id_league: user.id_league,
    id_team_current: user.id_team_current,
    league: user.league,
    team: user.team,
    biography: user.biography,
    id_country: user.id_country,
    team_website: user.team_website,
});

function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

class PlayerForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDeletePhotoOpen: false,
            ...getUserState(props.user),
            isUpdate: false,
            errors: []
        };
    }

    componentDidMount() {
        this.props.fetchData();
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.user)
            this.setState(getUserState(nextProps.user))
    }

    handleChange = name => event => {
        if (name === 'player_num' && event.target.value.length > 0
            && (
                isNaN(parseInt(event.target.value)) ||
                parseInt(event.target.value) < 1 ||
                parseInt(event.target.value) > 99 ||
                event.target.value !== '' + parseInt(event.target.value))) return;

        if (name === 'weight' && event.target.value.length > 0
            && (
                isNaN(parseInt(event.target.value)) ||
                parseInt(event.target.value) < 1 ||
                event.target.value !== '' + parseInt(event.target.value))) return;

        return this.setState({[name]: event.target.value, isUpdate: true})
    };

    onUploadPicture = event => {
        event.preventDefault();
        if (!event.target.files.length) return;

        this.props.uploadPicture(event.target.files[0]);

    };


    handleDialogDelete = event => {
        event.preventDefault();
        this.props.uploadPicture(null);
        this.setState({isDeletePhotoOpen: false});
        return false
    };
    handleDelete = event => {
        event.preventDefault();
        this.setState({isDeletePhotoOpen: true});

        return false
    };
    handleDialogCancel = event => {
        this.setState({isDeletePhotoOpen: false})
    };

    cancel = event => {
        event.preventDefault();
        this.props.cancel();
        return false;
    };
    submit = event => {
        event.preventDefault();
        let data = this.state;

        if (this.state.id_league === '-1' && !this.state.league)
            return this.setState({errors: ['league']});

        if (this.state.id_league === '')
            data.id_league = null;

        if (this.state.id_team_current === '-1' && !this.state.team)
            return this.setState({errors: ['team']});

        if(this.state.team_website && !(validateUrl(this.state.team_website) || validateUrl('http://'+this.state.team_website)))
            return this.setState({errors: ['team_website']});


        if (this.state.id_team_current === '')
            data.id_team_current = null;

        if (data.height && !data.height[0] && !data.height[1])
            data.height = null;

        if (data.birthday && data.birthday === '0000-00-01')
            data.height = null;

        // Intercom profile update player
        window.Intercom('update', { app_id: 'coswd1k2',
          name: data.first_name+' '+data.last_name
        });

        var detail = {           
          name: data.first_name+' '+data.last_name,
          email: data.email,
          dob: data.birthday,
          gender: GENDER_LIST[data.gender],
          nationality: data.nationality,
          about: data.biography,
          position: POS_LIST[data.position],
          shot: SHOT_LIST[data.shot],
          jersey: data.player_num,
          weight: data.weight+' LBS',
          height: data.height[0]+'`'+data.height[1]+'"',
          country: data.country,
          league: data.league_id,
          team: data.id_team_current,
          new_league: data.league, 
          new_team: data.team,
          team_website: data.team_website, 
          type: 'Player'
        };

        Intercom('trackEvent', 'Profile update', detail);

        this.setState({isUpdate: false}, () => {
            this.props.save(data);
        });

        return false;
    };

    render() {
        const {classes, user, width} = this.props;
        const smallWidth = width === 'sm' || width === 'xs';

        let userPhotoSrc = defaultPhoto;

        if (user.profile_picture) {
            userPhotoSrc = user.profile_picture;
        }

        if (smallWidth && user.profile_picture_mobile) {
            userPhotoSrc = user.profile_picture_mobile;
        } else if (user.profile_picture_desktop) {
            userPhotoSrc = user.profile_picture_desktop;
        }
        let levels = null;
        if (this.state.id_country)
            levels = this.props.levels.filter(l => parseInt(l.id_country) === parseInt(this.state.id_country)).map(l => l.id);

        return <div className={classes.root}>
            <Prompt
                message="Your profile hasn't been saved! All changes will be lost. Are you sure you want to leave?"
                when={this.state.isUpdate}
            />
            <Hidden only={['md', 'lg', 'xl']}>
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
            <Hidden only={['xs', 'sm']}>
                <Typography type="headline">Edit Profile</Typography>
            </Hidden>
            <div className={classes.content}>
                <div className={classes.left}>

                    <div
                        className={classNames(classes.pictureWrap, {[classes.pictureDefaultWrap]: !user.profile_picture})}>
                        <img
                            className={classNames(classes.picture, {[classes.pictureDefault]: !user.profile_picture})}
                            src={userPhotoSrc}/>

                    </div>

                    <div className={classes.pictureLinks}>
                        <Typography type="body1" className={classNames(classes.link, classes.uploadWrap)}>
                            Update profile picture
                            <input autoComplete="off" type="file"
                                   accept="image/*"
                                   onChange={this.onUploadPicture}
                                   className={classes.uploadInput}/>
                        </Typography>
                        {user.profile_picture && (
                            <Typography type="body1" onClick={this.handleDelete} className={classes.link}>
                                Delete profile picture
                            </Typography>
                        )}


                        <Dialog
                            open={this.state.isDeletePhotoOpen}
                            ignoreBackdropClick
                            ignoreEscapeKeyUp>
                            <DialogTitle disableTypography>
                                <Typography type="subheading">
                                    Do you want to delete your profile picture?
                                </Typography>
                            </DialogTitle>
                            <DialogActions>
                                <Button onClick={this.handleDialogCancel}>
                                    Cancel
                                </Button>
                                <Button onClick={this.handleDialogDelete} color="primary">
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>


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
                            <DropDown fullWidth
                                      error={this.state.errors.indexOf('gender') > -1}
                                      options={genderOptions}
                                      label="Gender"
                                      value={GENDER_LIST[this.state.gender] || ''}
                                      onChange={this.handleChange('gender')}/>

                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Autosuggest fullWidth
                                         error={this.state.errors.indexOf('nationality') > -1}
                                         label="Nationality"
                                         suggestions={this.props.nationalityOptions}
                                         onSuggestionSelected={(event, {suggestionValue}) => {
                                             this.setState({
                                                 nationality: suggestionValue,
                                                 isUpdate: true
                                             });
                                         }}
                                         value={this.props.nationalities[this.state.nationality] || ''}/>

                        </Grid>

                    </Grid>
                    <Typography type="subheading" className={classes.subTitle}>Hockey Information</Typography>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <DropDown fullWidth
                                      error={this.state.errors.indexOf('position') > -1}
                                      options={positionOptions}
                                      label="Position"
                                      value={POS_LIST[this.state.position] || ''}
                                      onChange={this.handleChange('position')}/>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <DropDown fullWidth
                                      error={this.state.errors.indexOf('shot') > -1}
                                      options={shotOptions}
                                      label="Shot"
                                      value={SHOT_LIST[this.state.shot] || ''}
                                      onChange={this.handleChange('shot')}/>
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
                        <Grid item xs={12}>
                            <Grid item xs={12} md={6}>
                                <Autosuggest fullWidth
                                             error={this.state.errors.indexOf('country') > -1}
                                             label="Country"
                                             suggestions={this.props.countryOptions}
                                             onSuggestionSelected={(event, {suggestionValue}) => {
                                                 this.setState({
                                                     id_country: suggestionValue,
                                                     id_league: '',
                                                     id_team_current: '',
                                                     league: '',
                                                     team: '',
                                                 });
                                             }}
                                             value={this.props.countries[this.state.id_country] || ''}/>
                            </Grid>

                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid item xs={12}>
                                <Autosuggest fullWidth
                                             error={this.state.errors.indexOf('id_league') > -1}
                                             label="Current or Most Recent League"
                                             suggestions={levels ? this.props.leagueOptions.filter(l => l.value === '-1' || levels.indexOf(parseInt(l.item.id_level)) > -1) : this.props.leagueOptions}
                                             onSuggestionSelected={(event, {suggestionValue}) => {
                                                 if ((!this.state.id_league && !suggestionValue) || '' + this.state.id_league === '' + suggestionValue) return;

                                                 let id_team_current = !suggestionValue ? this.state.id_team_current : '';
                                                 if (suggestionValue && this.state.id_team_current && this.state.id_team_current !== '-1' && this.props.teamOptions.find(i => i.value === this.state.id_team_current && i.item.id_league === parseInt(suggestionValue))) {
                                                     id_team_current = this.state.id_team_current
                                                 }

                                                 this.setState({
                                                     id_league: suggestionValue,
                                                     id_team_current: suggestionValue === '-1' ? '-1' : id_team_current,
                                                     team: suggestionValue === '-1' ? '' : this.state.team,
                                                     league: '',
                                                     isUpdate: true
                                                 });
                                             }}
                                             value={this.state.id_league ? (this.props.leagues[this.state.id_league] || this.props.leagues['-1']) : ''}/>
                            </Grid>

                            {(this.state.id_league === '-1' || (this.state.id_league && !this.props.leagues[this.state.id_league])) && (
                                <Grid item xs={12}>
                                    <TextField fullWidth
                                               required
                                               error={this.state.errors.indexOf('league') > -1}
                                               label="Type the League and Level name"
                                               value={this.state.league || ''}
                                               onChange={this.handleChange('league')}
                                    />
                                </Grid>
                            )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {this.state.id_league !== '-1' && !(this.state.id_league && !this.props.leagues[this.state.id_league]) && (
                                <Grid item xs={12}>

                                    <Autosuggest fullWidth
                                                 error={this.state.errors.indexOf('id_team_current') > -1}
                                                 label="Current or Most Recent Team"
                                                 suggestions={this.state.id_league ? this.props.teamOptions.filter(i => i.value === '-1' || i.item.id_league === parseInt(this.state.id_league)) : this.props.teamOptions}
                                                 onSuggestionSelected={(event, {suggestionValue}) => {
                                                     if ((!this.state.id_team_current && !suggestionValue) || '' + this.state.id_team_current === '' + suggestionValue) return;
                                                     this.setState({
                                                         id_team_current: suggestionValue,
                                                         team: '',
                                                         isUpdate: true
                                                     });
                                                 }}
                                                 value={this.state.id_team_current ? (this.props.teams[this.state.id_team_current] || this.props.teams['-1']) : ''}/>
                                </Grid>
                            )}

                            {(this.state.id_league === '-1' || (this.state.id_league && !this.props.leagues[this.state.id_league]) || this.state.id_team_current === '-1' || (this.state.id_team_current && !this.props.teams[this.state.id_team_current])) && (
                                <Grid item xs={12}>
                                    <TextField fullWidth
                                               required
                                               error={this.state.errors.indexOf('team') > -1}
                                               label="Type in the full Team name"
                                               value={this.state.team || ''}
                                               onChange={this.handleChange('team')}
                                    />
                                </Grid>
                            )}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField fullWidth
                                       error={this.state.errors.indexOf('team_website') > -1}
                                       label="Team's website"
                                       value={this.state.team_website || ''}
                                       onChange={this.handleChange('team_website')}/>
                        </Grid>
                    </Grid>


                    <Typography type="subheading" className={classes.subTitle}>About Me</Typography>
                    <Typography type="caption" className={classes.rememberTitle}>Remember, scouts will be reading this
                        before
                        they decide to contact
                        you.</Typography>
                    <Grid container>
                        <Grid item xs={12} md={12}>
                            <TextArea fullWidth
                                      rowsMax="4"
                                      max={500}
                                      error={this.state.errors.indexOf('weight') > -1}
                                      label="Tell us about yourself"
                                      value={this.state.biography || ''}
                                      onChange={this.handleChange('biography')}/>

                        </Grid>
                    </Grid>
                    <Hidden only={['xs', 'sm']}>
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