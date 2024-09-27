import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useProxy } from 'valtio/utils';

import store from '../../store/index'

// import { TextBox } from 'devextreme-react/text-box';
import { Form, Input, Collapse, InputNumber, Select } from 'antd';

import CommonAttr from '../common/CommonAttr/CommonAttr'
import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-react'
import CaptionSetter from '../common/CommonSetter/CaptionSetter';

const progressObj = observable({
    percent: store.state.curComponent?.propValue.caption || 30,
    type: store.state.curComponent?.propValue.type || 'line',
    width: store.state.curComponent?.propValue.width || 132,
})

export default observer(() => {

    useEffect(() => {
        progressObj.percent = store.state.curComponent.propValue.percent;
        progressObj.type = store.state.curComponent?.propValue.type || 'line';
        progressObj.width = store.state.curComponent?.propValue.width || 132;
    }, [])
    return (
        <div className='attr-list'>
                <CommonAttr>
                    {/* <CaptionSetter /> */}
                    <Form.Item
                        label='数值'
                    >
                        <InputNumber
                            value={progressObj.percent}
                            onChange={val => {
                                progressObj.percent = val
                                store.state.curComponent.propValue.percent = val
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label='类型'
                    >
                        <Select value={progressObj.type} onChange={val => {
                                progressObj.type = val
                                store.state.curComponent.propValue.type = val
                            }} options={[{label: '进度条', value: 'line'}, {label: '进度圈', value: 'circle'}, {label: '仪表盘', value: 'dashboard'}]}></Select>
                    </Form.Item>
                    {progressObj.type != 'line' && <Form.Item
                        label='圈与仪表宽度'
                    >
                        <InputNumber
                            value={progressObj.width}
                            onChange={val => {
                                progressObj.width = val
                                store.state.curComponent.propValue.width = val
                            }}
                        />
                    </Form.Item>}
                </CommonAttr>
        </div>
    )
})