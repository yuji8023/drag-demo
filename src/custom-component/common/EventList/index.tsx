import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useProxy } from 'valtio/utils';

import { Button, Tag   } from 'antd';

import store from '../../../store/index'
import { ClickEventSetter } from './ClickSetter'
import './event.less'

import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-react'

export const attrObj = observable({
    clickEventProps: store.state.curComponent?.clickEventProps || {},
})

export default observer((props) => {
    const [modalVisible, setModalVisible] = useState(false);
    // const eventsObj = store.state.curComponent.events || {}
    console.log(props)

    useEffect(() => {
        attrObj.clickEventProps = store.state.curComponent?.clickEventProps || {}
    }, [store.state.curComponent])

    const openModal = () => setModalVisible(true)
    const closeModal = () => setModalVisible(false)

    const addEvent = (event, param) => {
        
        store.addEvent(store.state, { event, param })
    }
  
    const removeEvent = (event) => {
        store.removeEvent(store.state, event)
    }

    const handleChangeEvent = (val) => {
        attrObj.clickEventProps = val;
        store.state.curComponent.clickEventProps = val
    }


    return (
        <div className="event-list">
            <div className="div-events">
                {/* <Button onClick={openModal}>添加事件</Button> */}
                {/* <div>
                    {
                        Object.keys(eventsObj).map(item => {
                            return (
                                <Tag key={item} closable onClose={() => removeEvent(item)}>
                                    {item}
                                </Tag>
                            )
                        })
                    }
                </div> */}
            </div>
            <ClickEventSetter value={attrObj.clickEventProps} onChange={handleChangeEvent} />
        </div>
    )
})