import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

// import { Button } from 'devextreme-react/button';
import { Input } from 'antd';
import './styles.less'
import { IProps } from '../DynamicComponent'
import PubSub from '../../utils/visual-drag-demo/eventBus';
import store from '../../store/index'
import { useProxy } from 'valtio/utils';
// import { attrObj } from './Attr'
import {attrObj} from '../common/CommonSetter/CaptionSetter';


export default (props: IProps) => {
    const { element, propValue, id, style, className } = props;
    const stateConsumer = useProxy(store.state)
    const curRef = useRef<any>(null);
    const [value, setValue] = useState(propValue)

    const onComponentClick = () => {
        // 如果当前点击的组件 id 和 VText 不是同一个，需要设为不允许编辑 https://github.com/woai3c/visual-drag-demo/issues/90
        if (stateConsumer.curComponent.id !== element!.id) {
            // localState.canEdit = false
            curRef.current.blur()
        }
    }

    const handleChange = (e) => {
        attrObj.value = e.target.value;
        setValue({...value, caption: e.target.value})
    }

    useEffect(() => {
        document.addEventListener('mouseup', () => {
            curRef?.current?.blur();
            document.removeEventListener('mouseup', () => {})
        })
        const token = PubSub.subscribe('componentClick', onComponentClick)
        const token2 = PubSub.subscribe('mouseup', () => curRef.current.blur())
        return () => {
            PubSub.unsubscribe(token);
            PubSub.unsubscribe(token2);
        };
    }, []);

    useEffect(() => {
        setValue(propValue)
    }, [propValue])
    return (
        <Input ref={curRef} value={value.caption} onDoubleClick={() => curRef.current.focus()} onChange={handleChange} className={classNames('v-input', className)} id={id} placeholder="请输入" style={style} />
    )
}