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
            games.push(<li key={game.id} data-id={game.id} onClick={this.handleClick.bind(this)}>{game.title}</li>);
        });
        this.setState({games: games});
    }

    handleClick(event) {
        this.props.onSelect(this.props.games.find(game => game.id === Number(event.target.dataset.id)));
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
