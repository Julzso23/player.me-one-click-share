import React from 'react';
import GameSelection from './GameSelection';
import GameQuery from './GameQuery';
import GameList from './GameList';

export default class GameCheckIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            games: [],
            selection: null
        };
    }

    render() {
        if (this.state.selection) {
            return (
                <GameSelection game={this.state.selection} onComplete={() => this.setState({selection: null})} />
            );
        } else {
            return (
                <div>
                    <GameQuery setGames={games => this.setState({games: games})} />
                    <GameList games={this.state.games} onSelect={game => this.setState({selection: game})} />
                </div>
            );
        }
    }
}
