import { message } from 'antd'

export const buildUrl =  (path, params = {}) => {
    const refinedParams: any = Object.fromEntries(
        Object.entries(params)
            .filter(
                ([key, value]) => ! (
                    undefined === key ||
                    null === key ||
                    undefined === value ||
                    null === value
                )
            )
            .map(
                ([key, value]) => [
                    key,
                    'object' === typeof value ? JSON.stringify(value) : value
                ]
            )
    )

    const qs = String(new URLSearchParams(refinedParams))
    return qs ? `${path}?${qs}` : path
}


const openWindow = (path, params = {}, target, features?: any) => {
    const url = buildUrl(path, params)
    return window.open(url, target, features)
}

const propsToClickEvent = (actionDetail, form=undefined, mapParmsToProps='') => {
    let callBack = () => {};
    const { actionType = '', target = false, targetPage, modalDetail={}, messageDetail = {}, href="" } = actionDetail;
    const targetType =  target ? '_blank' : '_self';
    if (actionType.includes("link")) {
       callBack = () => openWindow(href, {}, targetType)
    }
    if (actionType.includes("message")) {
      const type = messageDetail.messageType || 'info'
      callBack = () => message[type](messageDetail.messageContent)
    }
    // if (actionType == 'modal') {
    //   callBack = () => handleClick(form, 'open-modal', modalDetail, mapParmsToProps);
    // }
    if (actionType.includes('page') && targetPage.pageId) { 
      callBack = () => openWindow('/formilyPreview', { uvId: targetPage.pageId }, targetType)
    }
    return callBack;
}

export const clickEventToProps = (clickEventProps) => {
    let props: any = {};
    // let newClickEventProps: any = {};
    if (!clickEventProps?.enableCase) {
    // 兼容旧数据
    props.onClick = () => {
        const callBack = propsToClickEvent(clickEventProps.defaultAction);
        callBack && callBack();
    }
      
    }
    // else {
    //   // 逻辑条件事件
    //   const caseAction = clickEventProps.caseAction;
    //   if (caseAction && caseAction.length > 0) {
    //     props.onClick = (e) => {
    //       caseAction.forEach(item => {
    //         const caseDetail = item.caseDetail ? item.caseDetail[0] : undefined;
    //         if(!caseDetail) return;
    //         const result = caseDetail.depsType == 'Switch' ? caseDetail.resultBol : caseDetail.resultStr;
    //         const fieldState = form.getFieldState(caseDetail.deps) || undefined;
    //         if(!fieldState) return;
    //         const depsValue = caseDetail.depsType == 'Switch' ? Boolean(fieldState[caseDetail.propetry]) : fieldState[caseDetail.propetry];
    //         const reson = compareCase(depsValue, result, caseDetail.compare)
    //         if (reson) {
    //           const callBack = propsToClickEvent(item.actionDetail, form);
    //           callBack && callBack();
    //         }
    //       });
    //     }
    //   }else {
    //     props.onClick = () => {}
    //   }
    // }
    return props;
}