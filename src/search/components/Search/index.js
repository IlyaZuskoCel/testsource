/**
 * Created by kirill on 7/21/17.
 * moonion.com
 */
import React, {Component} from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Tabs, {Tab} from 'material-ui/Tabs';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import withWidth from 'material-ui/utils/withWidth';
import {Link, Pagination, Autosuggest} from '../../../common/components';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Helmet from 'react-helmet';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import defaultPhoto from './assets/images/default-photo.png';

import Players from './players';
import Scouts from './scouts';
import ScoutFilter from './scoutFilter';
import PlayerFilter from './playerFilter';
import Icon from 'material-ui/Icon';
import queryString from 'query-string';

const styleSheet = createStyleSheet('Search', theme => ({
    root: {},
    content: {
        maxWidth: 1168,
        width: '100%',
        margin: 'auto',
        '& h3': {
            textAlign: 'center'
        }
    },
    header: {
        backgroundColor: '#f5f5f5',

        [theme.breakpoints.down('lg')]: {
            padding: [0, 20],
        }
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: [70, 0],
    },

    containerWrapper: {
        backgroundColor: 'transparent',
        padding: 56,
        boxShadow: '0 -8px 8px -8px rgba(0, 0, 0, 0.2)',

        [theme.breakpoints.down('lg')]: {
            padding: [56, 20]
        },

        [theme.breakpoints.down('md')]: {
            padding: [28, 0],
            boxShadow: 'none',
        }
    },
    noMargin: {
        marginTop: 0,
    },

    headerBackground: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: 60,
        width: '100%',
        backgroundImage: 'linear-gradient(295deg, #f55e58, #c9011b)',
    },

    headerWholeBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 178,
        width: '100%',
        backgroundImage: 'linear-gradient(295deg, #f55e58, #c9011b)',
        zIndex: -1,
    },
    headerMobNav: {
        position: 'relative',
        left: 0,
        top: 0,
        heigth: 52,
        minHeight: 52,
        width: '100%',
        backgroundImage: 'transparent',
        display: 'flex',
    },
    navigationWrapper: {
        width: '100%',
        height: 52,
        minHeight: 52,
    },
    headerMobTab: {
        fontSize: 20,
        letterSpacing: 0.6,
        leftAlign: 'center',
        color: '#ffffff',
    },
    tabWrapper: {
        marginRight: 100,
    },
    headerMobCointainer: {
        display: 'flex',
        height: 52,
    },
    filterTogglerConntainer: {
        display: 'flex',
        height: 64,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonFilter: {
        color: '#ffffff',
    },
    '@keyframes fadeIn': {
        from: {opacity: 0.1},
        to: {opacity: 1}
    },
    filterTopHeight: {
        height: 118,
        position: 'relative',
        zIndex: 1,
        animation: 'fadeIn .7s'

    },
    navItem: {
        marginTop: 40
    },

    tabColor: {
        color: '#cbcbcb'
    },

    activeTab: {
        color: '#d7001e',
    },

    filterTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '900',
        textAlign: 'center',
        fontFamily: 'UnitedSansSemiCond-Heavy',
        letterSpacing: .3,
    },

    line: {
        top: 110,
        left: 0,
        width: '100%',
        color: '#ffffff',
        height: 2,
        opacity: .2,
        position: 'absolute',
        background: '#fff',
    },

    clearFilters: {
        position: 'absolute',
        right: 0,
    },

    clearFilterTypography: {
        fontSize: 14,
        fontFamily: 'UnitedSansReg-Medium',
        fontWeight: 500,
        color: '#ffffff',
    },
    arrow: {
        color: '#ffffff',
    },
    fixNav: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9,
    },
    headerMobNavFix: {
        position: 'fixed',
        top: 60,
        left: 0,
        zIndex: 9999,
    },
    filterTogglerConntainerFix: {
        position: 'fixed',
        top: 115,
        left: 0,
        zIndex: 9999,
    },
    link: {
        color: '#eb3941',
        cursor: 'pointer',
        fontSize: 14,
        textDecoration: 'underline',
        [theme.breakpoints.down('md')]: {
            marginTop: 8,
            marginLeft: 24,
        },
    },
    clearLink: {
        display: 'inline-block',
        paddingBottom: 24
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 36,
        marginBottom: 68,
        '& button:first-child': {
            marginRight: 30,
            [theme.breakpoints.down('md')]: {
                marginRight: 0,
            }
        },
        [theme.breakpoints.down('md')]: {
            justifyContent: 'space-around',
            '& button': {
                minWidth: 140
            }
        }
    },
    snackbar: {
        width: 600,
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
        }
    },
    message: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 40
    },
    buttonsMessage: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '41px 45px 38px 54px',
        '& span:before': {
            display: 'none',

        }
    },
    buttonsPopup: {
        marginTop: 50,
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        '& button': {
            color: theme.palette.text.disabled,
        }
    },
    primaryButton: {
        color: '#d7001e !important'
    }
}));


