import React from 'react';
import '../styles/games.css';

export default class GameList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {games: []};
    }
    componentDidMount() {
        let games = [];
        this.props.games.forEach(game => {
            games.push(<li key={game.id}>{game.title}</li>);
        });
        this.setState({games: games});
    }

    render() {
        return (
            {this.props.games.length > 0 ? <ul className='games'>{this.state.games}</ul> : <div className='games empty'>No games found.</div>}
        );
    }
}
