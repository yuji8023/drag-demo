import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useProxy } from 'valtio/utils';
import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-react'

import store from '../../store/index'
import CommonAttr from '../common/CommonAttr/CommonAttr'
import EditTable from './EditTable'
import {ColumnsSetter} from './columnSetter'
import { DataSourceSetter } from './dataSourceSetter';


export const attrObj = observable({
    column: store.state.curComponent?.propValue.column || [],
    dataSource: store.state.curComponent?.propValue.dataSource || [],
})

export default observer(() => {
    const stateConsumer = useProxy(store.state);
    useEffect(() => {
        attrObj.column = store.state.curComponent?.propValue.column || []
        attrObj.dataSource = store.state.curComponent?.propValue.dataSource || []
    }, [])

    const handleColsChange = (val) => {
        attrObj.column = val;
        store.state.curComponent.propValue.column = val
    }
    const handleDataChange = (val) => {
        attrObj.dataSource = val;
        store.state.curComponent.propValue.dataSource = val
    }

    return (
        <div className='attr-list'>
            <CommonAttr>
                <ColumnsSetter value={attrObj.column} onChange={handleColsChange} />
                <DataSourceSetter columns={attrObj.column} value={attrObj.dataSource} onChange={handleDataChange} />
            </CommonAttr>
            {/* <EditTable value={stateConsumer.curComponent.propValue.data} onChange={v => stateConsumer.curComponent.propValue.data = v} /> */}
            <div style={{ display: 'grid', grid: "auto/1fr", gridGap: "10px 0" }}>
             
            </div>
        </div>
    )
})