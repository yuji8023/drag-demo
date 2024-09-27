import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSnapshot } from 'valtio';

// import { Button } from 'devextreme-react/button';
import { Radio, Input, Space  } from 'antd';
// import './VSelect.less'
import { IProps } from '../DynamicComponent'


export default (props: IProps) => {
    const { element, propValue, id, style, className } = props;
    const [val, setVal] = useState(undefined)

    const handleChange = e => {
        setVal(e.target.value)
    }
    return (
        <Radio.Group className={classNames('v-radio', className)} id={id} style={style} value={val} onChange={handleChange}>
            <Space direction={propValue.direction || 'vertical'}>
                {
                    propValue.dataSource.map((item, index) => {
                        return <Radio value={`r${index}`} >{item.label}</Radio>
                    })
                }
            </Space>
        </Radio.Group>
    )
}