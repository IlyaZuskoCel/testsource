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
import {Link, Icon} from '../../../common/components';
import Pagination from '../../../common/components/Pagination';

import {withStyles, createStyleSheet} from 'material-ui/styles';
import defaultPhoto from './assets/images/default-photo.png';


import Players from './players';
import Scouts from './scouts'

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
}));


class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            players: null,
            scouts: null,
            activeTab: 0,
            activePage: 1,
        }

        this.handleChange = this.handleChange.bind(this);
        this.changePagination = this.changePagination.bind(this);
        this.uploadData = this.uploadData.bind(this);
    }

    componentDidMount() {
        this.props.upload({page : 2 , per_page : 16});
    }

    componentWillReceiveProps(nextProp) {

        console.log(nextProp);
        this.setState({results : nextProp.results , width: nextProp.width});

    }

    uploadData(value) {
        let params = {
            page: this.state.activePage,
            per_page: 16,
        };

        if (value === 0) {
            this.props.uploadPlayers(params);
        } else if (value === 1) {
            this.props.uploadScouts(params);
        }
    }


    handleChange(event , value) {
        this.setState({activeTab : value});
        this.uploadData(value);
    }

    changePagination(page) {
        this.setState({activePage : page} , () => {
            this.uploadData(this.state.activeTab);
        });
    }

    render() {
        const {classes} = this.props;

        return (<div className={classes.root}>
                <header className={classes.header}>
                    <div className={classes.content}>
                        <Tabs index={this.state.activeTab} indicatorColor="#d7001e"  textColor="#d7001e" onChange={this.handleChange} width={this.state.width}>
                            <Tab label="Players" />
                            <Tab label="Scouts" />
                        </Tabs>
                    </div>
                </header>

            {this.state.activeTab === 0 &&
                <Players players={this.state.results} />
            }
            {this.state.activeTab === 1 &&
                <Scouts scouts={this.state.results} />
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

};

export default compose(withStyles(styleSheet), withWidth())(Search);