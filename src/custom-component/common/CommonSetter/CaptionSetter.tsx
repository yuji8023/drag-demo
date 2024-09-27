import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useProxy } from 'valtio/utils';

import store from '../../../store/index'

// import { TextBox } from 'devextreme-react/text-box';
import { Form, Input, Collapse } from 'antd';

import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-react'
export const attrObj = observable({
    value: store.state.curComponent?.propValue.caption || ''
})


export default observer((props) => {
    useEffect(() => {
        attrObj.value = store.state.curComponent.propValue.caption
    }, [])

    useEffect(() => {
        store.state.curComponent.propValue.caption = attrObj.value
    }, [attrObj.value])

    return (
        <Form.Item
            label='内容'
        >
            <Input.TextArea
                value={attrObj.value}
                onChange={v => {
                    attrObj.value = v.target.value
                }}
            />
        </Form.Item>
    )
})