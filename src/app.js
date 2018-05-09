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

import Theme from './theme';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getCurrentUser();
    }

    render() {
        if (!this.props.load)
            return null;

        return (
            <Theme>
                <WrapperProvider initialProps={this.props}>
                    <ScrollToTop>
                        <Switch>
                            {VideoRouters}
                            {UserRouters}
                            {SearchRouters}
                            {CommonRouters}
                        </Switch>
                    </ScrollToTop>
                </WrapperProvider>
            </Theme>
        );
    }

}


const mapStateToProps = (state) => ({
    load: state.common.load
});

const mapDispatchToProps = (dispatch) => ({
    getCurrentUser: () => dispatch(getCurrentUser()),
});

const Wrap = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export default ({state, props}) => {

    return <Wrap {...props}/>

};
