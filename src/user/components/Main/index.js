import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Tabs, {Tab} from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Card, {CardMedia} from 'material-ui/Card';
import Register from '../../containers/Register';
import Login from '../../containers/Login';

const styleSheet = createStyleSheet('Main', theme => ({
    root: {
        backgroundColor: '#ffffff',
        marginTop: 100,
        left: '40%',
        [theme.breakpoints.up('sm')]: {
            position: 'inherit',
            width: 600,
            left: '30%',
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
console.log(props)
        this.state = {
            index: 1,
            username: '',
            password: '',
            errors: [],
            value: 'registration',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
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
    }

    render() {
        const {classes} = this.props;
        const {value} = this.state;
        return (<div className={classes.root}>
            <Tabs className={classes.header} index={this.state.index} onChange={this.handleChangeTab}>
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
                <Register/>
            </TabContainer>}

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