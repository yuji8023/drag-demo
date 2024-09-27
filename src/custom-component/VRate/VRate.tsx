import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSnapshot } from 'valtio';

// import { Button } from 'devextreme-react/button';
import { Rate  } from 'antd';
// import './VSelect.less'
import { IProps } from '../DynamicComponent'
// import './vtag.less'


export default (props: IProps) => {
    const { element, propValue, id, style, className } = props;

    return (
        <div className={classNames('v-tag', className)} id={id} style={style}>
            <Rate allowClear />
        </div>
        // <Rate className={classNames(className)} id={id} style={style}>{propValue.caption}</Rate>
    )
}