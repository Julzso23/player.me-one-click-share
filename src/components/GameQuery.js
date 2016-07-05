import React from 'react';
import Spinner from './Spinner';
import request from 'superagent';
import {debounce} from 'throttle-debounce';
import '../styles/form.css';
import '../styles/games.css';

export default class GameQuery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            games: [],
            loading: false
        };

        this.query = debounce(500, this.query);
    }

    handleChange(event) {
        event.persist();
        this.setState({query: event.target.value});

        this.query();
    }

    query(event) {
        if (this.state.query !== '') {
            this.setState({loading: true});
            
            request
                .get('https://player.me/api/v1/games')
                .query({_query: this.state.query})
                .end((err, res) => {
                    this.setState({
                        games: res.body.results,
                        loading: false
                    });
                });
        }
    }

    render() {
        let games = [];
        this.state.games.forEach(game => {
            games.push(<li key={game.id}>{game.title}</li>);
        });

        return (
            <div>
                <form className='form' onSubmit={event => event.preventDefault()}>
                    <input value={this.state.query} onChange={this.handleChange.bind(this)} type='text' placeholder='Game name' />
                    {this.state.loading ? <Spinner /> : null}
                </form>

                {this.state.query !== '' ? (games.length > 0 ? <ul className='games'>{games}</ul> : <div className='games empty'>No games found.</div>) : null}
            </div>
        );
    }
}
