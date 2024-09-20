import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSnapshot } from 'valtio';

// import { Button } from 'devextreme-react/button';
import { Select, Input } from 'antd';
import './VSelect.less'
import { IProps } from '../DynamicComponent'


export default (props: IProps) => {
    const { element, propValue, id, style, className, preview } = props;
    return (
        !preview ? <div className={classNames('v-select-mask', className)} id={id} style={style} onClick={(e) => e.stopPropagation()}>
            <Select className={classNames('v-select')} placeholder="请选择"  ></Select>
        </div> :
        <Select className={classNames('v-select')} placeholder="请选择" style={style} options={[{ label: '1', value: 1}]} ></Select>
    )
}