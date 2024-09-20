import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useProxy } from 'valtio/utils';

import store from '../../store/index'

// import { TextBox } from 'devextreme-react/text-box';
import { Form, Input, Collapse } from 'antd';

import CommonAttr from '../common/CommonAttr/CommonAttr'


export default () => {
    const stateConsumer = useProxy(store.state);
    // console.log(1)

    return (
        <div className='attr-list'>
            
                <CommonAttr>
                    <Form.Item
                        label='内容'
                    >
                        <Input 
                            value={stateConsumer.curComponent.propValue.caption}
                            onChange={v => {
                                stateConsumer.curComponent.propValue.caption = v.target.value
                            }}
                        />
                         {/* <Input.TextArea 
                            value={obs.value}
                            onChange={v => {
                                obs.value = v.target.value
                            }}
                        /> */}
                    </Form.Item>
                </CommonAttr>
                
                {/* <div style={{ display: 'grid', grid: "auto/1fr", gridGap: "10px 0" }}>
                    <Collapse >
                        <Panel header="组件属性" key="3">
                            <Form.Item
                                label='内容'
                            >
                                <Input.TextArea 
                                    value={stateConsumer.curComponent.propValue.caption}
                                    onChange={v => stateConsumer.curComponent.propValue.caption = v.target.value}
                                />
                            </Form.Item>
                        </Panel>
                    </Collapse>
                </div> */}
        </div>
    )
}