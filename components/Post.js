import React from 'react';
import request from 'superagent';

export default class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state={maxLength: 0};
        this.url = '';
        this.title = '';
    }

    componentDidMount() {
        this.textArea.disabled = true;
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            this.textArea.disabled = false;
            this.setState({maxLength: 4000 - tabs[0].url.length - 12});
            this.url = tabs[0].url;
            this.title = tabs[0].title;
        });
    }

    post() {
        let value = `[${this.title}](${this.url})`;
        if (this.textArea.value !== '') value = this.textArea.value + ` [&nbsp;](${this.url})`;
        request
            .post('https://player.me/api/v1/feed')
            .send({
                post: value
            })
            .end((err, res) => {});
    }

    render() {
        return (
            <div className='post'>
                <textarea ref={component => this.textArea = component} maxLength={this.state.maxLength} placeholder='Say something about this page'></textarea>
                <button onClick={this.post.bind(this)}>Share this page</button>
            </div>
        );
    }
}
