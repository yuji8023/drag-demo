import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

// import { Button } from 'devextreme-react/button';
import { Input } from 'antd';
import './styles.less'
import { IProps } from '../DynamicComponent'


export default (props: IProps) => {
    const { element, propValue, id, style, className } = props;
    const curRef = useRef<any>(null);
    const [value, setValue] = useState(propValue)

    useEffect(() => {
        setValue(propValue)
    }, [propValue])
    return (
        <Input.TextArea ref={curRef} value={value.caption} onChange={e => setValue({...value, caption: e.target.value})} className={classNames('v-input', className)} id={id} placeholder="请输入" style={style} />
    )
}