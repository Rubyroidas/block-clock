import React, {useEffect, useState} from 'react';
import classNames from 'classnames';

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

export const Clock = () => {
    const [timestamp, setTimestamp] = useState(Date.now());
    const tick = () => {
        setTimestamp(Date.now());
    };
    useEffect(() => {
        return setInterval(tick, 1000);
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

    return (
        <div className="row">
            <ClockColumn size={3} offset={hour1}/>
            <ClockColumn size={10} offset={hour2}/>
            <ClockColumn size={6} offset={min1}/>
            <ClockColumn size={10} offset={min2}/>
            <ClockColumn size={6} offset={sec1}/>
            <ClockColumn size={10} offset={sec2}/>
        </div>
    );
};
