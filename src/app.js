import React, {Component} from 'react';
import {WrapperProvider, withWrapper} from "create-react-server/wrapper";
import {Switch} from 'react-router';
import {withRouter} from 'react-router-dom'
import {Provider, connect} from 'react-redux';
import ScrollToTop from './common/components/ScrollToTop';

import CommonRouters from './common';
import UserRouters from './user';
import VideoRouters from './video';
import SearchRouters from './search';
import {getCurrent as getCurrentUser} from './user/actions'

const mapStateToProps = (state) => ({
    load: state.common.load
});

const mapDispatchToProps = (dispatch) => ({
    getCurrentUser: () => dispatch(getCurrentUser()),
});

class Layout extends Component {
    static async getInitialProps({location, query, params, store}) {
        await store.dispatch(getCurrentUser());
    };

    render() {
        return  <ScrollToTop>
            <Switch>
                {VideoRouters}
                {UserRouters}
                {SearchRouters}
                {CommonRouters}

            </Switch>
        </ScrollToTop>
    }
}

const LayoutRedux = withRouter(connect(mapStateToProps, mapDispatchToProps)(withWrapper(Layout)));


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // if (!this.props.load)
        //     return null;

        return (
                <WrapperProvider initialProps={this.props}>
                    <LayoutRedux/>
                </WrapperProvider>
        );
    }

}


export default ({state, props}) => {
    return <App {...props}/>

};
