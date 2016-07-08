import React from 'react';
import GameQuery from './GameQuery';
import GameList from './GameList';

export default class GameCheckIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            games: []
        };
    }

    render() {
        return (
            <div>
                <GameQuery setGames={games => this.setState({games: games})} />
                <GameList games={this.state.games} onSelect={game => console.log(game)} />
            </div>
        );
    }
}
