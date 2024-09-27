import React, { useState, useEffect, useMemo } from 'react';
import { useProxy } from 'valtio/utils';
import { createForm, onFieldValueChange, onFieldMount } from '@formily/core'
import { Form, Input, Collapse, Button, Modal } from 'antd';
import classNames from 'classnames';
import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-react'

import {
    createSchemaField,
    FormProvider,
} from "@formily/react";
import {
    ArrayTable,
    ArrayItems,
    Input as FormilyInput,
    Select,
    FormItem,
    Switch,
    Space,
} from "@formily/antd";

import CommonAttr from '../common/CommonAttr/CommonAttr'
import store from '../../store/index'

const SchemaField = createSchemaField({
    components: {
      FormilyInput,
      FormItem,
      ArrayTable,
      ArrayItems,
      Switch,
      Space,
    },
});


export const attrObj = observable({
    // value: store.state.curComponent?.propValue.caption || '',
    dataSource: store.state.curComponent?.propValue.dataSource || [],
    direction: store.state.curComponent?.propValue.direction,
})

export default observer(() => {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        attrObj.dataSource = store.state.curComponent?.propValue.dataSource || [{label: '选项1'},{label: '选项2'}]
        attrObj.direction = store.state.curComponent?.propValue.direction || 'vertical'
    }, [])

    const form = useMemo(() => {
        return createForm({
            values: { dataSource: attrObj.dataSource }
        });
    }, [modalVisible])

    // const form = useMemo(() => {
    //     return createForm({
    //       values: {dataSource: attrObj.dataSource},
    //     })
    //   }, [modalVisible, attrObj.dataSource])

    const openModal = () => setModalVisible(true)
    const closeModal = () => setModalVisible(false)

    const handleChange = (val) => {
        store.state.curComponent.propValue.dataSource =  val
        attrObj.dataSource = val
    }
    const handleValChange = val => {
        store.state.curComponent.propValue.direction =  val
        attrObj.direction = val
    }

    return (
        <>
        <div className='attr-list'>
            
                <CommonAttr>
                    <Form.Item
                        label='内容'
                    >
                        <Button onClick={openModal}>配置数据</Button>
                        {/* <Input 
                            value={stateConsumer.curComponent.propValue.caption}
                            onChange={v => {
                                stateConsumer.curComponent.propValue.caption = v.target.value
                            }}
                        /> */}
                         {/* <Input.TextArea 
                            value={obs.value}
                            onChange={v => {
                                obs.value = v.target.value
                            }}
                        /> */}
                    </Form.Item>
                    <Form.Item
                        label='方向'
                    >
                        <Select value={attrObj.direction} onChange={handleValChange} options={[{label: '垂直', value: 'vertical'}, {label: '水平', value: 'horizontal'}]}></Select>
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
        <Modal
            title="配置数据"
            width={500}
            style={{ top: 20 }}
            bodyStyle={{
            display: "flex",
            flexDirection: "column",
            minHeight: 320,
            background: "#fff",
            padding: "16px 24px",
            overflowY: "auto"
            }}
            centered
            transitionName=""
            maskTransitionName=""
            open={modalVisible}
            onCancel={closeModal}
            destroyOnClose
            onOk={async () => {
                form.validate().then(() => {
                    form.submit((values) => {
                        
                        const dataSource = values.dataSource.map((item, index) => {
                            return {
                                ...item,
                                value: `key${index}`
                            }
                        })
                        handleChange(dataSource);
                    });
                    closeModal();
                });
            }}
        >
            <FormProvider form={form}>
                <SchemaField>
                    <SchemaField.Array name="dataSource" x-component="ArrayItems">
                        <SchemaField.Object>
                            <SchemaField.Void x-component="Space">
                                <SchemaField.Void
                                x-decorator="FormItem"
                                x-component="ArrayItems.SortHandle"
                                />
                                <SchemaField.String
                                x-decorator="FormItem"
                                required
                                name="label"
                                x-component="FormilyInput"
                                x-component-props={{
                                    style: {
                                        width: 360
                                    }
                                }}
                                />
                                <SchemaField.Void
                                x-decorator="FormItem"
                                x-component="ArrayItems.Remove"
                                />
                                <SchemaField.Void
                                x-decorator="FormItem"
                                x-component="ArrayItems.Copy"
                                />
                            </SchemaField.Void>
                        </SchemaField.Object>
                        <SchemaField.Void
                            x-component="ArrayItems.Addition"
                            title="添加条目"
                        />
                    </SchemaField.Array>
                </SchemaField>
            </FormProvider>


        </Modal>
        </>
    )
})