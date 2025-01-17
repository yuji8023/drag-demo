import React from "react";
// ...导入其他组件
import {
    VButton,
    VButtonAttr,

    Group,
    GroupAttr,

    Picture,
    PictureAttr,

    VText,
    VTextAttr,

    VTable,
    VTableAttr,

    RectShape,
    RectShapeAttr,

    CircleShape,
    CircleShapeAttr,

    SvgStar,
    SvgStarAttr,

    VSelect,
    VSelectAttr,

    VInput,
    VInputAttr,

    VTextarea,
    VTextareaAttr,

    VRadio,
    VRadioAttr,

    VCheckbox,
    VCheckboxAttr,

    VSwitch,
    VSwitchAttr,

    VTag,
    VTagAttr,

    VPassword,
    VPasswordAttr,

    VRate,
    VRateAttr,

    VProgress,
    VProgressAttr
} from "./index";


// 创建一个对象来映射组件
const COMPONENT_MAP: Record<string, any> = {
    VButton,
    VButtonAttr,

    Group,
    GroupAttr,

    Picture,
    PictureAttr,

    VText,
    VTextAttr,
    
    VTable,
    VTableAttr,

    RectShape,
    RectShapeAttr,

    CircleShape,
    CircleShapeAttr,

    SvgStar,
    SvgStarAttr,

    VSelect,
    VSelectAttr,

    VInput,
    VInputAttr,

    VTextarea,
    VTextareaAttr,

    VRadio,
    VRadioAttr,

    VCheckbox,
    VCheckboxAttr,

    VSwitch,
    VSwitchAttr,

    VTag,
    VTagAttr,

    VPassword,
    VPasswordAttr,

    VRate,
    VRateAttr,

    VProgress,
    VProgressAttr
};


// 属性接口
export interface IProps {
    is: string
    id?: string

    style?: Record<string, any>
    className?: string

    element?: Record<string, any>
    propValue?: any

    [key: string]: any
}

const DynamicComponent = (props: IProps) => {
    const { is } = props;

    // 根据传入的 is 选择组件
    const SelectedComponent = COMPONENT_MAP[is];
    // 如果组件存在，则渲染它，否则渲染 null 或者一个备用组件
    return SelectedComponent ? React.createElement(SelectedComponent, props) : null;
};

export default DynamicComponent;
