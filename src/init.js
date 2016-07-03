import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import './styles/body.css';

import './images/logo-icon-128.png';
import './images/logo-icon-16.png';
import './manifest.json';

render(<App />, document.getElementById('app'));
