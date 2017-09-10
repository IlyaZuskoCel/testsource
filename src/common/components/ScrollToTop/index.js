/**
 * Created by aleksandr on 9/10/17.
 * moonion.com
 */

import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        return this.props.children
    }
}

export default withRouter(ScrollToTop)
