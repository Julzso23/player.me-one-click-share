import React from 'react';
import request from 'superagent';
import Spinner from './Spinner';
import '../styles/form.css';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            loading: false
        };
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    login() {
        this.setState({loading: true});
        request
            .post('https://player.me/api/v1/auth/login')
            .send({
                login: this.state.name,
                password: this.state.password
            })
            .end((err, req) => {
                this.setState({loading: false});
                this.setState({password: ''});
            });
    }

    render() {
        return (
            <div className='form'>
                <input value={this.state.name} onChange={this.handleChange.bind(this)} disabled={this.state.loading} name='name' type='text' placeholder='Username or email' />
                <input value={this.state.password} onChange={this.handleChange.bind(this)} disabled={this.state.loading} name='password' type='password' placeholder='Password' />
                {this.state.loading ? <Spinner /> : null}
                <button onClick={this.login.bind(this)} disabled={this.state.loading}>Login</button>
            </div>
        );
    }
}
