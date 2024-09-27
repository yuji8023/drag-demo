import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSnapshot } from 'valtio';

// import { Button } from 'devextreme-react/button';
import { Input  } from 'antd';
// import './VSelect.less'
import { IProps } from '../DynamicComponent'
import './styles.less'
import preview from '../VInput/preview';


export default (props: IProps) => {
    const { element, propValue, id, style, className, preview } = props;

    return (
        <div className={classNames('v-password', className)} id={id} style={style}>
            <Input.Password />
            {/* {preview ? <Input.Password /> : <Input.Password style={{ pointerEvents: 'none'}} />} */}
        </div>
        // <Tag className={classNames(className)} id={id} style={style}>{propValue.caption}</Tag>
    )
}