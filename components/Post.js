import React from 'react';
import request from 'superagent';
import Spinner from './Spinner';
import {browserHistory} from 'react-router';
import '../styles/form.css';

export default class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            maxLength: 0,
            loading: false,
            url: '',
            title: '',
            text: ''
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            this.setState({
                loading: false,
                maxLength: 4000 - tabs[0].url.length - 12,
                url: tabs[0].url,
                title: tabs[0].title
            });
        });
    }

    handleChange(event) {
        this.setState({text: event.target.value});
    }

    post() {
        let value = `[${this.state.title}](${this.state.url})`;
        if (this.state.text !== '') value = this.state.text + ` [&nbsp;](${this.state.url})`;
        this.setState({loading: true});
        request
            .post('https://player.me/api/v1/feed')
            .send({
                post: value
            })
            .end((err, res) => {
                this.setState({loading: false});
                if (!err) {
                    this.setState({text: ''});
                } else if (err.status === 403) {
                    browserHistory.push('login');
                }
            });
    }

    render() {
        return (
            <div className='form'>
                <textarea disabled={this.state.loading}
                          maxLength={this.state.maxLength}
                          value={this.state.text}
                          onChange={this.handleChange.bind(this)}
                          placeholder='Say something about this page'>
                </textarea>

                {this.state.loading ? <Spinner /> : null}
                <button disabled={this.state.loading} onClick={this.post.bind(this)}>Share this page</button>
            </div>
        );
    }
}
