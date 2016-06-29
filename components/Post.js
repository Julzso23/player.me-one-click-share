import React from 'react';

export default class Post extends React.Component {
    render() {
        return (
            <div className='post'>
                <textarea placeholder='Say something about this page'></textarea>
                <button>Share to player.me</button>
            </div>
        );
    }
}
