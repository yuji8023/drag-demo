import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useProxy } from 'valtio/utils';

import store from '../../store/index'

// import { TextBox } from 'devextreme-react/text-box';
import { Form, Input } from 'antd';

import CommonAttr from '../common/CommonAttr/CommonAttr'
import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-react'

const attrObj = observable({
    value: '名称',
})



export default observer(() => {
    const stateConsumer = useProxy(store.state);

    useEffect(() => {
        // console.log(stateConsumer.curComponent)
        // return () => {
        //     // console.log('unmount')
        //     stateConsumer.curComponent.propValue.caption = attrObj.value
        // }
        stateConsumer.curComponent.propValue.caption = attrObj.value
    }, [attrObj.value])

    return (
        <div className='attr-list'>
            <CommonAttr>
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
            </CommonAttr>
        </div>
    )
})