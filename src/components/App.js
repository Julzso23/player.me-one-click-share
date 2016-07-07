import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import Post from './Post';
import Login from './Login';
import Layout from './Layout';
import GameQuery from './GameQuery';
import Spinner from './Spinner';
import request from 'superagent';

export default class App extends React.Component {
    componentDidMount() {
        request
            .get('https://player.me/api/v1/users/default')
            .end((err, res) => {
                if (err || !res.ok || !res.body.success) {
                    browserHistory.push('login');
                } else {
                    browserHistory.push('post');
                }
            });
    }

    render() {
        return (
            <Router history={browserHistory}>
                <Route path='/' component={Layout}>
                    <Route path='post' component={Post}></Route>
                    <Route path='login' component={Login}></Route>
                    <Route path='check-in' component={GameQuery}></Route>
                </Route>
                <Route path='*' component={Spinner}></Route>
            </Router>
        );
    }
}
