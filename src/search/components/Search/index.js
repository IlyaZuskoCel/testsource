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

import {withStyles, createStyleSheet} from 'material-ui/styles';
import defaultPhoto from './assets/images/default-photo.png';

import Players from './players';
import Scouts from './scouts';
import ScoutFilter from './scoutFilter';


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
        marginTop: 44,
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: [70, 0],
    },

    tabs: {
      fontSize: 40,
    },
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
            DropdownValue: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.changePagination = this.changePagination.bind(this);
    }

    componentDidMount() {
       this.props.upload(this.props.type , {page : 1 , per_page : 16});
       this.props.getLeagues();
    }

    handleChange(event , value) {
            this.setState({activeTab : value} , ()  => {
                this.props.history.push(value === 1 ? '/search/scout' : '/search/player');
                this.props.upload(value === 1 ? 'scout' : 'player' , {page : 1});
            });
    }

    changePagination(page) {
        this.setState({activePage : page} , () => {
           this.props.upload(this.props.type , {page : page , per_page: 16});
        });
    }

    render() {
        const {classes} = this.props;

        return (<div className={classes.root}>
                <header className={classes.header}>
                    <div className={classes.content}>
                        <Tabs index={this.state.activeTab} indicatorColor="#d7001e"  textColor="#d7001e" onChange={this.handleChange} width={this.state.width} className={classes.tabs}>
                            <Tab label="Players" />
                            <Tab label="Scouts" />
                        </Tabs>
                    </div>

                    {/*<div className={classes.content}>*/}
                        {/*{this.props.type === 'player' && <ScoutFilter />}*/}
                    {/*</div>*/}

                </header>

            {this.props.type === 'player' &&
                <Players players={this.props.results} />
            }
            {this.props.type === 'scout' &&
                <Scouts scouts={this.props.results} />
            }

            <footer className={classes.footer}>
                <Pagination currentPage={this.state.activePage} total={5}  perPage={16} onChange={this.changePagination} width={this.state.width} />
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