import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useProxy } from 'valtio/utils';

import store from '../../../store/index'

// import { TextArea } from 'devextreme-react/text-area';
// import { TextBox } from 'devextreme-react/text-box';

import { Input, Form } from 'antd';

import CommonAttr from '../../common/CommonAttr/CommonAttr'


export default () => {
    const stateConsumer = useProxy(store.state);

    return (
        <div className='attr-list'>
            <CommonAttr />
            
            <div style={{ display: 'grid', grid: "auto/1fr", gridGap: "10px 0" }}>
             <Form.Item
                label='内容'
             >
                <Input.TextArea 
                    value={stateConsumer.curComponent.propValue.caption}
                    onChange={e => {
                        stateConsumer.curComponent.propValue.caption = e.target.value
                    }}
                />
             </Form.Item>
            </div>
        </div>
    )
}