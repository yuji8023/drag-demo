import React, { useState, useEffect, useMemo, Fragment } from 'react';
import classNames from 'classnames';
import { useProxy } from 'valtio/utils';

// import { Accordion } from 'devextreme-react/accordion';
// import { ColorBox } from 'devextreme-react/color-box';
// import { TextBox } from 'devextreme-react/text-box';
// import { NumberBox } from "devextreme-react/number-box";
// import { SelectBox } from 'devextreme-react/select-box';

import { Checkbox, Collapse, Select, Form, InputNumber   } from 'antd';
import { ColorInput } from '../../../components/ColorInput';
import Linkage from '../Linkage';

import './CommonAttr.less'


import { styleData, textAlignOptions, borderStyleOptions, verticalAlignOptions, selectKey, optionMap } from '../../../utils/visual-drag-demo/attr'
import store from '../../../store/index'

const { Panel } = Collapse;

// 有几项,就有几个折叠面板
const accordionItems = [{
    title: "通用样式",
    name: "style"
},
    // {
    //     title: "其它属性",
    //     name: "props"
    // }
]

// 标题
function CustomTitle(item: any) {
    return (
        <>{item.title}</>
    );
}

// 内容
function CustomItem(item: any) {
    const stateConsumer = useProxy(store.state)

    const isIncludesColor = (str: any) => {
        return str.toLowerCase().includes('color')
    }

    const styleKeys = useMemo(() => {
        if (stateConsumer.curComponent) {
            const curComponentStyleKeys = Object.keys(stateConsumer.curComponent?.style)
            return styleData.filter(item => curComponentStyleKeys.includes(item.key))
        }
        return []

    }, [stateConsumer.curComponent])



    let renderContent: any = null;

    switch (item.name) {
        case "style":
            renderContent = <Form labelAlign='left' labelCol={{span: 8}}>
                {
                    styleKeys.map(({ key, label }, index) => (
                        <div key={index}>
                            <Form.Item
                                label={label}
                            >
                                {
                                    isIncludesColor(key) ?
                                        
                                            <ColorInput
                                                value={stateConsumer.curComponent?.style[key]}
                                                onChange={(color: string) => {
                                                    stateConsumer.curComponent.style[key] = color
                                                }} 
                                            />
                                        
                                        // <ColorBox showClearButton={true} label={label} applyButtonText='确定' cancelButtonText='取消' value={stateConsumer.curComponent?.style[key]} editAlphaChannel={false} onValueChange={(value: any) => {
                                        //     stateConsumer.curComponent.style[key] = value
                                        // }} /> 
                                        :
                                        selectKey.includes(key) ? 
                                            // <SelectBox showClearButton={false} placeholder='' label={label} searchEnabled={true} dataSource={optionMap[key as "textAlign" | "borderStyle" | "verticalAlign"]} valueExpr="value" displayExpr="label" value={stateConsumer.curComponent.style[key]} onValueChange={(value: any) => {
                                            //     stateConsumer.curComponent.style[key] = value
                                            // }} />
                                            <Select
                                                options={optionMap[key as "textAlign" | "borderStyle" | "verticalAlign"]}
                                                value={stateConsumer.curComponent.style[key]}
                                                onChange={value => {
                                                    stateConsumer.curComponent.style[key] = value
                                                }}
                                                style={{ width: '100%' }}
                                            >

                                            </Select>
                                        :
                                            <InputNumber 
                                                value={Number(stateConsumer.curComponent?.style[key])}
                                                onChange={value => {
                                                    stateConsumer.curComponent.style[key] = Number(value)
                                                }}
                                                style={{ width: '100%' }}
                                            />
                                            // <NumberBox showClearButton={false} label={label} valueChangeEvent='keyup' value={Number(stateConsumer.curComponent?.style[key])} onValueChange={(value: any) => {
                                            //     stateConsumer.curComponent.style[key] = Number(value)
                                            // }} />
                                }
                            </Form.Item>
                        </div>
                    ))
                }
            </Form>
            break;
        default:
            renderContent = <>{item.title}</>
            break;
    }




    return renderContent
}


export default (props) => {
    const [selectedItems, setSelectedItems] = useState([accordionItems[0]]);

    const selectionChanged = (e: any) => {
        let newItems: any = [...selectedItems];
        e.removedItems?.forEach((item: any) => {
            const index = newItems.indexOf(item);
            if (index >= 0) {
                newItems.splice(index, 1);
            }
        });
        if (e.addedItems?.length) {
            newItems = [...newItems, ...e.addedItems];
        }
        setSelectedItems(newItems);
    };

    return (
        <div className='v-common-attr'>
            <Collapse defaultActiveKey={['1']} accordion={true}>
                <Panel header="通用样式" key="1">
                    {CustomItem(accordionItems[0])}
                </Panel>
                <Panel header="组件联动（预览生效）" key="2">
                    <Linkage />
                </Panel>
                {props.children && 
                <Panel header="组件属性" key="3">
                    {props.children}
                </Panel>}
            </Collapse>
        </div>
    )
}