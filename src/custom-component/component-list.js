import titleJpg from '../assets/title.jpg'

// 公共属性
export const commonAttr = {
    groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
    isLock: false, // 是否锁定组件
    collapseName: 'style', // 编辑组件时记录当前使用的是哪个折叠面板，再次回来时恢复上次打开的折叠面板，优化用户体验
    linkage: {
        duration: 0, // 过渡持续时间
        data: [
          // 组件联动
          {
            id: '', // 联动的组件 id
            label: '', // 联动的组件名称
            event: '', // 监听事件
            style: [{ key: '', value: '' }], // 监听的事件触发时，需要改变的属性
          },
        ],
    },
}

// style公共样式
export const commonStyle = {
    rotate: 0,// 旋转角度
    opacity: 1,// 不透明度
    top:0,//位置 上边距
    left:0,//位置 左边距
}

// propValue公共属性
export const commonProp = {
    caption: "名称"
}



// 编辑器左侧组件列表
const list = [
    {
        component: 'VText',
        label: '文字',
        propValue: {

        },
        icon: 'wenben',
        style: {
            width: 200,
            height: 34,
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
        },
    },
    {
        component: 'VButton',
        label: '按钮',
        propValue: {

        },
        clickEventProps: {},
        icon: 'button',
        style: {
            width: 100,
            height: 34,
            borderWidth: 1,
            borderColor: '',
            borderRadius: '',
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
            backgroundColor: '',
        },
    },
    {
        component: 'Picture',
        label: '图片',
        icon: 'tupian',
        propValue: {
            url: titleJpg,
            flip: {
                horizontal: false,
                vertical: false,
            },
        },
        style: {
            width: 300,
            height: 200,
            borderRadius: '',
        },
    },
    {
        component: 'RectShape',
        label: '矩形',
        propValue: '&nbsp;',
        icon: 'juxing',
        style: {
            width: 200,
            height: 200,
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: 'center',
            color: '',
            borderColor: '#000',
            borderWidth: 1,
            backgroundColor: '',
            borderStyle: 'solid',
            borderRadius: '',
            verticalAlign: 'middle',
        },
    },
    {
        component: 'VSelect',
        label: '下拉框',
        propValue: {
            caption: '',
            dataSource: []
        },
        icon: 'select',
        style: {
            width: 220,
            height: 34,
            borderWidth: 1,
            borderColor: '',
            borderRadius: '',
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
            backgroundColor: '',
        },
    },
    {
        component: 'VInput',
        label: '输入框',
        propValue: {
            caption: ''
        },
        icon: 'input',
        style: {
            width: 220,
            height: 34,
            borderWidth: 1,
            borderColor: '',
            borderRadius: '',
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
            backgroundColor: '',
        },
    },
    // {
    //     component: 'VPassword',
    //     label: '密码框',
    //     propValue: {
    //         caption: ''
    //     },
    //     icon: 'password',
    //     style: {
    //         width: 220,
    //         height: 34,
    //         borderWidth: 1,
    //         borderColor: '',
    //         borderRadius: '',
    //         fontSize: '',
    //         fontWeight: 400,
    //         lineHeight: '',
    //         letterSpacing: 0,
    //         textAlign: '',
    //         color: '',
    //         backgroundColor: '',
    //     },
    // },
    {
        component: 'VCheckbox',
        label: '复选框',
        propValue: {
            caption: 'Checkbox'
        },
        icon: 'checkbox',
        style: {
            width: 120,
            height: 26,
            borderWidth: 1,
            borderColor: '',
            borderRadius: '',
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
            backgroundColor: '',
        },
    },
    {
        component: 'VRate',
        label: '评分',
        propValue: {
            caption: 'rate'
        },
        icon: 'rate',
        style: {
            width: 180,
            height: 36,
            borderWidth: 1,
            borderColor: '',
            borderRadius: '',
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
            backgroundColor: '',
        },
    },
    {
        component: 'VProgress',
        label: '进度条',
        propValue: {
            percent: 30,
            type: 'line'
        },
        icon: 'rate',
        style: {
            width: 180,
            height: 36,
            borderWidth: 1,
            borderColor: '',
            borderRadius: '',
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
            backgroundColor: '',
        },
    },
    {
        component: 'VRadio',
        label: '单选',
        propValue: {
            direction: 'vertical',
            dataSource: [{
                label: '选项1'
            },
            {
                label: '选项2'
            }]
        },
        icon: 'radio',
        style: {
            width: 220,
            height: 34,
            borderWidth: 1,
            borderColor: '',
            borderRadius: '',
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
            backgroundColor: '',
        },
    },
    {
        component: 'VSwitch',
        label: '开关',
        propValue: {},
        icon: 'switch',
        style: {
            width: 60,
            height: 28,
            borderWidth: 1,
            borderColor: '',
            borderRadius: '',
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
            backgroundColor: '',
        },
    },
    {
        component: 'VTag',
        label: '标签',
        propValue: {
            caption: '标签'
        },
        icon: 'tag',
        style: {
            width: 66,
            height: 26,
            borderWidth: 1,
            borderColor: '',
            borderRadius: '',
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
            backgroundColor: '',
        },
    },
    {
        component: 'VTextarea',
        label: '文本域',
        propValue: {
            caption: ''
        },
        icon: 'textarea',
        style: {
            width: 220,
            height: 68,
            borderWidth: 1,
            borderColor: '',
            borderRadius: '',
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
            backgroundColor: '',
        },
    },
    // {
    //     component: 'LineShape',
    //     label: '直线',
    //     propValue: '',
    //     icon: 'zhixian',
    //     style: {
    //         width: 200,
    //         height: 2,
    //         backgroundColor: '#000',
    //     },
    // },
    {
        component: 'CircleShape',
        label: '圆形',
        propValue: '&nbsp;',
        icon: '24gl-circle',
        style: {
            width: 200,
            height: 200,
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: 'center',
            color: '',
            borderColor: '#000',
            borderWidth: 1,
            backgroundColor: '',
            borderStyle: 'solid',
            borderRadius: '',
            verticalAlign: 'middle',
        },
    },
    {
        component: 'SvgStar',
        label: '星形',
        icon: 'kongwujiaoxing',
        propValue: {
            caption: '' 
        },
        style: {
            width: 80,
            height: 80,
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: 'center',
            color: '',
            borderColor: '#000',
            backgroundColor: 'rgba(255, 255, 255, 1)',
        },
    },
    // {
    //     component: 'SVGTriangle',
    //     label: '三角形',
    //     icon: 'xingzhuang-sanjiaoxing',
    //     propValue: '',
    //     style: {
    //         width: 80,
    //         height: 80,
    //         fontSize: '',
    //         fontWeight: 400,
    //         lineHeight: '',
    //         letterSpacing: 0,
    //         textAlign: 'center',
    //         color: '',
    //         borderColor: '#000',
    //         backgroundColor: 'rgba(255, 255, 255, 1)',
    //     },
    // },
    {
        component: 'VTable',
        label: '表格',
        icon: 'biaoge',
        propValue: {
            column: [
                {
                    title: '序号',
                    dataIndex: 'index',
                    key: 'index',
                    textType: 'index'
                },
                {
                    title: '名称',
                    dataIndex: 'name',
                    key: 'name',
                    textType: 'text'
                },
            ],
            dataSource: [],
            data: [
                ['表头1', '表头2', '表头3'],
                ['内容1', '内容2', '内容3'],
            ],
            stripe: true,
            thBold: true,
        },
        request: {
            method: 'GET',
            data: [],
            url: '',
            series: false,
            time: 1000,
            paramType: '', // string object array
            requestCount: 0, // 请求次数限制，0 为无限
        },
        style: {
            width: 600,
            height: 240,
            fontSize: '',
            fontWeight: 400,
            textAlign: 'center',
            color: '',
            backgroundColor: 'rgba(255, 255, 255, 1)',
        },
    },
]

for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i]

    // 公共样式与组件样式合并
    item.style = { ...commonStyle, ...item.style }

    // 公共属性值与组件属性值合并
    item.propValue = { ...commonProp, ...item.propValue }

    // 公共属性与组件属合并
    list[i] = { ...commonAttr, ...item }
}

export default list
