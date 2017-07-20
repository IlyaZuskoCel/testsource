/**
 * Created by aleksandr on 7/20/17.
 * moonion.com
 */


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import FormControl from 'material-ui/Form/FormControl';
import TextField from 'material-ui/TextField';


const styleSheet = createStyleSheet('PlayerForm', theme => ({

    form: {
        flexGrow: 1,
        padding: 10
    },
    formControl: {
        width: '100%',
    }
}));


class PlayerForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            phone: '',
            username: '',
            email: '',
            password: '',
            password_repeat: '',
            errors: []
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(name) {
        return event => this.setState({[name]: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.first_name)
            return this.setState({errors: ['first_name']});

        if (!this.state.last_name)
            return this.setState({errors: ['last_name']});

        if (!this.state.phone)
            return this.setState({errors: ['phone']});

        if (!this.state.username)
            return this.setState({errors: ['username']});

        if (!this.state.email)
            return this.setState({errors: ['email']});

        if (!this.state.password)
            return this.setState({errors: ['password']});

        if (!this.state.password_repeat)
            return this.setState({errors: ['password_repeat']});

        if (this.state.password !== this.state.password_repeat)
            return this.setState({errors: ['password_repeat', 'password']});

        this.props.onSubmit(this.state);
        return false;
    }

    render() {
        const classes = this.props.classes;

        return <form className={classes.form} onSubmit={this.handleSubmit}>

            <Grid container gutter={24}>
                <Grid item xs={12} sm={4}>
                    <TextField id="first_name"
                               required
                               error={this.state.errors.indexOf('first_name') > -1}
                               label="First Name"
                               value={this.state.first_name}
                               onChange={this.handleChange('first_name')}
                               className={classes.formControl}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField id="last_name"
                               required
                               error={this.state.errors.indexOf('last_name') > -1}
                               label="Last Name"
                               value={this.state.last_name}
                               onChange={this.handleChange('last_name')}
                               className={classes.formControl}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField id="username"
                               required
                               error={this.state.errors.indexOf('username') > -1}
                               label="Username"
                               value={this.state.username}
                               onChange={this.handleChange('username')}
                               className={classes.formControl}
                    />
                </Grid>
            </Grid>
            <Grid container gutter={24}>
                <Grid item xs={12} sm={6}>
                    <TextField id="phone"
                               required
                               error={this.state.errors.indexOf('phone') > -1}
                               label="Phone"
                               value={this.state.phone}
                               onChange={this.handleChange('phone')}
                               className={classes.formControl}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="email"
                               required
                               type="email"
                               error={this.state.errors.indexOf('email') > -1}
                               label="Email"
                               value={this.state.email}
                               onChange={this.handleChange('email')}
                               className={classes.formControl}
                    />
                </Grid>
            </Grid>
            <Grid container gutter={24}>
                <Grid item xs={12} sm={6}>
                    <TextField id="password"
                               type="password"
                               required
                               error={this.state.errors.indexOf('password') > -1}
                               label="Password"
                               value={this.state.password}
                               onChange={this.handleChange('password')}
                               className={classes.formControl}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="password_repeat"
                               type="password"
                               required
                               error={this.state.errors.indexOf('password_repeat') > -1}
                               label="Confirm Password"
                               value={this.state.password_repeat}
                               onChange={this.handleChange('password_repeat')}
                               className={classes.formControl}
                    />
                </Grid>
            </Grid>
            <Grid container gutter={24}>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl className={classes.formControl}>
                        <Button raised type="submit" color="primary" className={classes.button}>
                            Register
                        </Button>
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    }
}

PlayerForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PlayerForm);