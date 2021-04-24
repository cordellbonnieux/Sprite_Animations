import _ from 'lodash';

function canvas() {
    let canvas = document.createElement('canvas');
    canvas.id = 'canvas1';
    return canvas
}

document.getElementById('root').appendChild(canvas())
import css from './style.css';