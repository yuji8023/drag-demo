import React, { useState, useCallback, useEffect, useMemo, useRef, Fragment } from 'react';
import classNames from 'classnames';
import ProTable, { ProTableProps } from '@ant-design/pro-table'
import { Button, Input, Switch, Space, Tag, Checkbox } from 'antd'
import './VTable.less'
import { IProps } from '../DynamicComponent';

const transToMap = (arr = []) => {
    return arr.reduce((accumulator, current: any) => {
        accumulator[current.value] = {
        text: current.text,
        status: current.color
        };
        return accumulator;
    }, {});
}

const fillColor = (arr, index) => {
    for (let obj of arr) {
      if (obj.value.includes(index)) {
        return obj;
      }
    }
    return null;
}

const customType = ['button', 'input', 'switch', 'wrapText', 'checkbox', 'labels']
const enumTypeList = ['select']


export default ({ propValue, id, style, className, preview, element }: IProps) => {
    const tableRef = useRef(null);
    const showPagination = true;

    const formatCols = propValue.column.filter(item => !!item.dataIndex).map(item => {
        const col: any = {
          title: item.title,
          dataIndex: item.dataIndex,
          align: item.align,
          width: item.width,
          fixed: item.fixed,
          copyable: item.copyable,
          ellipsis: item.ellipsis,
          // onFilter: item.onFilter,
          filters: item.onFilter ? (item.enumsProps || [{ text: '全部', value: '' }]) : false,
          tooltip: item.tooltip,
          render: (record, _, index) => {
            let recordNode = record;
            if (item.textType == 'button') {
              const clickEventProps = item.clickEventProps || {};
              if (!preview) {
                return <Button key={item.actionId} type="link">{record}</Button>
              }
              const recordClickProps = _[`${item.dataIndex}props`];
              let clickProps: any = {};
              let btnProps:any = {
                key: item.actionId,
                type: 'link',
              }
            //   if(clickEventProps) {
            //     clickProps = recordClickProps ? clickEventToProps(recordClickProps, form) : clickEventToProps(clickEventProps, form);
            //   }
              recordNode = <Button {...btnProps} onClick={()=> {clickProps.onClick && clickProps.onClick();}} >{record}</Button>
            }
            // if (item.textType == 'input') {
            //   recordNode = <Input style={{ width: '100%'}} placeholder='请输入' defaultValue={record} onPressEnter={(e) => handleInputSave(e, _)} onBlur={(e) => handleInputSave(e, _)}/>
            // }
            if (item.textType == 'wrapText') {
              recordNode = <pre>{record}</pre>
            }
            // if (item.textType == 'image') {
            //   return <Image src={record} style={{ maxWidth: '60px', maxHeight: '60px' }} preview={false}/>
            // }
            if (item.textType == 'switch') {
              recordNode = <Switch defaultChecked={record == 1} disabled={true}/>
            }
            if (item.textType == 'checkbox') {
              recordNode = <Checkbox defaultChecked={record == 1} disabled={true}/>
            }
            if (item.textType == 'labels') {
              const { children } = record?.props || {};
              let text = children ? children : record
              //@ts-ignore
              const arr = `${text}`.replaceAll('，', ',').split(',');
              const valueEnum = transToMap(item.enumsProps)
              recordNode = (<Space>
                {
                  arr.map((jtem, jndex) => {
                    const statusInfo = valueEnum[jtem];
                    if (statusInfo) {
                      return (
                        <Tag key={jndex} color={statusInfo.status}>
                          {statusInfo.text}
                        </Tag>
                      );
                    }
                    return jtem
                  })
                }
              </Space>)
            }
            if (item.ellipsis) {
              recordNode = <div style={{ width: item.width }}>{recordNode}</div>
            }
    
            return recordNode
          }
        };
        if (item.bgColorList && item.bgColorList.length > 0) {
          col.onCell = (record, index) => {
            const colorObj = fillColor(item.bgColorList, index + 1) || {};
            const bgColor = colorObj.color; // 假设fillColor函数返回颜色
            const textColor = colorObj.textColor
            return {
              style: {
                backgroundColor: bgColor || 'initial', // 如果没有颜色返回，则使用默认值
                color: textColor
              },
            };
          }
        };
        if (!customType.includes(item.textType)) {
          col.valueType = item.textType
        }
        if (enumTypeList.includes(item.textType)) {
          col.valueEnum = transToMap(item.enumsProps)
        }
        if (item.textType == 'radio') {
          col.valueEnum = {
            1: {
              text: '未解决',
              status: 'Error',
            },
            2: {
              text: '已解决',
              status: 'Success',
            },
          }
        }
        // if (item.textType != 'editText' || props['data-designer-node-id'] || field.decoratorProps['data-designer-node-id']) {
        //   return col;
        // }
        return {
          ...col,
        //   onCell: (record) => ({
        //     record,
        //     editable: item.textType == 'editText',
        //     dataIndex: item.dataIndex,
        //     title: col.title,
        //     handleSave,
        //   }),
        };
    
      })

    return (
      <div id={id} className={classNames(className, 'v-table')} style={style}>
        <ProTable
          className='v-protable'
          search={false}
        //   {...props}
        //   components={components}
          actionRef={tableRef}
          options={false}
          tableAlertRender={() => false}
          tableAlertOptionRender={() => false}
          columns={propValue.column}
          dataSource={propValue.dataSource}
        //   summary={() => {
        //     if (!statics || statics.length == 0) {
        //       return null;
        //     }
        //     return (
        //       <Table.Summary fixed={staticsFixed}>
        //         <Table.Summary.Row>
        //           {statics.map((item, index) => {
        //             return (
        //               <Table.Summary.Cell
        //                 key={item.dataIndex}
        //                 colSpan={item.colSpan}
        //                 index={index}
        //               >
        //                 <div
        //                   style={{ color: item.color, textAlign: item.align }}
        //                 >
        //                   {item.title}
        //                 </div>
        //               </Table.Summary.Cell>
        //             );
        //           })}
        //         </Table.Summary.Row>
        //       </Table.Summary>
        //     );
        //   }}
          scroll={{
            x: "max-content",
            y: scrollY ? scrollY : undefined,
          }}
          rowKey={(record: any) => {
            return record.id;
          }}
          pagination={
            showPagination
              ? {
                  defaultPageSize: 10,
                  pageSizeOptions: [10, 20, 30, 40],
                  showQuickJumper: true,
                  showSizeChanger: true,
                }
              : false
          }
          rowClassName={() => "editable-row"}
        />
      </div>
      // <div id={id} className={classNames(className)} style={style}>
      // <table id={id} className={classNames("v-table", className)} style={style}>
      //     <tbody>
      //         {
      //             propValue.data.map((item: any, index: number) => {
      //                 return (
      //                     <tr
      //                         key={index}
      //                         className={classNames({
      //                             stripe: propValue.stripe && index % 2,
      //                             bold: propValue.thBold && index === 0,
      //                         })}
      //                     >
      //                         {item.map((e: any, i: number) => {
      //                             return (
      //                                 <td key={i}>{e}</td>
      //                             )
      //                         })}
      //                     </tr>
      //                 )
      //             })
      //         }
      //     </tbody>
      // </table>
      // </div>
    );
}