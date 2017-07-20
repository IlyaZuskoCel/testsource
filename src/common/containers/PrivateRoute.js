/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */


import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import PrivateRoute from '../components/PrivateRoute';


const mapStateToProps = (state) => ({
    isAuthenticated: state.user.current !== null
});

export default withRouter(connect(mapStateToProps)(PrivateRoute))

