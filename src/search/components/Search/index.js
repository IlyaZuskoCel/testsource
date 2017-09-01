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
import {Link, Icon, Pagination , Autosuggest} from '../../../common/components';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import defaultPhoto from './assets/images/default-photo.png';

import Players from './players';
import Scouts from './scouts';
import ScoutFilter from './scoutFilter';
import PlayerFilter from './playerFilter';

import queryString from 'query-string';
import './assets/style.css';

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

        [theme.breakpoints.down('sm')]: {
            padding: [56 , 0],
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
        zIndex: 5,
    },

    headerMobNav: {
        position: 'relative',
        left: 0,
        top: 0,
        heigth: 52,
        minHeight: 52,
        width: '100%',
        backgroundImage: 'linear-gradient(295deg, #f55e58, #c9011b)',
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
        backgroundImage: 'linear-gradient(295deg, #f55e58, #c9011b)',
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
    }

}));

const splitSearchQuery = (q) => {
    let result = {};

    q.slice(1).split('&').map(item => {
        let splitItem = item.split('=');
        result[splitItem[0]] = splitItem[1];
    });

    return result;
}

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab:  this.props.type && this.props.type === 'scout' ? 1 : 0,
            activePage: 1,
            query: queryString.parse(this.props.location.search),
            numberOfResults: 0,
        }

        this.handleChange = this.handleChange.bind(this);
        this.changePagination = this.changePagination.bind(this);

    }

    componentDidMount() {
        this.props.upload(this.props.type , {page : 1 , 'per-page' : 18 , ...this.state.query});
        this.props.fetchData();
    }

    componentWillReceiveProps(nextProps) {

        if ('query' in nextProps) {
            let parsedQuery = queryString.parse(nextProps.query);

            this.setState({query : parsedQuery});
        }
    }

    handleChange(event , value) {
            this.setState({activeTab : value} , ()  => {
                this.props.go(value === 1 ? '/search/scout' : '/search/player');
                this.props.upload(value === 1 ? 'scout' : 'player' , {page : 1 , 'per-page' : 18});
            });
    }

    changePagination(page) {
        this.setState({activePage : page} , () => {
           this.props.upload(this.props.type , {page : page , 'per-page': 18 , ...this.state.query});
        });

        window.scroll(0 , 0);
    }

    render() {
        const {classes} = this.props;

        return (<div className={classes.root}>

                <Hidden xsDown><header className={classes.header}>
                    <div className={classNames(classes.content , classes.noMargin)}>
                        <Tabs index={this.state.activeTab}   indicatorClassName="indicatorxsDown"	 textColor={'#cbcbcb'}  onChange={this.handleChange} width={this.state.width} >
                            <Tab label={<Typography type={"title"} className={classNames(this.state.activeTab === 0 ? classes.activeTab : classes.tabColor)}>Players</Typography>}   className={classes.navItem} />
                            <Tab label={<Typography type={"title"} className={classNames(this.state.activeTab === 1 ? classes.activeTab : classes.tabColor)}>Scouts</Typography>} className={classes.navItem} />
                        </Tabs>
                    </div>

                    <div className={classNames(classes.content)}>
                        {this.props.type === 'scout' && <ScoutFilter leagues={this.props.leagues}
                                                                     leagueOptions={this.props.leagueOptions}
                                                                     teams={this.props.teams}
                                                                     teamOptions={this.props.teamOptions}
                                                                     filterScouts={this.props.filterScouts}
                                                                     activePage={this.state.activePage}/>}

                        {this.props.type === 'player' && <PlayerFilter leagues={this.props.leagues}
                                                                       leagueOptions={this.props.leagueOptions}
                                                                       teams={this.props.teams}
                                                                       teamOptions={this.props.teamOptions}
                                                                       filterPlayers={this.props.filterPlayers}
                                                                       activePage={this.state.activePage}/>}
                    </div>
                </header></Hidden>

            <Hidden smUp>
                    <div className={classes.headerBackground}></div>
            </Hidden>
            <Hidden smUp>
                <div className={classes.headerMobNav}>
                    <Tabs index={this.state.activeTab} onChange={this.handleChange} className={classes.navigationWrapper}
                          centered classes={{flexContainer : classes.headerMobCointainer}}>
                        <Tab label={<Typography type='body2' className={classNames(classes.headerMobTab, classes.firstMobTab)}>Players</Typography>} style={{marginRight: 100}}/>
                        <Tab label={<Typography type='body2' className={classes.headerMobTab}>Scouts</Typography>} />
                    </Tabs>
                </div>
            </Hidden>
            <Hidden smUp>
                <div className={classes.filterTogglerConntainer}>
                    <Button className={classes.buttonFilter}>Filters</Button>
                </div>
            </Hidden>

            <div className={classes.containerWrapper}>
                {this.props.type === 'player' &&
                    <Players players={this.props.results} total={this.props.headers ? this.props.headers.count : 0} role={this.props.currentUser ? this.props.currentUser.role : ''} follow={this.props.follow}/>
                }
                {this.props.type === 'scout' &&
                    <Scouts scouts={this.props.results} total={this.props.headers ? this.props.headers.count : 0}/>
                }
            </div>

            <footer className={classes.footer}>
                <Pagination currentPage={this.props.headers ? parseInt(this.props.headers.page) : 1} total={this.props.headers ? parseInt(this.props.headers.count) : 0}  perPage={18} onChange={this.changePagination}  />
            </footer>

        </div>)
    }
}

Search.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    width: PropTypes.string,

};

export default compose(withStyles(styleSheet), withWidth())(Search);