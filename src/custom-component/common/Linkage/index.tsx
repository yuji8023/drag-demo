import React, { useState, useEffect } from "react"
import store from '../../../store/index';
import { useProxy } from 'valtio/utils';
import { styleMap, optionMap, selectKey } from '../../../utils/visual-drag-demo/attr'
import { Collapse, Form, Select, Button, InputNumber, Input } from "antd";
import { ColorInput } from '../../../components/ColorInput';
import './styles.less'

const { Panel } = Collapse;
const eventOptions = [
    { label: '点击', value: 'v-click' },
    { label: '悬浮', value: 'v-hover' },
]

export default (props) => {

    const stateConsumer = useProxy(store.state);
    const [oldOpacity, setOldOpacity] = useState('')
    const [oldBackgroundColor, setOldBackgroundColor] = useState('');
    const linkageData = stateConsumer.curComponent.linkage

    const isIncludesColor = (str) => {
        return str.toLowerCase().includes('color')
    }

    const onEnter = (index) => {
        setOldOpacity(stateConsumer.componentData[index].style.opacity)
        setOldBackgroundColor(stateConsumer.componentData[index].style.backgroundColor)
        stateConsumer.componentData[index].style.opacity = '.3'
        stateConsumer.componentData[index].style.backgroundColor = '#409EFF'
    }
  
    const onOut = (index) => {
        stateConsumer.componentData[index].style.opacity = oldOpacity
        stateConsumer.componentData[index].style.backgroundColor = oldBackgroundColor
    }
  
    const addAttr = (index) => {
        stateConsumer.curComponent.linkage.data[index].style.push({ key: '', value: '' })
    }
  
    const addComponent = () => {
        stateConsumer.curComponent.linkage.data.push({
            id: '',
            label: '',
            event: '',
            style: [{ key: '', value: '' }],
        })
    }
  
    const handleComponentData = (val, index, key) => {
        stateConsumer.curComponent.linkage.data[index][key] = val
    }
    const handleStyleData = (val, index, i, key) => {
        stateConsumer.curComponent.linkage.data[index].style[i][key] = val
    }

    const deleteStyleData = (index, i) => {
        // style.splice(index, 1)
        stateConsumer.curComponent.linkage.data[index].style.splice(i, 1)
    }
  
    const deleteLinkageData = (index) => {
        stateConsumer.curComponent.linkage.data.splice(index, 1)
    }



    return (
      <div className="linkage-container">
        <Form>
            {
                linkageData.data.map((item, index) => {
                    return (
                        <div  key={index} className="linkage-component">
                            <div className="div-guanbi" onClick={() => deleteLinkageData(index)}>
                                <span className="iconfont icon-guanbi"></span>
                            </div>
                            <Select value={item.id || undefined} onChange={val => handleComponentData(val, index,'id')} placeholder="请选择联动组件" allowClear style={{width: '100%'}} className="testtest">
                                {
                                    stateConsumer.componentData.map((component, i) => {
                                        return (
                                            <Select.Option key={component.value}>
                                                <div onMouseEnter={() => onEnter(i)} onMouseOut={() => onOut(i)}>{ component.label }</div>
                                            </Select.Option>
                                        )
                                    })
                                }
                            </Select>
                            <Select value={item.event || undefined} onChange={val => handleComponentData(val, index,'event')} placeholder="请选择监听事件" allowClear style={{width: '100%', margin: '10px 0'}} options={eventOptions}></Select>
                            <p>事件触发时，当前组件要修改的属性</p>
                            {
                                item.style.map((e, i) => {
                                    return (
                                        <div  key={i} className="attr-container">
                                            <Select value={e.key || undefined} onChange={val => handleStyleData(val, index, i, 'key')} placeholder="请选择" options={Object.keys(stateConsumer.curComponent.style).map(attr => {
                                                return {
                                                    value: attr,
                                                    label: styleMap[attr]
                                                }
                                            })} />
                                            {isIncludesColor(e.key) && <ColorInput value={e.value} onChange={val => handleStyleData(val, index, i, 'value')} ></ColorInput>}
                                            {selectKey.includes(e.key) && <Select value={e.value} onChange={val => handleStyleData(val, index, i, 'value')} placeholder="请选择" options={optionMap[e.key].map(item => {
                                                return {
                                                value: item.value,
                                                label: item.label
                                                }
                                            })} />}
                                            {!isIncludesColor(e.key) && !selectKey.includes(e.key) && <InputNumber value={e.value} onChange={val => handleStyleData(val, index, i, 'value')}  placeholder="请输入" />}
                                            <span className="iconfont icon-shanchu" onClick={() => deleteStyleData(index, i)}></span>
                                        </div>
                                    )
                                })
                            }
                            <Button onClick={() => addAttr(index)}>添加属性</Button>
                        </div>
                    )
                })
            }
        
            
            <Button style={{marginBottom: '10px'}} onClick={addComponent}>添加组件</Button>
            <p>过渡时间（秒）</p>
            <Form.Item>
                <InputNumber value={linkageData.duration} onChange={(val) => {
                    stateConsumer.curComponent.linkage.duration = val
                }} className="input-duration" placeholder="请输入" />
            </Form.Item>
        </Form>
      </div>
    );
}