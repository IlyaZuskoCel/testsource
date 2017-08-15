import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Tabs, {Tab} from 'material-ui/Tabs';
// import AppBar from 'material-ui/AppBar';
// import Paper from 'material-ui/Paper';
// import Button from 'material-ui/Button';
// import FormControl from 'material-ui/Form/FormControl';
// import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import Card, {CardMedia} from 'material-ui/Card';
import PlayerForm from '../Register/PlayerForm';
import Login from '../Login/index';
//import PlayerForm from './PlayerForm';
//import ScoutForm from './PlayerForm';
//import {Link} from '../../../common/components';

const styleSheet = createStyleSheet('Main', theme => ({
    root: {
        backgroundColor: '#ffffff',
        marginTop: 100,
        [theme.breakpoints.up('sm')]: {
            position: 'relative',
            width: 600,
            left: '50%',
            marginLeft: -300,
            alignItems: 'center'

        },

    },
    header: {
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },

}));

function TabContainer(props) {
    return (
        <div style={{padding: 20}}>
            {props.children}
        </div>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 1,
            username: '',
            password: '',
            errors: [],
            value: 'registration',
        };

        //this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
    }

    componentDidMount() {
        this.props.goRegister();
    }

    handleChangeTab(event, index) {
        this.setState({index});
        if (index === 1) {
            this.props.goRegister();
            this.setState({value: 'registration'})
        }
        if (index === 0) {
            this.props.goLogin();
            this.setState({value: 'login'})
        }

    }

    handleChange(name) {
        return event => this.setState({[name]: event.target.value});
        console.log('name', name);
    }

    // handleSubmit(e) {
    //     e.preventDefault();
    //     if (!this.state.username)
    //         return this.setState({errors: ['username']});
    //
    //     if (!this.state.password)
    //         return this.setState({errors: ['password']});
    //
    //     this.props.logIn(this.state.username, this.state.password);
    //     return false;
    // }

    render() {
        const {classes} = this.props;
        const {value} = this.state;
        return (<div className={classes.root}>
            <Tabs index={this.state.index} onChange={this.handleChangeTab}>
                <Tab value="login" label={
                    <Typography style={{color: '#d7001e'}} type="body2">
                        Log In
                    </Typography>
                }>

                </Tab>
                <Tab value="registration" label={
                    <Typography style={{color: '#d7001e'}} type="body2">
                        Sign up
                    </Typography>
                }>

                </Tab>
            </Tabs>
            {value === 'login' &&
            <TabContainer>
                <Login/>
            </TabContainer>}
            {value === 'registration' &&
            <TabContainer>
                <PlayerForm/>
            </TabContainer>}

            {/*{this.state.index === 0 && <PlayerForm onSubmit={this.props.registerPlayer}/>}*/}
            {/*{this.state.index === 1 && <ScoutForm onSubmit={this.props.registerScout}/>}*/}

            {/*<Card className={classes.card}>*/}
            {/*<CardMedia className={classes.media}  title="Contemplative Reptile"/>*/}

            {/*</Card>*/}

        </div>);
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Main);