import React, { useState, useCallback, useEffect, useMemo, useRef, Fragment } from 'react';
import classNames from 'classnames';

import './styles.less'
import { IProps } from '../../DynamicComponent';


export default (props: IProps & {element:  {style: {width?: number, height?: number}}}) => {
    const { propValue, id, style, className, element } = props;


    const [points, setPoints] = useState('');
    const starRef = useRef(null)

    useEffect(() => {
        draw()
    }, [element.style.width, element.style.height])
    const draw = () => {
        const { width = 100, height = 100 } = element.style
        drawPolygon(width, height)
      }
  
    const drawPolygon = (width, height) => {
        // 五角星十个坐标点的比例集合
        const points = [
          [0.5, 0],
          [0.625, 0.375],
          [1, 0.375],
          [0.75, 0.625],
          [0.875, 1],
          [0.5, 0.75],
          [0.125, 1],
          [0.25, 0.625],
          [0, 0.375],
          [0.375, 0.375],
        ]
  
        const coordinatePoints = points.map((point) => `${width * point[0]} ${height * point[1]}`)
        setPoints(coordinatePoints.toString())
      }
    return (
        <div className={classNames('svg-star-container', className)} id={id} style={{...style, backgroundColor: 'none'}} >
            <svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">
                <polygon
                    ref={starRef}
                    points={points}
                    stroke={style?.borderColor}
                    fill={style?.backgroundColor}
                    stroke-width="1"
                />
            </svg>
            <div className='v-text'>
                <div>{propValue.caption}</div>
            </div>
        </div>
    )
}