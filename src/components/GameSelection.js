import React from 'react';
import Error from './Error';
import Spinner from './Spinner';
import request from 'superagent';
import '../styles/games.css';
import 'font-awesome/css/font-awesome.css';

export default class GameSelection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            text: '',
            loading: false
        };
    }

    post() {
        this.setState({loading: true});
        request
            .post('https://player.me/api/v1/feed')
            .send({
                post: this.state.text,
                game_id: this.props.game.id
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

                <div className='games selection'>
                    <span className='name'>{this.props.game.title}</span>
                    {!this.state.loading ? <span className='fa fa-times remove' onClick={this.props.onComplete}></span> : null}
                </div>

                <textarea disabled={this.state.loading}
                          maxLength={4000}
                          value={this.state.text}
                          onChange={event => this.setState({text: event.target.value})}
                          placeholder='Say something about this game (Optional)'>
                </textarea>

                {this.state.loading ? <Spinner /> : null}
                <button disabled={this.state.loading} onClick={this.post.bind(this)}>Check-in</button>
            </div>
        );
    }
}
