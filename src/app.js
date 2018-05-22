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




class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // if (!this.props.load)
        //     return null;

        return (
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
        );
    }

}


export default ({state, props}) => {
    return <App {...props}/>

};
