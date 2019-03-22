import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { userLogin } from '../../../actions/LogInActions'
import { connect } from 'react-redux'
import './LogIn.scss'
import FacebookLogin from 'react-facebook-login';

class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            password: ''
        }
    }

    onIDChanged(e) {
        this.setState({ ID: e.target.value});
    }

    onPasswordChanged(e) {
        this.setState({ password: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault()
        let data = {
            userid: this.state.ID,
            password: this.state.password
        }
        var request = new Request('http://localhost:3001/api/userverify', {
            method: 'POST',
            headers: new Headers({ 'Content-Type' : 'application/json'}),
            body: JSON.stringify(data)
        })
        fetch(request)
            .then(response => ( response.json() ))
                .then( data => {
                    console.log(data);
                    if(data.message === 'Can not find user')
                    {
                        alert('ID or password is wrong!')
                        this.props.history.push('/login');
                    }
                    else
                    {
                        this.props.userLogin();
                        this.props.history.push('/home')
                    }
                })
            .catch((err) => {
                console.log(err);
            });
    };

    onAddUser(e) {
        e.preventDefault();
        this.props.history.push('/register')
    }

    responseFacebook = (response) => {
        if(response.name !== '')
        {
            this.props.userLogin();
            this.props.history.push('/home')
        }
    }

    render () {
        const { ID, password } = this.state;
        return (
            <div key="1" className="container-fluid" id="login">
				<form className="login-form">
					<h3 className="center">User LogIn</h3>
                    <TextField
                        id="userID"
                        placeholder="Enter your ID"
                        margin="normal"
                        fullWidth={true}
                        onChange={this.onIDChanged.bind(this)}
                    />
					<TextField
                        id="password"
                        placeholder="Enter you password"
                        type="password"
                        margin="normal"
                        fullWidth={true}
                        onChange={this.onPasswordChanged.bind(this)}
                    />
    			   
                    <Button variant="contained"  color="default" disabled={ID==='' || password === ''} onClick={this.onSubmit.bind(this)} className="action-btn">
                        CONNECT
                    </Button>
                   
                    <Button variant="contained"  color="primary" onClick={this.onAddUser.bind(this)} className="action-btn">
                        Sign Up
                    </Button>
                    <FacebookLogin
                        appId="2233783930275648"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                    />
				</form>
			</div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {  
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogin : () => { dispatch(userLogin()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
