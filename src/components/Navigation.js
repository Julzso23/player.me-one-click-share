import React from 'react';
import {Link} from 'react-router';
import '../styles/navigation.css';

export default class Navigation extends React.Component {
    render() {
        return (
            <nav className='navigation'>
                <Link activeClassName='active' to='post'>Share page</Link>
                <Link activeClassName='active' to='check-in'>Check-in game</Link>
            </nav>
        );
    }
}
