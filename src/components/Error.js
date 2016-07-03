import React from 'react';
import '../styles/error.css';

export default class Error extends React.Component {
    render() {
        return (
            <div className='error'>{this.props.children}</div>
        );
    }
}
