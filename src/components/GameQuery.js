import React from 'react';
import request from 'superagent';
import '../styles/form.css';

export default class GameQuery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {query: ''};
    }

    handleChange(event) {
        this.setState({query: event.target.value});
    }

    search() {
        event.preventDefault();

        request
            .get('https://player.me/api/v1/games')
            .query({_query: this.state.query})
            .end((err, res) => {
                console.log(res.body.results);
            });
    }

    render() {
        return (
            <form className='form' onSubmit={this.search.bind(this)}>
                <input value={this.state.query} onChange={this.handleChange.bind(this)} placeholder='Game name' />
                <button type='submit'>Search</button>
            </form>
        );
    }
}
