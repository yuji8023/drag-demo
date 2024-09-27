import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useProxy } from 'valtio/utils';

import store from '../../store/index'

// import { TextArea } from 'devextreme-react/text-area';
// import { TextBox } from 'devextreme-react/text-box';

import { Input, Form } from 'antd';

import CommonAttr from '../common/CommonAttr/CommonAttr'
import CaptionSetter from '../common/CommonSetter/CaptionSetter';


export default () => {
    // const stateConsumer = useProxy(store.state);

    return (
        <div className='attr-list'>
            <CommonAttr >
                <CaptionSetter />
            </CommonAttr>
        </div>
    )
}