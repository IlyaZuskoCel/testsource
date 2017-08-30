/**
 * Created by aleksandr on 8/28/17.
 * moonion.com
 */

import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import ReportButton from '../components/ReportButton';

import {report} from '../actions';

const mapStateToProps = (state, props) => ({});
const mapDispatchToProps = (dispatch) => ({
    report: (id, type, message) => dispatch(report(id, type, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportButton)