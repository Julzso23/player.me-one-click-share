import React from 'react';
import Navigation from './navigation';

export default class Layout extends React.Component {
    render() {
        return (
            <section>
                <Navigation />
                {this.props.children}
            </section>
        );
    }
}
