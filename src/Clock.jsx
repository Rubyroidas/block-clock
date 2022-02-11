import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {observer} from 'mobx-react';

import {useStore} from './store';

import './Clock.scss';

function* arrayIterator(size) {
    for (let i = 0; i < size; i++) {
        yield i;
    }
}

const ClockColumn = ({size, offset}) => (
    <div className="column">
        <div className="moving-part" style={{transform: `translateY(${-4 * offset}rem)`}}>
            {[...arrayIterator(size)].map(i => (
                <div className={classNames('block', {current: i === offset})} key={i}>{i}</div>
            ))}
        </div>
        <div className="fisheye"/>
    </div>
);

const ORIENTATION_HOST = window;
const ORIENTATION_EVENT = 'deviceorientation';

export const Clock = observer(() => {
    const store = useStore();
    const [timestamp, setTimestamp] = useState(Date.now());
    const [orientation, setOrientation] = useState({x: 0, y: 0});
    const tick = () => {
        setTimestamp(Date.now());
    };
    const handleDeviceOrientationChange = e => {
        setOrientation({x: e.beta, y: -e.gamma});
    };

    useEffect(() => {
        const intervalId = setInterval(tick, 1000);

        ORIENTATION_HOST.addEventListener(ORIENTATION_EVENT, handleDeviceOrientationChange);

        return () => {
            clearInterval(intervalId);
            ORIENTATION_HOST.removeEventListener(ORIENTATION_EVENT, handleDeviceOrientationChange);
        };
    }, []);

    const d = new Date(timestamp);
    const hh = d.getHours();
    const hour1 = Math.floor(hh / 10);
    const hour2 = hh % 10;
    const mm = d.getMinutes();
    const min1 = Math.floor(mm / 10);
    const min2 = mm % 10;
    const ss = d.getSeconds();
    const sec1 = Math.floor(ss / 10);
    const sec2 = ss % 10;

    const actualOrientation = store.isDeviceOrientationLocked
        ? {x: 30, y: 30}
        : orientation;

    const style = {
        transform: `
            translate(-50%, -50%)
            perspective(60rem)
            rotateX(${actualOrientation.x}deg)
            rotateY(${actualOrientation.y}deg)
         `
    };

    return (
        <div className="row" style={style}>
            <ClockColumn size={3} offset={hour1}/>
            <ClockColumn size={10} offset={hour2}/>
            <ClockColumn size={6} offset={min1}/>
            <ClockColumn size={10} offset={min2}/>
            <ClockColumn size={6} offset={sec1}/>
            <ClockColumn size={10} offset={sec2}/>
        </div>
    );
});
