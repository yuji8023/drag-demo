import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useProxy } from 'valtio/utils';

import store from '../../store/index'

// import { TextBox } from 'devextreme-react/text-box';
import { Form, Input, Collapse } from 'antd';

import CommonAttr from '../common/CommonAttr/CommonAttr'
import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-react'
import CaptionSetter from '../common/CommonSetter/CaptionSetter';



export default observer(() => {
    return (
        <div className='attr-list'>
                <CommonAttr>
                    <CaptionSetter />
                </CommonAttr>
        </div>
    )
})