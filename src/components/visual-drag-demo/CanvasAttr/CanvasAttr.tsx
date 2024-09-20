import React, { useState, useEffect, useMemo, Fragment } from 'react';
import classNames from 'classnames';
import { useSnapshot } from 'valtio';
import { useProxy } from 'valtio/utils';
import { useImmer } from 'use-immer';
import './CanvasAttr.less'
import { Form, InputNumber } from 'antd';

import { ColorInput } from '../../ColorInput'

// import { ColorBox } from 'devextreme-react/color-box';
// import { NumberBox } from "devextreme-react/number-box";


import store from "../../../store/index"
import { format } from 'path';

const options: Record<string, string> = {
    color: '颜色',
    opacity: '不透明度',
    backgroundColor: '背景色',
    fontSize: '字体大小',
}

export default () => {
    const stateConsumer = useProxy(store.state);

    const isIncludesColor = (str: string) => {
        return str.toLowerCase().includes('color')
    }


    return (
        <div className='attr-container'>
            <p className="title">画布属性</p>
            <Form labelCol={{span: 8}} labelAlign='left' style={{ padding: '0 16px'}}>
            {
                Object.keys(options).map((key, index) => (
                    <Fragment key={index}>
                        {
                            isIncludesColor(key) ?
                                
                                <Form.Item label={options[key]}>
                                    <ColorInput
                                        value={stateConsumer.canvasStyleData[key]} 
                                        onChange={(color: string) => {
                                            stateConsumer.canvasStyleData[key] = color
                                        }} 
                                    />
                                </Form.Item>
                                :
                                // <NumberBox showClearButton={false} label={options[key]} valueChangeEvent='keyup' value={Number(stateConsumer.canvasStyleData[key])} onValueChange={(value: any) => {
                                //     stateConsumer.canvasStyleData[key] = Number(value)
                                // }} />
                                <Form.Item label={options[key]}>
                                    <InputNumber
                                        step={key == 'opacity' ? 0.1 : 1}
                                        value={Number(stateConsumer.canvasStyleData[key])}
                                        onChange={(value: any) => {
                                            stateConsumer.canvasStyleData[key] = Number(value)
                                        }}
                                    />
                                </Form.Item>
                                 
                        }
                    </Fragment>
                ))
            }
            </Form>
        </div>
    )
}