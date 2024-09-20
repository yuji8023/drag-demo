import React, { useState, useEffect, useRef } from 'react';
import { derive, useProxy } from "valtio/utils";
import { proxy, useSnapshot } from 'valtio';

import classNames from 'classnames';

import './Toolbar.less'

import store from "../../../store/index"

import { Select, Switch, Button, Input } from 'antd';

import generateID from '../../../utils/visual-drag-demo/generateID'
import toast from '../../../utils/visual-drag-demo/toast'
import Preview from '../Editor/Preview/Preview'
import AceEditor from '../Editor/AceEditor/AceEditor'
import { commonStyle, commonAttr } from '../../../custom-component/component-list'
import PubSub from '../../../utils/visual-drag-demo/eventBus'
import { $ } from '../../../utils/visual-drag-demo/utils'
import changeComponentsSizeWithScale, { changeComponentSizeWithScale } from '../../../utils/visual-drag-demo/changeComponentsSizeWithScale'
import { getComponentRotatedStyle } from '../../../utils/visual-drag-demo/style'


const alignList = [
    {
      label: '左对齐',
      value: 'leftAlign',
    },
    {
      label: '水平居中',
      value: 'centerAlign',
    },
    {
      label: '右对齐',
      value: 'rightAlign',
    },
    {
      label: '顶对齐',
      value: 'topAlign',
    },
    {
      label: '垂直居中',
      value: 'middleAlign',
    },
    {
      label: '底对齐',
      value: 'bottomAlign',
    },
    {
      label: '水平等间距',
      value: 'horizontalSpacing',
      isDisabled: true,
    },
    {
      label: '垂直等间距',
      value: 'verticalSpacing',
      isDisabled: true,
    },
];


