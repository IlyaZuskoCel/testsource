/**
 * Created by kirill on 7/21/17.
 * moonion.com
 */
import React, {Component} from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Tabs, { Tab } from 'material-ui/Tabs';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import withWidth from 'material-ui/utils/withWidth';
import {Link, Pagination , Autosuggest} from '../../../common/components';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import defaultPhoto from './assets/images/default-photo.png';

import Players from './players';
import Scouts from './scouts';
import ScoutFilter from './scoutFilter';
import PlayerFilter from './playerFilter';
import Icon from 'material-ui/Icon';

import queryString from 'query-string';
import './assets/style.css';
import * as ReactDOM from "react-dom";

const styleSheet = createStyleSheet('Search' , theme => ({
    root: {},
    content: {
        maxWidth: 1168,
        marginTop: 56,
        width: '100%',
        margin: 'auto',
    },
    header: {
        backgroundColor: '#f5f5f5',

        [theme.breakpoints.down('lg')]: {
            padding: [0 , 20],
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

        [theme.breakpoints.down('md')]: {
            padding: [56, 20]
        },

        [theme.breakpoints.down('sm')]: {
            padding: [28 , 0],
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
        fontFamily:  'UnitedSansSemiCond-Heavy',
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
        zIndex: 99,
    },
    filterTogglerConntainerFix: {
        position: 'fixed',
        top: 115,
        left: 0,
        zIndex: 99,
    }
}));


const fixedMainNavigationTrashold = 350;

class Search extends Component {

    constructor(props) {
        super(props);

        let playerFilters = props.filters && props.filters.player ?  props.filters.player : {};
        let scoutFilters = props.filters && props.filters.scout ?  props.filters.scout : {};

        let propFilters = props.type === 'player' ? this.composeFiltersToQuery(playerFilters) : this.composeFiltersToQuery(scoutFilters);


        this.state = {
            activeTab:  this.props.type && this.props.type === 'scout' ? 1 : 0,
            activePage: 1,
            query: Object.keys(this.props.location.search).length > 0 ? queryString.parse(this.props.location.search) : propFilters,
            numberOfResults: 0,
            mobileFilterOn: true,
            direction:'',
            lastScrollPos:0,
            appliedFilters: {
                playerFilters: 0,
                scoutFilters: 0
            },
            clearFilters: '',
            dropdownLeagues: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.changePagination = this.changePagination.bind(this);
        this.toggleMobileFilter = this.toggleMobileFilter.bind(this);
        this.onClearFilters = this.onClearFilters.bind(this);
        this.stopClearing = this.stopClearing.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

        setTimeout(() => {
            this.setState({activeTab:  this.props.type && this.props.type === 'scout' ? 1 : 0})
        } ,  400)
    }

    handleScroll(event) {
        if(this.state.lastScrollPos > window.scrollY) {
            this.setState({
                direction:'top',
                lastScrollPos: window.scrollY
            });
        } else if(this.state.lastScrollPos < window.scrollY) {

            this.setState({
                direction:'bottom',
                lastScrollPos: window.scrollY
            });
        }
    };

    componentDidMount() {
        window.addEventListener( "scroll", this.handleScroll);
        let query = {...this.state.query}

        setTimeout(() => {this.props.upload(this.props.type , {page : 1 , 'per-page' : 18 , ...query})} , 400);
        this.props.fetchData();
    }

    componentWillUnmount() {
        window.removeEventListener( "scroll", this.handleScroll);
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
            this.setState({query : parsedQuery});
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
            this.setState({pageCurrentPosition : nextProps.headers.page});
        }
    }

    handleChange(event , value) {
        this.props.clearFilters();
        let appliedFilters = this.state.appliedFilters;
        appliedFilters.playerFilters = 0;
        appliedFilters.scoutFilters = 0;


        this.setState({activeTab : value , appliedFilters} , ()  => {
                this.props.go(value === 1 ? '/search/scout' : '/search/player');
                this.props.upload(value === 1 ? 'scout' : 'player' , {page : 1 , 'per-page' : 18});
            });
    }

    onClearFilters() {
        this.setState({clearField : this.props.type});
    }

    stopClearing() {

        let appliedFilters = this.state.appliedFilters;
        appliedFilters.playerFilters = 0;
        appliedFilters.scoutFilters = 0;

        this.setState({clearField: '' , appliedFilters} , () => {
            this.props.clearFilters();
            this.props.go(this.props.type === 'scout' ? '/search/scout' : '/search/player');

            setTimeout(() => {
                this.props.upload(this.props.type , {page : 1 , 'per-page': 18 });
                this.forceUpdate();
            } , 400);
        });
    }

    changePagination(page) {

        this.setState({activePage : page} , () => {

            if ('page' in this.state.query) {
                this.state.query.page = page.toString();
            }

           this.props.upload(this.props.type , {page : page , 'per-page': 18 , ...this.state.query});
        });

        window.scroll(0 , 0);
    }

    toggleMobileFilter() {
        this.setState({mobileFilterOn: !this.state.mobileFilterOn} , () => {
            this.forceUpdate();
        });
    }


    componentWillMount() {
       this.props.setFilters(this.state.query , this.props.type == 'scout' ? 'scout' : '');
    }

    render() {
        const {classes , width} = this.props;

        return (<div className={classes.root}>

                <Hidden xsDown><header className={classes.header}>
                    <div className={classNames(classes.content , classes.noMargin)}>
                        <Tabs index={this.state.activeTab}   indicatorClassName="indicatorxsDown"	 textColor={'#cbcbcb'}  onChange={this.handleChange} width={this.state.width}>
                            <Tab label={<Typography type={"title"} className={classNames(this.state.activeTab === 0 ? classes.activeTab : classes.tabColor)}>Players</Typography>}   className={classes.navItem} />
                            <Tab label={<Typography type={"title"} className={classNames(this.state.activeTab === 1 ? classes.activeTab : classes.tabColor)}>Scouts</Typography>} className={classes.navItem} />
                        </Tabs>
                    </div>

                    <div className={classNames(classes.content)}>
                        {this.props.type === 'scout' && <ScoutFilter leagues={this.props.leagues}
                                                                     leagueOptions={this.props.leagueOptions}
                                                                     levels={this.props.levels}
                                                                     levelOptions={this.props.levelOptions ? this.props.levelOptions : []}
                                                                     teams={this.props.teams}
                                                                     teamOptions={this.props.teamOptions}
                                                                     filterScouts={this.props.filterScouts}
                                                                     activePage={this.state.activePage}
                                                                     query={this.state.query}
                                                                     clearFilters={this.state.clearFilters}
                                                                     stopClearing={this.stopClearing}
                                                                     page={this.state.pageCurrentPosition ? this.state.pageCurrentPosition : 1 }


                                                                     filters={this.props.filters && this.props.filters.scout ? this.props.filters.scout : {}}
                                                                     setFilters={this.props.setFilters}
                        />}

                        {this.props.type === 'player' && <PlayerFilter leagues={this.props.leagues}
                                                                       leagueOptions={this.props.leagueOptions}
                                                                       levels={this.props.levels}
                                                                       levelOptions={this.props.levelOptions ? this.props.levelOptions : []}
                                                                       teams={this.props.teams}
                                                                       teamOptions={this.props.teamOptions}
                                                                       filterPlayers={this.props.filterPlayers}
                                                                       activePage={this.state.activePage}
                                                                       query={this.state.query}
                                                                       clearFilters={this.state.clearFilters}
                                                                       stopClearing={this.stopClearing}
                                                                       page={this.state.pageCurrentPosition ? this.state.pageCurrentPosition : 1 }

                                                                       filters={this.props.filters && this.props.filters.player ? this.props.filters.player : {}}
                                                                       setFilters={this.props.setFilters}
                        />}
                    </div>
                </header></Hidden>

            <Hidden smUp>
                <div className={classNames(classes.headerWholeBackground , this.state.direction === 'top' && this.state.lastScrollPos > fixedMainNavigationTrashold && this.state.mobileFilterOn ? classes.fixNav : null)}>
                    <div className={classes.line}></div>
                </div>
            </Hidden>
            <Hidden smUp>
                <div className={classNames(classes.headerMobNav , this.state.direction === 'top' && this.state.lastScrollPos > fixedMainNavigationTrashold && this.state.mobileFilterOn ? classes.headerMobNavFix : null)}>
                    <Tabs index={this.state.activeTab} onChange={this.handleChange} className={classes.navigationWrapper}
                          centered classes={{flexContainer : classes.headerMobCointainer}} textColor='#ffffff' indicatorColor={'#ffffff'}>
                        <Tab label={<Typography type='body2' className={classNames(classes.headerMobTab, classes.firstMobTab)}>Players</Typography>} style={{marginRight: 100}}/>
                        <Tab label={<Typography type='body2' className={classes.headerMobTab}>Scouts</Typography>} />
                    </Tabs>
                </div>
            </Hidden>
            <Hidden smUp>
                <div className={classNames(classes.filterTogglerConntainer ,  this.state.direction === 'top' && this.state.lastScrollPos > fixedMainNavigationTrashold  && this.state.mobileFilterOn ? classes.filterTogglerConntainerFix : null)}>
                    <Button className={classes.buttonFilter} onClick={this.toggleMobileFilter}>
                        <Typography  className={classes.filterTitle}>Filter ({this.props.type === 'player' ? this.state.appliedFilters.playerFilters : this.state.appliedFilters.scoutFilters})</Typography>
                        {this.state.mobileFilterOn && <Icon className={classes.arrow}>keyboard_arrow_down</Icon>}
                        {!this.state.mobileFilterOn && <Icon className={classes.arrow}>keyboard_arrow_up</Icon>}
                    </Button>
                    {!this.state.mobileFilterOn && <Button className={classes.clearFilters} onClick={this.onClearFilters}>
                        <Typography className={classes.clearFilterTypography}>Clear All</Typography>
                    </Button>}
                </div>
            </Hidden>

            {(!this.state.mobileFilterOn && (width === 'sm' || width === 'xs')) && <Hidden smUp>
                <div>
                    {this.props.type === 'scout' && <ScoutFilter leagues={this.props.leagues}
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
                                                                 page={this.state.pageCurrentPosition ? this.state.pageCurrentPosition : 1 }

                                                                 filters={this.props.filters && this.props.filters.scout ? this.props.filters.scout : {}}
                                                                 setFilters={this.props.setFilters}
                    />
                    }

                    {this.props.type === 'player' && <PlayerFilter leagues={this.props.leagues}
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
                                                                   page={this.state.pageCurrentPosition ? this.state.pageCurrentPosition : 1 }


                                                                   filters={this.props.filters && this.props.filters.player ? this.props.filters.player : {}}
                                                                   setFilters={this.props.setFilters}
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
                    />
                }
                {this.props.type === 'scout' &&
                    <Scouts scouts={this.props.results}
                            total={this.props.headers ? this.props.headers.count : 0}/>
                }
            </div>}

            {this.state.mobileFilterOn && this.props.headers && parseInt(this.props.headers.pageCount) > 1 && <footer className={classes.footer}>
                <Pagination currentPage={this.state.pageCurrentPosition ? parseInt(this.state.pageCurrentPosition) : 1} total={this.props.headers ? parseInt(this.props.headers.count) : 0}  perPage={18} onChange={this.changePagination}  />
            </footer>}

        </div>)
    }
}

Search.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    width: PropTypes.string,
};

export default compose(withStyles(styleSheet), withWidth())(Search);