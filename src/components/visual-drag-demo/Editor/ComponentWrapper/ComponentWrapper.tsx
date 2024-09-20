import React, { useState, useCallback, useEffect, useMemo, useRef, Fragment } from 'react';
import classNames from 'classnames';
import { proxy, useSnapshot } from 'valtio';
import { useProxy } from 'valtio/utils';
import { useImmer } from 'use-immer';
import './ComponentWrapper.less'

import DynamicComponent from '../../../../custom-component/DynamicComponent';
import { getStyle, getSVGStyle } from '../../../../utils/visual-drag-demo/style'


export default ({ config, preview = false }: { config: Record<string, any>, preview?: boolean }) => {

    return (
        <div>
            {config.component.startsWith('SVG') ? <DynamicComponent
                is={config.component}
                style={getSVGStyle(config.style)}
                className="component"
                propValue={config.propValue}
                element={config}
                preview={preview}
            /> : <DynamicComponent
                is={config.component}
                style={getStyle(config.style)}
                className="component"
                propValue={config.propValue}
                element={config}
                preview={preview}
            />
            }
        </div>
    )
}