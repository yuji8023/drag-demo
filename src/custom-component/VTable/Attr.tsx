import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useProxy } from 'valtio/utils';

import store from '../../store/index'
import CommonAttr from '../common/CommonAttr/CommonAttr'
import EditTable from './EditTable'


export default () => {
    const stateConsumer = useProxy(store.state);

    return (
        <div className='attr-list'>
            <CommonAttr />
            <EditTable value={stateConsumer.curComponent.propValue.data} onChange={v => stateConsumer.curComponent.propValue.data = v} />
            <div style={{ display: 'grid', grid: "auto/1fr", gridGap: "10px 0" }}>
             
            </div>
        </div>
    )
}