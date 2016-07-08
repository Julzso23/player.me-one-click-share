import React from 'react';
import Spinner from './Spinner';
import GameList from './GameList';
import request from 'superagent';
import {debounce} from 'throttle-debounce';
import '../styles/form.css';

export default class GameQuery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            loading: false
        };

        this.query = debounce(500, this.query);
    }

    handleChange(event) {
        event.persist();
        this.setState({query: event.target.value});
        if (this.state.query === '') {
            this.props.setGames([]);
        }

        this.query();
    }

    query(event) {
        if (this.state.query !== '') {
            this.setState({loading: true});

            request
                .get('https://player.me/api/v1/games')
                .query({_query: this.state.query})
                .end((err, res) => {
                    this.setState({loading: false});
                    this.props.setGames(res.body.results);
                });
        }
    }

    render() {
        return (
            <form className='form' onSubmit={event => event.preventDefault()}>
                <input value={this.state.query} onChange={this.handleChange.bind(this)} type='text' placeholder='Game name' />
                {this.state.loading ? <Spinner /> : null}
            </form>
        );
    }
}
