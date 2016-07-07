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
            rePost: false,
            url: '',
            title: '',
            text: '',
            error: ''
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            request
                .get('https://player.me/api/v1/users/default/activities')
                .end((err, res) => {
                    if (res.ok && res.body.success) {
                        res.body.results.forEach(post => {
                            if (post.data.post_raw.indexOf(tabs[0].url) > -1) {
                                this.setState({
                                    loading: false,
                                    rePost: true
                                });
                            }
                        });

                        if (!this.state.rePost) {
                            this.setState({
                                loading: false,
                                maxLength: 4000 - tabs[0].url.length - 12,
                                url: tabs[0].url,
                                title: tabs[0].title
                            });
                        }
                    }
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

                {this.state.rePost ? <Error>You've already shared this page!</Error> : null}

                <textarea disabled={this.state.loading || this.state.rePost}
                          maxLength={this.state.maxLength}
                          value={this.state.text}
                          onChange={this.handleChange.bind(this)}
                          placeholder='Say something about this page (Optional)'>
                </textarea>

                {this.state.loading ? <Spinner /> : null}
                <button disabled={this.state.loading || this.state.rePost} onClick={this.post.bind(this)}>Share this page</button>
            </div>
        );
    }
}

export default withRouter(Post);
