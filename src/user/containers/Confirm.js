import React, {Component} from 'react';
import {connect} from 'react-redux';

import {confirm} from '../actions';


class Confirm extends Component {
    componentDidMount() {
        this.props.confirm(this.props.token)
    }

    render() {
        return null
    }
}


const mapStateToProps = (state, props) => ({
    token: props.match.params.token,
});
const mapDispatchToProps = (dispatch) => ({
    confirm: token => dispatch(confirm(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);