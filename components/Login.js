import React from 'react';
import request from 'superagent';
import Spinner from './Spinner';
import Error from './Error';
import {withRouter} from 'react-router';
import '../styles/form.css';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            loading: false,
            error: ''
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
            .end((err, res) => {
                this.setState({loading: false});
                this.setState({password: ''});

                if (res.ok && res.body.success) {
                    this.props.router.push('post');
                }

                if (err || !res.ok || !res.body.success) {
                    this.error(res.body.results);
                }
            });
    }

    error(message) {
        this.setState({error: message});
        setTimeout(() => {
            this.setState({error: ''})
        }, 5000);
    }

    render() {
        return (
            <div className='form'>
                {this.state.error !== '' ? <Error>{this.state.error}</Error> : null}

                <input value={this.state.name} onChange={this.handleChange.bind(this)} disabled={this.state.loading} name='name' type='text' placeholder='Username or email' />
                <input value={this.state.password} onChange={this.handleChange.bind(this)} disabled={this.state.loading} name='password' type='password' placeholder='Password' />
                {this.state.loading ? <Spinner /> : null}
                <button onClick={this.login.bind(this)} disabled={this.state.loading}>Login</button>
            </div>
        );
    }
}

export default withRouter(Login);
