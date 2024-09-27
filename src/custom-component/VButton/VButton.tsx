import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSnapshot } from 'valtio';

// import { Button } from 'devextreme-react/button';
import { Button } from 'antd';
import './VButton.less'
import { IProps } from '../DynamicComponent'
import { clickEventToProps } from '../../utils/click'


export default ({ element, propValue, id, style, className, preview }: IProps) => {
    console.log(element?.clickEventProps)
    const clickEventProps = element?.clickEventProps;
    let clickProps;
    if(clickEventProps) {
        // clickProps = clickEventToProps(clickEventProps);
        clickProps = clickEventToProps(clickEventProps);
    }
    const handleClick = (event) => {
        // if (event.ctrlKey || event.metaKey) {
        //     event.preventDefault();
        //     // Ctrl键被按下，执行你想要的操作
        //     form.notify('ctrl-click', clickCustomEventProps)
        // } else {

        //     if(hideModal) {
        //     form.notify('hide-modal')
        //     }
        //     clickProps.onClick && clickProps.onClick();
        // }
        console.log(preview)
        if(!preview) return

        clickProps.onClick && clickProps.onClick();
    };
    return (
        <Button className={classNames('v-button', className)} onClick={handleClick} id={id} style={style} >{propValue.caption}</Button>
    )
}