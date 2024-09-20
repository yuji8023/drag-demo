import React, { Fragment } from 'react';
import classNames from 'classnames';
import './Group.less'
import { IProps } from '../DynamicComponent'

import DynamicComponent from '../DynamicComponent';

export default ({ id, propValue, element, style, className, preview }: IProps) => {
    return (
        <div id={id} className={classNames('group', className)} style={style}>
            <div>
                {
                    propValue?.map((item: any) => (
                        <Fragment key={item.id}>
                            <DynamicComponent
                                is={item.component}
                                id={'component' + item.id}
                                className="component"
                                style={item.groupStyle}
                                propValue={item.propValue}
                                element={item}
                                preview={preview}
                            />
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}