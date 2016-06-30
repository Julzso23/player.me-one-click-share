import React from 'react';
import request from 'superagent';
import Spinner from './Spinner';
import '../styles/post.css';

export default class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            maxLength: 0,
            loading: false
        };
        this.url = '';
        this.title = '';
    }

    componentDidMount() {
        this.setLoading(true);
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            this.setLoading(false);
            this.setState({maxLength: 4000 - tabs[0].url.length - 12});
            this.url = tabs[0].url;
            this.title = tabs[0].title;
        });
    }

    setLoading(value) {
        this.setState({loading: value});
        this.textArea.disabled = value;
        this.button.disabled = value;
    }

    post() {
        let value = `[${this.title}](${this.url})`;
        if (this.textArea.value !== '') value = this.textArea.value + ` [&nbsp;](${this.url})`;
        this.setLoading(true);
        request
            .post('https://player.me/api/v1/feed')
            .send({
                post: value
            })
            .end((err, res) => {
                this.setLoading(false);
                if (!err) {
                    this.textArea.value = '';
                }
            });
    }

    render() {
        return (
            <div className='post'>
                <textarea ref={component => this.textArea = component} maxLength={this.state.maxLength} placeholder='Say something about this page'></textarea>
                {this.state.loading ? <Spinner /> : null}
                <button ref={component => this.button = component} onClick={this.post.bind(this)}>Share this page</button>
            </div>
        );
    }
}
