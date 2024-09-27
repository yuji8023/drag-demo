import React, { useEffect, useMemo, useState, useRef } from 'react'
import { clone } from '@formily/shared'
import { createForm, onFieldValueChange, onFieldMount } from '@formily/core'
import { createSchemaField, useExpressionScope, useForm } from '@formily/react'
import { requestIdle, uid } from '@designable/shared'
// import { usePrefix } from '@designable/react'
// import XLSX from 'xlsx';
import moment from 'moment';
import {
  Form,
  ArrayTable,
  Input,
  Select,
  FormItem,
  NumberPicker,
  Switch
} from '@formily/antd'
import { Button, Spin, message, Empty, Modal, Form as AntdForm } from 'antd'
//@ts-ignore
// import Modal from "@/components/Modal/Modal";
import './styles.less'
import {documents } from './config'
// import { ClickEventSetter } from "../index";
// interface IDataSourceSetterProps {
//   value?: IReaction & { columns: any[] }
//   onChange?: (value: IReaction) => void
// }


const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    FormItem,
    ArrayTable,
    NumberPicker,
    Switch,
  },
})

const convertExcelDate = (date: any) => {
  if (date === undefined || date === null || date === '') {
    return ''
  }

  if( typeof date !== 'object'){
    return date
  }

  const formatDateStr = moment(date).format('YYYY/MM/DD')
  if (formatDateStr === 'Invalid date') {
    return date
  }
  return moment(date).add(1, 'days').format('YYYY-MM-DD')
}



