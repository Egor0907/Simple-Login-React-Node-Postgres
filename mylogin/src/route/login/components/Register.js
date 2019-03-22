import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './LogIn.scss'

class Register extends Component {

    constructor(props) {
        super(props);
        this.state  = {
            userid: '',
            email: '',
            password: ''
        }
    }

    onIDChanged(e) {
        this.setState({ userid: e.target.value});
    }

    onPasswordChanged(e) {
        this.setState({ password: e.target.value });
    }

    onEmailChanged(e)
    {
        this.setState({ email: e.target.value });
    }

    onSubmit(e)
    {
        e.preventDefault();
        const data = this.state;
        const rule = /^\S+@\S+\.\S+$/;
        if( ! data.email.match(rule))
        {
            alert('Please input valid email');
            return;
        }

        var request = new Request('http://localhost:3001/api/adduser', {
            method: 'POST',
            headers: new Headers({ 'Content-Type' : 'application/json'}),
            body: JSON.stringify(data)
        })
 
        fetch(request)
            .then(response => ( response.json() ))
                 .then( data => {
                     console.log(data);
                     if(data.message === 'Inserted')
                     {
                         this.props.history.push('/login')
                     }
                 })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const { ID, email, password } = this.state;
        return (
            <div key="1" className="container-fluid" id="login">
				<form className="login-form">
					<h3 className="center">Sign Up</h3>
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
                    <TextField
                        id="email"
                        placeholder="Enter you Email"
                        margin="normal"
                        fullWidth={true}
                        onChange={this.onEmailChanged.bind(this)}
                    />
    			    <p></p>
                    
                    <Button variant="contained"  color="primary" disabled={ID==='' || password === '' || email === ''} onClick={this.onSubmit.bind(this)}>
                        Connect
                    </Button>
				</form>
			</div>
        )
    }
}

export default Register;
