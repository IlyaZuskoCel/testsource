/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */

import React, {Component} from 'react';
import {withWrapper} from "create-react-server/wrapper";
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {matchPath} from 'react-router'
import Profile from '../components/Profile';

import {getUser, sendEmail, getCurrent} from '../actions';
import {goBack} from '../../common/actions';
import {sharedCount, downloadVideo} from "../../video/actions";

const mapStateToProps = (state, props) => ({
    currentUser: state.user.current,
    user: state.user.user,
    id: props.match.params.id || state.user.current.id,
    isCurrent: state.user.current && state.user.user && state.user.user.id === state.user.current.id,
    token: state.common.cookies.token
});
const mapDispatchToProps = (dispatch) => ({
    fetchData: id => {
        dispatch(getUser(id));
    },
    sendEmail: (id, subject, text, token) => dispatch(sendEmail(id, subject, text, token)),
    goBack: () => dispatch(goBack()),
    sharedCount: (videoId, token) => dispatch(sharedCount(videoId, token)),
    downloadVideo: (video, token) => dispatch(downloadVideo(video, token)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    sendEmail: (id, subject, text) => dispatchProps.sendEmail(id, subject, text, stateProps.token),
});

class Wrap extends Component {
    static async getInitialProps({location, query, params, store}) {
        const match = matchPath(location.pathname, {
            path: '/profile/:id',
        });
        const state = store.getState();
        return await Promise.all([
            store.dispatch(getUser(match.params.id, state.common.cookies.token)),
            store.dispatch(getCurrent(state.common.cookies.token)),
        ])
    };

    render() {

        return <Profile {...this.props} />
    }
}

Wrap = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Wrap);

export default withWrapper(Wrap);