export const DataSourceSetter = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [innerVisible, setInnerVisible] = useState(false)
  // let fileInput: any = useRef(null);
  const [cols, setCols] = useState([]);
  const $form = useForm()
  const $scope = useExpressionScope();
  
  // useEffect(() => {
  //   fileInput.current = document.createElement('input');
  //   fileInput.current.type = 'file';
  //   fileInput.current.onchange = handleChange;
  // }, [modalVisible]);

  // const handleChange = () => {
  //   if (fileInput.current && fileInput.current.files) {
  //     let file = fileInput.current.files[0];
  //     let fileReader = new FileReader();
  //     fileReader.readAsBinaryString(file);
  //     fileReader.onload = (ev: any) => {
  //       try {
  //         var data = ev.target.result,
  //           workbook = XLSX.read(data, {
  //             type: 'binary',
  //             cellDates: true
  //           }), // 以二进制流方式读取得到整份excel表格对象
  //           excelData: any = []; // 存储获取到的数据
  //       } catch (e) {
  //         message.error('文件类型不正确');
  //         return;
  //       }
  //       // 表格的表格范围，可用于判断表头是否数量是否正确
  //       let fromTo: any = '';

  //       for (let sheet in workbook.Sheets) {
  //         if (workbook.Sheets.hasOwnProperty(sheet)) {
  //           fromTo = workbook.Sheets[sheet]['!ref'];
  //           excelData = excelData.concat(
  //             XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { header: 'A' }),
  //           );
  //           break; // 如果只取第一张表，就取消注释这行
  //         }
  //       }
  //       excelData.shift();
  //       const head = excelData.splice(0, 1);
  //       excelData.splice(50)
  //       _coverExcelData(head[0], excelData);
  //     };
  //   }
  // };
  // const downexcel = () => {
  //   // 创建一个新的工作簿
  //   const workbook = XLSX.utils.book_new();
  //   const header = cols.map(item => item.dataIndex);
  //   const colTitle = cols.map(item => item.title);
  //   // 创建一个工作表
  //   const worksheet = XLSX.utils.aoa_to_sheet([
  //     [...colTitle, '前两行不可删除'],
  //     header // 表头
  //   ]);

  
    
  //   // 将工作表添加到工作簿
  //   XLSX.utils.book_append_sheet(workbook, worksheet, '模板');
  //   // 添加第二个工作表
  //   const sheet2Data = documents;
 
  //   const sheet2 = XLSX.utils.aoa_to_sheet(sheet2Data);
  //   XLSX.utils.book_append_sheet(workbook, sheet2, '辅助说明');

  //   // 写入文件
  //   XLSX.writeFile(workbook, '模板.xlsx');
  // }
  /**
   * @name 上传excel 文件，数据转换
   */
  // const _coverExcelData = (colObj: any, sourceList) => {
  //   const datas = sourceList.map(item => {
  //     const newObj: any = {}
  //     for (let key in item) {
  //       if (typeof item[key] == 'object') {
  //         item[key] = convertExcelDate(item[key])
  //       }
  //       newObj[colObj[key]] = item[key];
  //     }
  //     if (!newObj.id) {
  //       newObj.id = uid()
  //     }
  //     return newObj
  //   })
  //   form.setValuesIn('dataSource', datas);
  //   fileInput.current.value = '';
  // };
  const form = useMemo(() => {
    
    return createForm({
      values: {dataSource: clone(props.value)},
    })
  }, [modalVisible, props.value])

  const openModal = () => setModalVisible(true)
  const closeModal = () => setModalVisible(false)
  useEffect(() => {
    if (modalVisible) {
      // const columns = $form.getFieldState('x-component-props').value.columns || [];
      const columns = props.columns || [];
      const filterCols = columns.filter(item => !!item.dataIndex);
      setCols(filterCols)
      setInnerVisible(true)
    } else {
      setInnerVisible(false)
    }
  }, [modalVisible])

  return (
    <>
      <AntdForm.Item label="数据">
        <Button block onClick={openModal}>
            配置表格
        </Button>
      </AntdForm.Item>
      <Modal
        title="配置数据"
        width={'80vw'}
        style={{ top: 20 }}
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          minHeight: 320,
          background: "#fff",
          padding: "16px 24px",
          overflowY: "auto"
        }}
        centered
        transitionName=""
        maskTransitionName=""
        open={modalVisible}
        onCancel={closeModal}
        destroyOnClose
        onOk={async () => {
          form.validate().then(() => {
            form.submit((values) => {
              props.onChange?.(values.dataSource);
              console.log(values.dataSource)
            });
            closeModal();
          });
        }}
      >
        {
          !cols || cols.length === 0 ?
            (<Empty description='请先配置表头' />) :
            <div className="table-setter">
        <div className="source-add">
        {/* <Button
          className="input-btn"
          onClick={() => {
            fileInput.current.click();
          }}
        >
          上传excel
        </Button>
        <Button
          style={{marginLeft: 10}}
          onClick={() => {
            downexcel();
          }}
        >
          下载模板
        </Button> */}
        {/* <span style={{ color: "#696969", marginLeft: 10}}>支持直接编辑与上传 Excel 两种方式，建议不要超过 40 条</span> */}
      </div>
      <p>下面表格仅展示excel数据，不代表最终效果</p>
          {innerVisible ? (
            <Form form={form}>
              <SchemaField scope={{ ...$scope }}>
                <SchemaField.Array
                  name="dataSource"
                  x-decorator="FormItem"
                  x-component="ArrayTable"
                  x-component-props={{
                    pagination: { pageSize: 10 },
                    scroll: { x: "100%", y: "calc(80vh - 335px)" },
                    onAdd: () => {
                      const cols = form.getValuesIn("dataSource");
                      if (!cols[cols.length - 1].id) {
                        cols[cols.length - 1].id = uid();
                      }
                      form.setValuesIn("dataSource", cols);
                    },
                  }}
                >
                  <SchemaField.Object>
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      name="column1"
                      x-component-props={{
                        width: 50,
                        title: "排序",
                        align: "center",
                      }}
                    >
                      <SchemaField.Void
                        x-decorator="FormItem"
                        required
                        x-component="ArrayTable.SortHandle"
                      />
                    </SchemaField.Void>
                    {cols.map((col: any, index) => {
                      if(col.textType == 'index' || col.textType == 'borderIndex' ) {
                        return (
                          <SchemaField.Void
                            key={col.key || index }
                            x-component="ArrayTable.Column"
                            name={col.key}
                            x-component-props={{ title: col.title, width: 80 }}
                          >
                            <SchemaField.String
                              x-decorator="FormItem"
                              x-component="ArrayTable.Index"
                            />
                          </SchemaField.Void>
                        )
                      }
                      return (
                        <SchemaField.Void
                          x-component="ArrayTable.Column"
                          name={col.key}
                          x-component-props={{ title: col.title, width: 260 }}
                        >
                          <SchemaField.String
                            x-decorator="FormItem"
                            name={col.dataIndex}
                            // required
                            x-component="Input"
                            x-decorator-props={{
                              style: { width: col.textType == 'button' ? "calc(100% - 128px)" : "100%", marginRight: '6px', float: 'left' },
                            }}
                          />
                          {/* {
                            col.textType == 'button' && 
                            <SchemaField.String
                              x-decorator="FormItem"
                              name={col.dataIndex + 'props'}
                              x-component={ClickEventSetter}
                              x-component-props={{
                                senceType: "button",
                                defaultValue: undefined
                              }}
                              x-decorator-props={{
                                  style: { width: "120px", position: 'relative', top: '1px' },
                              }}
                            />
                          } */}
                        </SchemaField.Void>
                      );
                    })}

                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      name="column6"
                      x-component-props={{
                        title: "操作",
                        dataIndex: "operations",
                        width: 50,
                        fixed: "right",
                      }}
                    >
                      <SchemaField.Void x-component="FormItem">
                        <SchemaField.Void x-component="ArrayTable.Remove" />
                      </SchemaField.Void>
                    </SchemaField.Void>
                  </SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayTable.Addition"
                    title="添加条目"
                  />
                </SchemaField.Array>
              </SchemaField>
            </Form>
          ) : (
            <div className="example">
              <Spin />
            </div>
          )}
        </div>
          
        }
        
      </Modal>
    </>
  );
}
