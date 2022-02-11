import React from 'react';
import {observer} from 'mobx-react';

import {useStore} from './store';

import './Settings.scss';

export const Settings = observer(() => {
    const store = useStore();
    return (
        <div className="settings">
            <label>
                <input type="checkbox"
                       checked={store.isDeviceOrientationLocked}
                       onChange={(e) => store.setDeviceOrientationLocked(e.target.checked)}
                />
                Rotation locked
            </label>
        </div>
    );
});
