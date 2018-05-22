/**
 * Created by aleksandr on 8/28/17.
 * moonion.com
 */

import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import ReportButton from '../components/ReportButton';

import {report} from '../actions';

const mapStateToProps = (state, props) => ({
    token: state.common.cookies.token,
});
const mapDispatchToProps = (dispatch) => ({
    report: (id, type, message, token) => dispatch(report(id, type, message, token)),
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    report: (id, type, message) => dispatchProps.report(id, type, message, stateProps.token),
});
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ReportButton)