export default () => {
    const stateConsumer = useProxy(store.state);
    const stateRender = useSnapshot(store.state);

    const [isShowPreview, setIsShowPreview] = useState(false);
    const [isShowAceEditor, setIsShowAceEditor] = useState(false);
    const [isScreenshot, setIsScreenshot] = useState(false);
    const [scale, setScale] = useState(100);
    const [switchValue, setSwitchValue] = useState(false);

    const handleToggleDarkMode = (value: boolean) => {
        if (value !== null) {
            store.toggleDarkMode(store.state, value)
            setSwitchValue(value)
        }
    }


    const handleAceEditorChange = () => {
        setIsShowAceEditor(!isShowAceEditor);
    }

    const closeEditor = () => {
        handleAceEditorChange()
    }

    const lock = () => {
        store.lock(store.state)
    }

    const unlock = () => {
        store.unlock(store.state)
    }

    const compose = () => {
        store.compose(store.state)
        store.recordSnapshot(store.state)
    }

    const decompose = () => {
        store.decompose(store.state)
        store.recordSnapshot(store.state)
    }


    const undo = () => {
        store.undo(store.state)
    }

    const redo = () => {
        store.redo(store.state)
    }

    const handleFileChange = (e: any) => {
        const file = e.target.files[0]
        if (!file.type.includes('image')) {
            toast('只能插入图片')
            return
        }

        const reader = new FileReader()
        reader.onload = (res: any) => {
            const fileResult = res.target.result
            const img = new Image()
            img.onload = () => {
                const component = {
                    ...commonAttr,
                    id: generateID(),
                    component: 'Picture',
                    label: '图片',
                    icon: '',
                    propValue: {
                        url: fileResult,
                        flip: {
                            horizontal: false,
                            vertical: false,
                        },
                    },
                    style: {
                        ...commonStyle,
                        top: 0,
                        left: 0,
                        width: img.width,
                        height: img.height,
                    },
                }
               
                // 根据画面比例修改组件样式比例 https://github.com/woai3c/visual-drag-demo/issues/91
                changeComponentSizeWithScale(component)

                store.addComponent(store.state, { component, index: undefined })
                store.recordSnapshot(store.state)


                // 修复重复上传同一文件，@change 不触发的问题
                $('#input').setAttribute('type', 'text')
                $('#input').setAttribute('type', 'file')
            }
        
            img.src = fileResult
        }

        reader.readAsDataURL(file)
    }

    const preview = (isScreenshot: boolean) => {
        setIsScreenshot(isScreenshot)
        setIsShowPreview(true)
        store.setEditMode(store.state, 'preview')
    }

    const save = () => {
        localStorage.setItem('canvasData', JSON.stringify(store.state.componentData))
        localStorage.setItem('canvasStyle', JSON.stringify(store.state.canvasStyleData))
        toast('保存成功',"success")
    }


    const clearCanvas = () => {
        store.setCurComponent(store.state, { component: null, index: null })
        store.setComponentData(store.state, [])
        store.recordSnapshot(store.state)
    }


    const handlePreviewChange = () => {
        setIsShowPreview(false)
        store.setEditMode(store.state, 'edit')
    }


    const hanndleCanvasScaleChange = (value: any) => {
        setScale(value)
        changeComponentsSizeWithScale(value)
    }
    const handleComponentAlign = (command: string) => {
        switch (command) {
          case 'leftAlign':
            store.leftAlign(store.state);
            return;
          case 'centerAlign':
            store.centerAlign(store.state);
            return;
          case 'rightAlign':
            store.rightAlign(store.state);
            return;
          case 'topAlign':
            store.topAlign(store.state);
            return;
          case 'middleAlign':
            store.middleAlign(store.state);
            return;
          case 'bottomAlign':
            store.bottomAlign(store.state);
            return;
          case 'horizontalSpacing':
            store.horizontalSpacing(store.state);
            return;
          case 'verticalSpacing':
            store.verticalSpacing(store.state);
            return;
        }
        // if (command && typeof command == 'string') {
        //     console.log(store.leftAlign)
        //     store.commit(command, store.state)
        // }
        // 每次对齐后记录一次快照
        // stateRender.$store.commit('recordSnapshot')
        store.recordSnapshot(store.state)
        // 如果是多组件对齐, 则需要重新计算选中区域的大小和位置
        let top = Infinity,
          left = Infinity
        let right = -Infinity,
          bottom = -Infinity
        if (stateRender.areaData.components.length > 1) {
          stateRender.areaData.components.forEach((component: any) => {
            let style = getComponentRotatedStyle(component.style)
            if (style.left < left) left = style.left
            if (style.top < top) top = style.top
            if (style.right > right) right = style.right
            if (style.bottom > bottom) bottom = style.bottom
          })
          store.setAreaData(store.state, {
            style: {
              left,
              top,
              width: right - left,
              height: bottom - top,
            },
            components: stateRender.areaData.components,
          })
        }
      }

    useEffect(() => {
        // 画布比例设一个最小值，不能为 0
        // eslint-disable-next-line no-bitwise

        setScale(scale || 1)
        changeComponentsSizeWithScale(scale)

        return () => {
            // 返回一个函数用来做清理工作，类似于 componentWillUnmount
        };
    }, [scale]); // 空依赖数组意味着仅在挂载时运行一次


    useEffect(() => {
        // 类似 componentDidMount 和 componentDidUpdate
        PubSub.subscribe('preview', (msg: any, data: any) => {
            preview(data)
        })

        PubSub.subscribe('save', (msg: any, data: any) => {
            save()
        })

        PubSub.subscribe('clearCanvas', (msg: any, data: any) => {
            clearCanvas()
        })

        setScale(store.state.canvasStyleData.scale)

        const savedMode = JSON.parse(localStorage.getItem('isDarkMode')!)
        if (savedMode) {
            handleToggleDarkMode(savedMode)
        }

        return () => {
            // 返回一个函数用来做清理工作，类似于 componentWillUnmount
        };
    }, []); // 空依赖数组意味着仅在挂载时运行一次




    return (
        <div>
            {!isShowPreview && <div className={classNames([stateRender.isDarkMode ? 'dark toolbar' : 'toolbar'])}>
                <Button onClick={handleAceEditorChange} >JSON</Button>
                <Button onClick={save} >保存</Button>
                <Button style={{ marginLeft: '10px' }} onClick={() => preview(false)} >预览</Button>
                <Button onClick={() => preview(true)} >截图</Button>
                <Button onClick={clearCanvas} >清空画布</Button>
                <Button onClick={undo} >撤销</Button>
                <Button onClick={redo} >重做</Button>

                <label htmlFor='input' className="insert">
                    插入图片
                    <input
                        id="input"
                        type="file"
                        hidden
                        onChange={handleFileChange}
                    />
                </label>

               
                <Button disabled={!stateRender.areaData.components.length} onClick={compose} >组合</Button>
                <Button disabled={!stateRender.curComponent || stateRender.curComponent.isLock || stateRender.curComponent.component != 'Group'} onClick={decompose} >拆分</Button>
                <Button disabled={!stateRender.curComponent || stateRender.curComponent.isLock} onClick={lock} >锁定</Button>
                <Button disabled={!stateRender.curComponent || !stateRender.curComponent.isLock} onClick={unlock} >解锁</Button>
               
                <div className="canvas-config">
                    <span>画布大小</span>
                    <Input  value={stateConsumer.canvasStyleData.width} onChange={(e: any) => stateConsumer.canvasStyleData.width = e.target.value} />
                    <span>*</span>
                    <Input  value={stateConsumer.canvasStyleData.height} onChange={(e: any) => stateConsumer.canvasStyleData.height = e.target.value} />
                </div>

                <div className="canvas-config">
                    <span>画布比例</span>
                    <Input value={scale} onChange={(e: any) => hanndleCanvasScaleChange(e.target.value)} /> %
                </div>

                <Switch style={{top:-2,left:6}}  unCheckedChildren='OFF' checkedChildren='On' checked={switchValue} onChange={checked => {
                    setSwitchValue(checked)
                    handleToggleDarkMode(checked)
                }} />
                
                {(stateRender.curComponent && !stateRender.curComponent.isLock) || stateRender.areaData.components.length > 1 && 
                  <Select
                    style={{ width: 120 }}
                    options={alignList.map(item => {
                        return {
                            ...item,
                            disabled: item.isDisabled ? stateRender.areaData.components.length < 3 : false
                        }
                    })}
                    onChange={(e: any) => handleComponentAlign(e)}
                    placeholder="对齐方式"
                />}
            </div>}

            {/* 预览 */}
            {isShowPreview && <Preview isScreenshot={isScreenshot} onClose={handlePreviewChange} />}
            {isShowAceEditor && <AceEditor onCloseEditor={closeEditor} />}
        </div>
    )
}