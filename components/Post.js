import React from 'react';
import request from 'superagent';
import Spinner from './Spinner';
import Error from './Error';
import {withRouter} from 'react-router';
import '../styles/form.css';

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            maxLength: 0,
            loading: false,
            url: '',
            title: '',
            text: '',
            error: ''
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
                if (res.ok && res.body.success) {
                    this.setState({text: ''});
                } else if (err.status === 403) {
                    this.props.router.push('login');
                } else {
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

export default withRouter(Post);