class Search extends Component {
    scrollY = 0;

    constructor(props) {
        super(props);

        let playerFilters = props.filters && props.filters.player ? props.filters.player : {};
        let scoutFilters = props.filters && props.filters.scout ? props.filters.scout : {};

        let propFilters = props.type === 'player' ? this.composeFiltersToQuery(playerFilters) : this.composeFiltersToQuery(scoutFilters);


        this.state = {
            activeTab: this.props.type && this.props.type === 'scout' ? 1 : 0,
            activePage: 1,
            query: Object.keys(this.props.location.search).length > 0 ? queryString.parse(this.props.location.search) : propFilters,
            numberOfResults: 0,
            mobileFilterOn: true,
            direction: '',
            lastScrollPos: 0,
            appliedFilters: {
                playerFilters: 0,
                scoutFilters: 0
            },
            clearFilters: '',
            dropdownLeagues: [],
            showPopup: false,
            popUpText: 'You must be logged in',
            textField: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.changePagination = this.changePagination.bind(this);
        this.toggleMobileFilter = this.toggleMobileFilter.bind(this);
        this.onClearFilters = this.onClearFilters.bind(this);
        this.stopClearing = this.stopClearing.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.showPopUp = this.showPopUp.bind(this);

        setTimeout(() => {
            this.setState({activeTab: this.props.type && this.props.type === 'scout' ? 1 : 0})
        }, 400)
    }

    handleScroll(event) {
        const {width} = this.props;
        const smallWidth = width === 'sm' || width === 'xs';
        if (!smallWidth || !this.state.mobileFilterOn || Math.abs(this.scrollY - window.scrollY) < 10) return;

        const direction = this.scrollY - window.scrollY > 0 ? 'top' : 'bottom';

        this.scrollY = window.scrollY;

        if (direction === this.state.direction) return;

        this.setState({
            direction
        });

        if (direction === 'top')
            this.props.hideHeaderBackground();
        else
            this.props.showHeaderBackground();

    };

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        let query = {...this.state.query}

        // setTimeout(() => {
        //     this.props.upload(this.props.type, {page: 1, 'per-page': 18, ...query})
        // }, 400);
        // this.props.fetchData();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }


    composeFiltersToQuery = (filters) => {
        let queryFromFilters = {};

        Object.keys(filters).forEach(key => {
            if (!Array.isArray(filters[key])) {
                queryFromFilters[key] = filters[key];
            }
        });

        if ('born' in filters) {
            queryFromFilters['born[0]'] = filters.born[0];
            queryFromFilters['born[1]'] = filters.born[1];
        }

        if ('name_search' in filters) {
            queryFromFilters['name'] = filters['name_search'];
        }

        if (this.props.headers) {
            queryFromFilters['page'] = this.props.headers.page;
        }

        return queryFromFilters;
    };

    componentWillReceiveProps(nextProps) {
        if ('query' in nextProps) {

            let parsedQuery = queryString.parse(nextProps.query);
            this.setState({query: parsedQuery});
        }

        if ('filters' in nextProps && nextProps.filters) {
            let appliedFilters = this.state.appliedFilters;


            if ('player' in nextProps.filters && nextProps.filters.player) {
                appliedFilters.playerFilters = Object.keys(nextProps.filters.player).filter(i => i !== 'page').length;
                this.setState({appliedFilters})
            }

            if ('scout' in nextProps.filters && nextProps.filters.scout) {
                appliedFilters.scoutFilters = Object.keys(nextProps.filters.scout).filter(i => i !== 'page').length
                this.setState({appliedFilters})
            }
        }

        if ('headers' in nextProps && nextProps.headers) {
            this.setState({pageCurrentPosition: nextProps.headers.page});
        }
    }

    handleChange(event, value) {
        this.props.clearFilters();
        let appliedFilters = this.state.appliedFilters;
        appliedFilters.playerFilters = 0;
        appliedFilters.scoutFilters = 0;


        this.setState({activeTab: value, appliedFilters}, () => {
            this.props.go(value === 1 ? '/search/scout' : '/search/player');
            this.props.upload(value === 1 ? 'scout' : 'player', {page: 1, 'per-page': 18});
        });
    }

    onClearFilters() {
        this.setState({clearField: this.props.type});
    }

    stopClearing() {

        let appliedFilters = this.state.appliedFilters;
        appliedFilters.playerFilters = 0;
        appliedFilters.scoutFilters = 0;

        this.setState({clearField: '', appliedFilters}, () => {
            this.props.clearFilters();
            this.props.go(this.props.type === 'scout' ? '/search/scout' : '/search/player');

            setTimeout(() => {
                this.props.upload(this.props.type, {page: 1, 'per-page': 18});
                this.forceUpdate();
            }, 400);
        });
    }

    changePagination(page) {

        this.setState({activePage: page}, () => {

            if ('page' in this.state.query) {
                this.state.query.page = page.toString();
            }

            this.props.upload(this.props.type, {page: page, 'per-page': 18, ...this.state.query});
        });

        window.scroll(0, 0);
    }

    toggleMobileFilter() {

        if (!this.props.currentUser) return this.setState({
            showPopup: true,
            popUpText: 'You must be logged in to use the filter feature.'
        });

        if (this.state.mobileFilterOn)
            this.props.hideFooter();
        else
            this.props.showFooter();

        this.props.showHeaderBackground();

        this.setState({mobileFilterOn: !this.state.mobileFilterOn}, () => {
            this.forceUpdate();
        });
    }

    showPopUp(popUpText){
        this.setState({showPopup: true, popUpText: popUpText, textField:false});
    }

    componentWillMount() {
        this.props.setFilters(this.state.query, this.props.type == 'scout' ? 'scout' : '');
    }

    handleClosePopup = () => {
        this.setState({showPopup:false, clearField: this.props.type, textField:true})
    };

    render() {
        const {classes, currentUser, headers, location, type} = this.props;

        return (<div className={classes.root}>
            <Helmet>
                <title>Get To The Next Level</title>
                <meta name="title" content="Get To The Next Level | Scout Zoo" />
                <meta property="og:title" content="Get To The Next Level | Scout Zoo" />
                <meta property="og:description" content="Scout Zoo is the online scouting platform where players upload their videos and get discovered by scouts worldwide." />
                <meta name="description" content="Scout Zoo is the online scouting platform where players upload their videos and get discovered by scouts worldwide." />
                <meta property="og:image" content="https://s3.amazonaws.com/scoutzoocraft-public-storage/_1200x630_crop_center-center_60/homepage-benefits-for-scouts.jpg?mtime=20170508205514" />


            </Helmet>
            <Hidden only={['xs', 'sm']}>
                <header className={classes.header}>
                    <div className={classNames(classes.content, classes.noMargin)}>
                        <Tabs index={this.state.activeTab} indicatorClassName="indicatorxsDown" textColor={'#cbcbcb'}
                              onChange={this.handleChange} width={this.state.width}>
                            <Tab label={<Typography type={"title"}
                                                    className={classNames(this.state.activeTab === 0 ? classes.activeTab : classes.tabColor)}>Players</Typography>}
                                 className={classes.navItem}/>
                            <Tab label={<Typography type={"title"}
                                                    className={classNames(this.state.activeTab === 1 ? classes.activeTab : classes.tabColor)}>Scouts</Typography>}
                                 className={classes.navItem}/>
                        </Tabs>
                    </div>

                    <div className={classNames(classes.content)}>
                        {this.props.type === 'scout' && <ScoutFilter countries={this.props.countries}
                                                                     countryOptions={this.props.countryOptions}
                                                                     leagues={this.props.leagues}
                                                                     leagueOptions={this.props.leagueOptions}
                                                                     levels={this.props.levels}
                                                                     levelOptions={this.props.levelOptions ? this.props.levelOptions : []}
                                                                     teams={this.props.teams}
                                                                     teamOptions={this.props.teamOptions}
                                                                     filterScouts={this.props.filterScouts}
                                                                     activePage={this.state.activePage}
                                                                     query={this.state.query}
                                                                     clearFilters={this.state.clearFilters}
                                                                     clearField={this.state.clearField}
                                                                     stopClearing={this.stopClearing}
                                                                     page={this.state.pageCurrentPosition ? this.state.pageCurrentPosition : 1}
                                                                     currentUser={this.props.currentUser}
                                                                     showPopUp={this.showPopUp}
                                                                     filters={this.props.filters && this.props.filters.scout ? this.props.filters.scout : {}}
                                                                     setFilters={this.props.setFilters}
                                                                     textField={this.state.textField}
                        />}

                        {this.props.type === 'player' && <PlayerFilter countries={this.props.countries}
                                                                       countryOptions={this.props.countryOptions}
                                                                       leagues={this.props.leagues}
                                                                       leagueOptions={this.props.leagueOptions}
                                                                       levels={this.props.levels}
                                                                       levelOptions={this.props.levelOptions ? this.props.levelOptions : []}
                                                                       teams={this.props.teams}
                                                                       teamOptions={this.props.teamOptions}
                                                                       filterPlayers={this.props.filterPlayers}
                                                                       activePage={this.state.activePage}
                                                                       query={this.state.query}
                                                                       clearFilters={this.state.clearFilters}
                                                                       clearField={this.state.clearField}
                                                                       stopClearing={this.stopClearing}
                                                                       page={this.state.pageCurrentPosition ? this.state.pageCurrentPosition : 1}
                                                                       currentUser={this.props.currentUser}
                                                                       showPopUp={this.showPopUp}
                                                                       filters={this.props.filters && this.props.filters.player ? this.props.filters.player : {}}
                                                                       setFilters={this.props.setFilters}
                                                                       textField={this.state.textField}

                        />}
                        <Typography className={classNames(classes.link, classes.clearLink)}
                                    type="body1"
                                    onClick={this.onClearFilters}>
                            Clear All
                        </Typography>
                    </div>
                </header>
            </Hidden>

            <Hidden only={['md', 'lg', 'xl']}>
                <div
                    className={classNames({
                        [classes.filterTopHeight]: this.state.direction === 'top' && this.state.mobileFilterOn,

                    })}>
                    <div
                        className={classNames(classes.headerWholeBackground, {[classes.fixNav]: this.state.direction === 'top' && this.state.mobileFilterOn})}>
                        <div className={classes.line}/>
                    </div>

                    <div
                        className={classNames(classes.headerMobNav,
                            this.state.direction === 'top'
                            && this.state.mobileFilterOn ? classes.headerMobNavFix : null)}>
                        <Tabs index={this.state.activeTab} onChange={this.handleChange}
                              className={classes.navigationWrapper}
                              centered classes={{flexContainer: classes.headerMobCointainer}} textColor='#ffffff'
                              indicatorColor={'#ffffff'}>
                            <Tab label={<Typography type='body2'
                                                    className={classNames(classes.headerMobTab, classes.firstMobTab)}>Players</Typography>}
                                 style={{marginRight: 100}}/>
                            <Tab label={<Typography type='body2' className={classes.headerMobTab}>Scouts</Typography>}/>
                        </Tabs>
                    </div>

                    <div
                        className={classNames(classes.filterTogglerConntainer,
                            this.state.direction === 'top'
                            && this.state.mobileFilterOn ? classes.filterTogglerConntainerFix : null)}>
                        <Button className={classes.buttonFilter} onClick={this.toggleMobileFilter}>
                            <Typography className={classes.filterTitle}>Filter
                                ({this.props.type === 'player' ? this.state.appliedFilters.playerFilters : this.state.appliedFilters.scoutFilters})</Typography>
                            {this.state.mobileFilterOn && <Icon className={classes.arrow}>keyboard_arrow_down</Icon>}
                            {!this.state.mobileFilterOn && <Icon className={classes.arrow}>keyboard_arrow_up</Icon>}
                        </Button>
                        {!this.state.mobileFilterOn &&
                        <Button className={classes.clearFilters} onClick={this.onClearFilters}>
                            <Typography className={classes.clearFilterTypography}>Clear All</Typography>
                        </Button>}
                    </div>
                </div>
            </Hidden>

            {!this.state.mobileFilterOn  && <Hidden only={['md', 'lg', 'xl']}>
                <div>
                    {this.props.type === 'scout' && <ScoutFilter countries={this.props.countries}
                                                                 countryOptions={this.props.countryOptions}
                                                                 leagues={this.props.leagues}
                                                                 leagueOptions={this.props.leagueOptions}
                                                                 levels={this.props.levels}
                                                                 levelOptions={this.props.levelOptions ? this.props.levelOptions : []}
                                                                 teams={this.props.teams}
                                                                 teamOptions={this.props.teamOptions}
                                                                 filterScouts={this.props.filterScouts}
                                                                 activePage={this.state.activePage}
                                                                 total={this.props.headers ? this.props.headers.count : 0}
                                                                 viewResults={this.toggleMobileFilter}
                                                                 query={this.state.query}
                                                                 clearField={this.state.clearField}
                                                                 stopClearing={this.stopClearing}
                                                                 page={this.state.pageCurrentPosition ? this.state.pageCurrentPosition : 1}
                                                                 currentUser={this.props.currentUser}
                                                                 filters={this.props.filters && this.props.filters.scout ? this.props.filters.scout : {}}
                                                                 setFilters={this.props.setFilters}
                    />
                    }

                    {this.props.type === 'player' && <PlayerFilter countries={this.props.countries}
                                                                   countryOptions={this.props.countryOptions}
                                                                   leagues={this.props.leagues}
                                                                   leagueOptions={this.props.leagueOptions}
                                                                   levels={this.props.levels}
                                                                   levelOptions={this.props.levelOptions ? this.props.levelOptions : []}
                                                                   teams={this.props.teams}
                                                                   teamOptions={this.props.teamOptions}
                                                                   filterPlayers={this.props.filterPlayers}
                                                                   activePage={this.state.activePage}
                                                                   total={this.props.headers ? this.props.headers.count : 0}
                                                                   viewResults={this.toggleMobileFilter}
                                                                   query={this.state.query}
                                                                   clearField={this.state.clearField}
                                                                   stopClearing={this.stopClearing}
                                                                   page={this.state.pageCurrentPosition ? this.state.pageCurrentPosition : 1}
                                                                   currentUser={this.props.currentUser}
                                                                   filters={this.props.filters && this.props.filters.player ? this.props.filters.player : {}}
                                                                   setFilters={this.props.setFilters}
                                                                   textField={this.state.textField}
                    />}
                </div>
            </Hidden>}

            {this.state.mobileFilterOn && <div className={classes.containerWrapper}>
                {this.props.type === 'player' &&
                <Players players={this.props.results}
                         total={this.props.headers ? this.props.headers.count : 0}
                         role={this.props.currentUser ? this.props.currentUser.role : ''}
                         addFavorite={this.props.addFavorite}
                         removeFavorite={this.props.removeFavorite}
                         currentUser={this.props.currentUser}
                         showPopUp={this.showPopUp}
                />
                }
                {this.props.type === 'scout' &&
                <Scouts scouts={this.props.results}
                        total={this.props.headers ? this.props.headers.count : 0}
                        currentUser={this.props.currentUser}
                        showPopUp={this.showPopUp}
                />
                }
            </div>}

            {currentUser && this.state.mobileFilterOn && this.props.headers && parseInt(this.props.headers.pageCount) > 1 &&
            <footer className={classes.footer}>
                <Pagination currentPage={this.state.pageCurrentPosition ? parseInt(this.state.pageCurrentPosition) : 1}
                            total={this.props.headers ? parseInt(this.props.headers.count) : 0} perPage={18}
                            onChange={this.changePagination}/>
            </footer>}
            {!currentUser ?
            <Grid container gutter={8} className={classes.content}>
                <Grid item xs={12}>
                    <Typography type="subheading" className={classes.subTitle}>Sign up to get full access to
                        {this.props.type === 'player' &&
                            ' a talanted roster of players'
                        }
                        {this.props.type === 'scout' &&
                            ' our database of scouts'
                        }
                    </Typography>
                    <div className={classes.buttons}>
                        <Link to="/sign/up" disabledUnderline>
                            <Button raised color="primary" className={classes.buttonCancel}>Sign Up</Button>
                        </Link>
                        <Link to="/sign/in" disabledUnderline>
                            <Button raised>Log In</Button>
                        </Link>
                    </div>
                </Grid>
            </Grid>
                : null}

            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                open={this.state.showPopup}
                className={classes.snackbar}
                message={<div className={classes.message}>
                    <Typography type="subheading">{this.state.popUpText}</Typography>
                    <div className={classes.buttonsPopup}>
                        <Button className={classes.buttonCancel} onClick={this.handleClosePopup}>cancel</Button>

                        <Link to="/sign/in" disabledUnderline>
                            <Button className={classes.primaryButton}>Log In</Button>
                        </Link>
                    </div>

                </div>}
            />

        </div>)
    }
}

Search.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Search);