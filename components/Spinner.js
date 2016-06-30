import React from 'react';
import '../styles/spinner.css';

export default class Spinner extends React.Component {
    render() {
        return (
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
        );
    }
}
