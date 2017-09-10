/**
 * Created by aleksandr on 9/10/17.
 * moonion.com
 */

import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        console.log(1);
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        console.log(323)
        return this.props.children
    }
}

export default withRouter(ScrollToTop)
