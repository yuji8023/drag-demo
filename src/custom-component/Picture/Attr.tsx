import React, { useState, useCallback, useEffect, useMemo, useRef, Fragment } from 'react';
import classNames from 'classnames';
import { proxy, useSnapshot } from 'valtio';
import { useProxy } from 'valtio/utils';
import { useImmer } from 'use-immer';

import store from "../../store/index"
import CommonAttr from '../common/CommonAttr/CommonAttr'
// import { CheckBox } from 'devextreme-react/check-box'
// import { TextBox } from 'devextreme-react/text-box';


import { Checkbox, Input, Form } from 'antd'

export default () => {
    const stateConsumer = useProxy(store.state);

    return (
        <div className='attr-list'>
            <CommonAttr />

            <div style={{ display: 'grid', grid: "auto/1fr", gridGap: "10px 0" }}>
                <Checkbox
                    value={stateConsumer.curComponent.propValue.flip.horizontal}
                    onChange={e => {
                        stateConsumer.curComponent.propValue.flip.horizontal = e.target.checked
                    }}
                >水平翻转</Checkbox>
                <Checkbox
                    value={stateConsumer.curComponent.propValue.flip.vertical}
                    onChange={e => {
                        stateConsumer.curComponent.propValue.flip.vertical = e.target.checked
                    }}
                >垂直翻转</Checkbox>
                <Form.Item
                    label='内容'
                >
                    <Input
                        value={stateConsumer.curComponent.propValue.width}
                        onChange={v => stateConsumer.curComponent.propValue.width = v}
                    />
                </Form.Item>
                {/* <Input
                    label='内容'
                    valueChangeEvent="input"
                    value={stateConsumer.curComponent.propValue.caption}
                    onValueChange={v => stateConsumer.curComponent.propValue.caption = v}
                /> */}
            </div>
        </div>
    )
}