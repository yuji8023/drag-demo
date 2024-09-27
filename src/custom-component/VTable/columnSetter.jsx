import React, { useEffect, useMemo, useState } from "react";
import { clone } from "@formily/shared";
import { createForm } from "@formily/core";
import { createSchemaField, useExpressionScope } from "@formily/react";
import { requestIdle, uid } from "@designable/shared";
import {
  Form,
  ArrayTable,
  Input,
  Select,
  FormItem,
  NumberPicker,
  Switch,
} from "@formily/antd";
import { Button, Spin, Modal, Form as AntdForm } from "antd";
//@ts-ignore
// import Modal from "@/components/Modal/Modal";
import "./styles.less";
// import { ClickEventSetter } from "../index";
import { options, defaultEnum } from "./config";
// import { TagsSetter } from "./tags";
// import { ColorBgSetter } from "./colorBg";

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    FormItem,
    ArrayTable,
    NumberPicker,
    Switch,
  },
});

export const ColumnsSetter = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [innerVisible, setInnerVisible] = useState(false);
  const $scope = useExpressionScope();

  const form = useMemo(() => {
    return createForm({
      values: { columns: clone(props.value) },
    });
  }, [modalVisible, props.value]);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  useEffect(() => {
    if (modalVisible) {
      requestIdle(
        () => {
          setInnerVisible(true);
        },
        {
          timeout: 4000,
        }
      );
    } else {
      setInnerVisible(false);
    }
  }, [modalVisible]);
  return (
    <>
      <AntdForm.Item label="表头">
        <Button block onClick={openModal}>
            配置表头
        </Button>
      </AntdForm.Item>
      <Modal
        title="配置表头"
        width={'80vw'}
        style={{ top: 20 }}
        bodyStyle={{
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "80vh",
          minHeight: 320,
          background: "#fff",
          padding: "16px 24px"
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
              props.onChange?.(values.columns);
            });
            closeModal();
          });
        }}
      >
        <div className={'table-setter'}>
          {innerVisible ? (
            <Form form={form}>
              <SchemaField scope={{ ...$scope }}>
                <SchemaField.Array
                  name="columns"
                  default={[{}]}
                  x-component="ArrayTable"
                  x-component-props={{
                    scroll: {
                      x: "max-content",
                      y: "calc(80vh - 235px)"
                    },
                    className: "scroll-array-table",
                    onAdd: () => {
                      const cols = form.getValuesIn("columns");
                      if (!cols[cols.length - 1].dataIndex) {
                        cols[cols.length - 1].dataIndex = uid();
                      }
                      form.setValuesIn("columns", cols);
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
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{
                        title: "标题",
                        width: 120,
                        fixed: "left",
                      }}
                    >
                      <SchemaField.String
                        name="title"
                        x-decorator="FormItem"
                        x-component="Input"
                        required
                        x-component-props={{
                          placeholder: "请输入",
                        }}
                      />
                    </SchemaField.Void>
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{
                        title: "唯一标识",
                        width: 120,
                        fixed: "left",
                      }}
                    >
                      <SchemaField.String
                        name="dataIndex"
                        x-decorator="FormItem"
                        required
                        x-component="Input"
                      />
                    </SchemaField.Void>
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{
                        title: "类型",
                        width: 130,
                        fixed: "left",
                      }}
                    >
                      <SchemaField.String
                        name="textType"
                        x-decorator="FormItem"
                        x-component="Select"
                        enum={options}
                        x-component-props={{
                          placeholder: "请选择",
                          defaultValue: "text",
                          dropdownMatchSelectWidth: false,
                        }}
                      />
                    </SchemaField.Void>
                    {/* <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{
                        title: "额外内容",
                      }}
                    >
                      <SchemaField.Array
                        name="enumsProps"
                        x-component={TagsSetter}
                        x-reactions={{
                          dependencies: [".textType"],
                          fulfill: {
                            state: {
                              visible:
                                '{{ $deps[0] == "labels" || $deps[0] == "select" }}',
                            },
                          },
                        }}
                        x-component-props={{
                          defaultValue: defaultEnum,
                        }}
                      />
                      <SchemaField.Object
                        name="clickEventProps"
                        x-component={ClickEventSetter}
                        x-component-props={{
                          senceType: "button",
                          defaultValue: undefined,
                          showEnable: true
                        }}
                        x-reactions={{
                          dependencies: [".textType"],
                          fulfill: {
                            state: {
                              visible: '{{ $deps[0] == "button" }}',
                            },
                          },
                        }}
                      />
                    </SchemaField.Void> */}
                    {/* <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{
                        title: "背景色配置",
                        width: 100,
                      }}
                    >
                      <SchemaField.Array
                        name="bgColorList"
                        x-decorator="FormItem"
                        x-component={ColorBgSetter}
                      />
                    </SchemaField.Void> */}
                    {/* <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{
                        title: "支持复制",
                        width: 100,
                      }}
                    >
                      <SchemaField.Boolean
                        name="copyable"
                        x-decorator="FormItem"
                        x-component="Switch"
                        x-reactions={{
                          dependencies: [".textType"],
                          fulfill: {
                            state: {
                              visible:
                                '{{!$deps[0] || $deps[0] == "text" || $deps[0] == "date"}}',
                            },
                          },
                        }}
                      />
                    </SchemaField.Void> */}
                    {/* <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{
                        title: "支持筛选",
                        width: 100,
                      }}
                    >
                      <SchemaField.Boolean
                        name="onFilter"
                        x-decorator="FormItem"
                        x-component="Switch"
                      />
                    </SchemaField.Void> */}
                    {/* <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{
                        title: "自动缩略",
                        width: 100,
                      }}
                    >
                      <SchemaField.Boolean
                        name="ellipsis"
                        x-decorator="FormItem"
                        x-component="Switch"
                        x-reactions={{
                          dependencies: [".textType"],
                          fulfill: {
                            state: {
                              visible:
                                '{{!$deps[0] || $deps[0] == "text" || $deps[0] == "date"}}',
                            },
                          },
                        }}
                      />
                    </SchemaField.Void> */}
                    {/* <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{
                        title: "表头提示",
                        width: 120,
                      }}
                    >
                      <SchemaField.String
                        name="tooltip"
                        x-decorator="FormItem"
                        x-component="Input.TextArea"
                        x-component-props={{
                          allowClear: true,
                          autoSize: true,
                        }}
                      />
                    </SchemaField.Void> */}
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{
                        title: "宽度",
                        width: 100,
                      }}
                    >
                      <SchemaField.String
                        name="width"
                        x-decorator="FormItem"
                        x-component="NumberPicker"
                        x-component-props={{
                          placeholder: "请输入",
                        }}
                      />
                    </SchemaField.Void>
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{
                        title: "对齐方式",
                        width: 100,
                      }}
                    >
                      <SchemaField.String
                        name="align"
                        x-decorator="FormItem"
                        x-component="Select"
                        enum={[
                          { label: "左对齐", value: "left" },
                          { label: "居中", value: "center" },
                          { label: "右对齐", value: "right" },
                        ]}
                        x-component-props={{
                          placeholder: "请选择",
                          defaultValue: "left",
                        }}
                      />
                    </SchemaField.Void>
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{
                        title: "固定列",
                        width: 100,
                      }}
                    >
                      <SchemaField.String
                        name="fixed"
                        x-decorator="FormItem"
                        x-component="Select"
                        enum={[
                          { label: "否", value: false },
                          { label: "左固定", value: "left" },
                          { label: "右固定", value: "right" },
                        ]}
                        x-component-props={{
                          placeholder: "请选择",
                          defaultValue: false,
                        }}
                      />
                    </SchemaField.Void>
                    <SchemaField.Void
                      x-component="ArrayTable.Column"
                      x-component-props={{
                        fixed: "right",
                        title: '操作',
                        align: "center",
                        width: 80,
                      }}
                    >
                      <SchemaField.Markup
                        type="void"
                        x-component="ArrayTable.Remove"
                      />
                    </SchemaField.Void>
                  </SchemaField.Object>
                  <SchemaField.Void
                    title="新增标头"
                    x-component="ArrayTable.Addition"
                    x-component-props={{ style: { marginTop: 8 } }}
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
      </Modal>
    </>
  );
};
