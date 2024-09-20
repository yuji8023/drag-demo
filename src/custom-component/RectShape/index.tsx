import React, { useState, useCallback, useEffect, useMemo, useRef, Fragment } from 'react';
import classNames from 'classnames';

import './styles.less'
import { IProps } from '../DynamicComponent';


export default ({ propValue, id, style, className }: IProps) => {
    return (
        <div className={classNames('rect-shape', className)} id={id} style={style} >
            <div className='v-text'>
                <div>{propValue.caption}</div>
            </div>
        </div>
    )
}