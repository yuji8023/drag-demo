import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSnapshot } from 'valtio';

// 全局样式
import '@/assets/iconfont/iconfont.css'
import '@/styles/animate.less'
import '@/styles/reset.css'
import '@/styles/global.less'
import 'antd/lib/style/themes/default.less'
// import '@/styles/dark.less'
import 'antd/dist/antd.css';
import '@/styles/modified.css'

// 组件样式
import './App.less'

//状态管理
import store from './store/index'

// 引用工具
import { deepCopy, $ } from '@/utils/visual-drag-demo/utils'
import generateID from '@/utils/visual-drag-demo/generateID'
import { listenGlobalKeyDown } from '@/utils/visual-drag-demo/shortcutKey'
import { changeComponentSizeWithScale } from '@/utils/visual-drag-demo/changeComponentsSizeWithScale'
import { setDefaultcomponentData } from '@/store/snapshot'
import componentList from '@/custom-component/component-list'

// 组件
import Toolbar from '@/components/visual-drag-demo/Toolbar/Toolbar';
import ComponentList from '@/components/visual-drag-demo/ComponentList/ComponentList';
import RealTimeComponentList from '@/components/visual-drag-demo/RealTimeComponentList/RealTimeComponentList';
import Editor from '@/components/visual-drag-demo/Editor/Index/Index';
import DynamicComponent from '@/custom-component/DynamicComponent';
import CanvasAttr from '@/components/visual-drag-demo/CanvasAttr/CanvasAttr';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import { rightArithShift } from 'mathjs';
import EventList from './custom-component/common/EventList'

export default () => {
  const stateRender = useSnapshot(store.state);

  const [activeName, setActiveName] = useState('attr');
  const [reSelectAnimateIndex, setReSelectAnimateIndex] = useState(undefined);
  const [leftList, setLeftList] = useState(true);


  const isShowLeft = () => {
    setLeftList(!leftList)
  }

  const isShowRight = () => {
    store.isShowRightList(store.state)
  }

  const restore = () => {
    // 用保存的数据恢复画布
    if (localStorage.getItem('canvasData')) {
      let canvasData = localStorage.getItem('canvasData');
      if (canvasData) {
        setDefaultcomponentData(JSON.parse(canvasData))
        store.setComponentData(store.state, JSON.parse(canvasData))
      }
    }

    if (localStorage.getItem('canvasStyle')) {
      let canvasStyle = localStorage.getItem('canvasStyle');
      if (canvasStyle) {
        store.setCanvasStyle(store.state, JSON.parse(canvasStyle))
      }
    }
  }


  const handleDrop = (syntheticEvent) => {
    const e = syntheticEvent.nativeEvent;

    syntheticEvent.preventDefault()
    syntheticEvent.stopPropagation()

    const index = e.dataTransfer.getData('index')
    const rectInfo = $(store.state.editor).getBoundingClientRect()
    if (index) {
      const component = deepCopy(componentList[index])
      component.style.top = e.clientY - rectInfo.y
      component.style.left = e.clientX - rectInfo.x
      component.id = generateID()

      // 根据画面比例修改组件样式比例
      changeComponentSizeWithScale(component)

      store.addComponent(store.state, { component, index: undefined })
      store.recordSnapshot(store.state)
    }
  }

  const handleDragOver = (syntheticEvent) => {
    const e = syntheticEvent.nativeEvent;
    syntheticEvent.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  const handleMouseDown = (syntheticEvent) => {
    const e = syntheticEvent.nativeEvent;
    syntheticEvent.stopPropagation()
    store.setClickComponentStatus(store.state, false)
    store.setInEditorStatus(store.state, true)
  }

  const deselectCurComponent = (syntheticEvent) => {
    const e = syntheticEvent.nativeEvent;
    if (!store.state.isClickComponent) {
      store.setCurComponent(store.state, { component: null, index: null })
    }

    // 0 左击 1 滚轮 2 右击
    if (e.button != 2) {
      store.hideContextMenu(store.state)
    }
  }


  useEffect(() => {
    restore()

    // 全局监听按键事件
    listenGlobalKeyDown()

    const savedMode = localStorage.getItem('isDarkMode')
    if (savedMode !== null) {
      store.toggleDarkMode(store.state, JSON.parse(savedMode))
    } else {
      store.setEditTheme(store.state, false)
    }

    return () => {
      // 返回一个函数用来做清理工作，类似于 componentWillUnmount
    };
  }, []); // 空依赖数组意味着仅在挂载时运行一次

  return (
    <div className={classNames([!stateRender.isDarkMode ? 'dg-editor' : 'dg-editor'])}>
      <Toolbar />

      <main>
        {/*  左侧组件列表 */}
        <section className={classNames([leftList ? 'left active' : 'left inactive'])}>
          <ComponentList />
          <RealTimeComponentList />
        </section>
        <Button type='text' className='btn show-list left-btn' onClick={isShowLeft}>
          {leftList ? <LeftOutlined /> : <RightOutlined />}
          {/* <i className={classNames([leftList ? 'dx-icon-chevronleft' : 'dx-icon-chevronright'])}></i> */}
        </Button>

        {/* 中间画布 */}
        <section className="center" style={{ marginRight: stateRender.rightList ? '288px' : '0px' }}>
          <div
            className="content"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onMouseDown={handleMouseDown}
            onMouseUp={deselectCurComponent}
          >
            <Editor />
          </div>
        </section>

        {/* 右侧属性列表 */}
        <section className={classNames([stateRender.rightList ? 'right active' : 'right inactive'])}>
          {
            !!stateRender.curComponent ?
              <Tabs
                defaultActiveKey="1"
                className='v-tabs'
                // onChange={onChange}
                items={[
                  {
                    label: '属性',
                    key: '1',
                    children: <DynamicComponent is={stateRender.curComponent.component + "Attr"} />,
                  },
                  {
                    label: '动画',
                    key: '2',
                    children: `Content of Tab Pane 2`,
                  },
                  {
                    label: '事件',
                    key: '3',
                    children: <EventList />,
                  },
                ]}
              />
              // <TabPanel>
              //   <Item title="属性">
              //     <DynamicComponent is={stateRender.curComponent.component + "Attr"} />
              //   </Item>
              //   <Item title="动画" >
              //     动画
              //   </Item>
              //   <Item title="事件" >
              //     事件
              //   </Item>
              // </TabPanel>
              : 
              <CanvasAttr />
          }

        </section>
        <Button type='text' className='btn show-list right-btn' onClick={isShowRight}>
          {/* <i className={classNames([stateRender.rightList ? 'dx-icon-chevronright' : 'dx-icon-chevronleft'])}></i> */}
          {stateRender.rightList ? <RightOutlined /> : <LeftOutlined />}
        </Button>
      </main>

    </div>
  )
};
