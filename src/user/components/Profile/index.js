/**
 * Created by aleksandr on 7/19/17.
 * moonion.com
 */
import React, {Component} from 'react';

class Profile extends Component {
    render() {
        return <div>
            <h1>Profile: {this.props.user.full_name}</h1>
        </div>

    }
}

export default Profile;