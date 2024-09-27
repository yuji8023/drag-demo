import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSnapshot } from 'valtio';

// import { Button } from 'devextreme-react/button';
import { Switch  } from 'antd';
// import './VSelect.less'
import { IProps } from '../DynamicComponent'


export default (props: IProps) => {
    const { element, propValue, id, style, className } = props;

    return (
        <div className={classNames(className)} id={id} style={style}>
            <Switch />
        </div>
    )
}