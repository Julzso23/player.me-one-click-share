import React from 'react';
import '../styles/games.css';

export default class GameList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {games: []};
    }

    componentWillReceiveProps(nextProps) {
        let games = [];
        nextProps.games.forEach(game => {
            games.push(<li key={game.id}>{game.title}</li>);
        });
        this.setState({games: games});
    }

    render() {
        if (this.props.games.length > 0) {
            return (
                <ul className='games'>{this.state.games}</ul>
            );
        } else {
            return (
                <div className='games empty'>No games found.</div>
            );
        }
    }
}
