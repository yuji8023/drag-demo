import React, { useState, useCallback, useEffect, useMemo, useRef, Fragment } from 'react';
import classNames from 'classnames';

import './VTable.less'
import { IProps } from '../DynamicComponent';


export default ({ propValue, id, style, className }: IProps) => {
    return (
        // <div id={id} className={classNames(className)} style={style}>
            <table id={id} className={classNames("v-table", className)} style={style}>
                <tbody>
                    {
                        propValue.data.map((item: any, index: number) => {
                            return (
                                <tr
                                    key={index}
                                    className={classNames({
                                        stripe: propValue.stripe && index % 2,
                                        bold: propValue.thBold && index === 0,
                                    })}
                                >
                                    {item.map((e: any, i: number) => {
                                        return (
                                            <td key={i}>{e}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        // </div>
    )
}