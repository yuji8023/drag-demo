import React, { useEffect, useMemo, useState } from "react";
import { clone } from "@formily/shared";
import { createForm } from "@formily/core";
import { createSchemaField, useExpressionScope, observer  } from "@formily/react";
import { requestIdle } from "@designable/shared";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import {
  Form,
  FormItem,
  ArrayCollapse,
  ArrayTable,
  Input,
  Switch,
  Select,
  Space,
  Radio,
} from "@formily/antd";
import { Button, Switch as AntdSwitch, Modal } from "antd";
//@ts-ignore
// import Modal from "@/components/Modal/Modal";
import cls from "classnames";
import SingleAction from './SingleAction'
import "./styles.less";
import SingleCase from "./SingleCase";
// import { oldDataCompatibility } from "../../../../service/utils";

const SchemaField = createSchemaField({
  components: {
    Form,
    FormItem,
    ArrayCollapse,
    ArrayTable,
    Input,
    Switch,
    Select,
    Space,
    Radio,
  },
});

const actionList = [
  { label: "删除气泡确认框", value: "del" },
  { label: "打开弹窗", value: "modal" },
  { label: "跳转界面视图", value: "page" },
  { label: "打开超链接", value: "link" },
  { label: "全局提示", value: "message" }
];

const senceObj = {
  button: ["del"],
  modal: ["del", "modal"],
  table: [],
};

export const ClickEventSetter = (props) => {
  const { exclude, senceType, hideClick, showEnable = false } = props;
  const excludes = exclude || senceObj[senceType] || [];
  const actionTypeList = actionList.filter(
    (item) => !excludes.includes(item.value)
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [innerVisible, setInnerVisible] = useState(false);
  const $scope = {
    isTemplate: false
  }
  let copyVal = clone(props.value)

  useEffect(() => {
    if (modalVisible) {
      requestIdle(
        () => {
          setInnerVisible(true);
        },
        {
          timeout: 100,
        }
      );
    } else {
      setInnerVisible(false);
    }
  }, [modalVisible]);
  const form = useMemo(() => {
    return createForm({
      values: {
        ...copyVal,
      },
    });
  }, [modalVisible, props.value]);
 
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const edited = copyVal?.actionType || copyVal?.defaultAction?.actionType || (copyVal?.enableCase && copyVal?.caseAction)

  return (
    <>
      <div style={{ width: "100%", display: "flex" }}>
        <Button
          //@ts-ignore
          className={cls({
            "dn-btn-suc": edited,
          })}
          style={{ flex: 1 }}
          onClick={openModal}
          disabled={hideClick || $scope.isTemplate}
        >
          {$scope.isTemplate
            ? "模板禁用"
            : edited
            ? "重新配置"
            : "配置点击事件"}
        </Button>
        {edited && (
          <Button
            style={{ width: "32px", borderLeft: "none", color: "#FF7875" }}
            onClick={() => props.onChange(undefined)}
            //@ts-ignore
            icon={<CloseCircleOutlined />}
          ></Button>
        )}
      </div>
      <Modal
        title="配置点击事件"
        width={740}
        style={{ top: 20 }}
        bodyStyle={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          maxHeight: "calc(80vh - 100px)",
          minHeight: 546,
          background: "#fff",
          padding: "16px 24px 0",
        }}
        centered
        transitionName=""
        maskTransitionName=""
        okText='确认'
        cancelText='取消'
        open={modalVisible}
        onCancel={closeModal}
        destroyOnClose
        onOk={() => {
          form.validate().then(() => {
            form.submit((values) => {
              props.onChange?.(values);
            });
            closeModal();
          });
        }}
      >
        {innerVisible && (
          <Form
            className="mb12 pt20"
            form={form}
            layout={"vertical"}
            labelCol={6}
            wrapperCol={14}
          >
            <SchemaField scope={{ ...$scope }}>
              <SchemaField.Boolean
                name={"enableCase"}
                x-decorator={"FormItem"}
                x-decorator-props={{
                  className: "caseBox",
                  label: "enable",
                  layout: "horizontal",
                  tooltip: "是否启用逻辑，可以简单的配置条件",
                  labelCol: 14,
                  wrapperCol: 8,
                }}
                x-hidden={!showEnable}
                x-component={"Switch"}
                x-component-props={{
                  checkedChildren: "启用",
                  unCheckedChildren: "禁用",
                  style: { width: "60px" },
                  onChange: val => {
                    if (val) {
                      const caseAction = form.getValuesIn('caseAction')
                      if (!caseAction || caseAction.length == 0) {
                        form.setValuesIn('caseAction', [{}])
                      }
                    }
                  }
                }}
              />
              <SchemaField.Object
                name={"defaultAction"}
                // x-component={SingleAction}
                // x-component-props={{
                //   actionTypeList: actionTypeList,
                //   $scope,
                // }}
                x-reactions={{
                  dependencies: [".enableCase"],
                  fulfill: {
                    schema: {
                      "x-visible": "{{!$deps[0]}}",
                    },
                    // state: {
                    //   visible: '{{!$deps[0]}}'
                    // }
                  },
                }}
              >
                <SingleAction actionTypeList={actionTypeList} />
              </SchemaField.Object>
              <SchemaField.Array
                name="caseAction"
                x-decorator="FormItem"
                x-component="ArrayCollapse"
                x-component-props={{
                  // accordion: true,
                }}
                x-reactions={{
                  dependencies: ['.enableCase'],
                  fulfill: {
                    schema: {
                      "x-visible":  '{{!!$deps[0]}}'
                    },
                  }
                }}
              >
                {/* @ts-ignore */}
                <SchemaField.Object
                  x-component="ArrayCollapse.CollapsePanel"
                  x-component-props={{
                    header: "情况",
                  }}
                >
                  <SchemaField.Void x-component="ArrayCollapse.Index" />
                  <SchemaField.Array
                    name="caseDetail"
                    title="条件"
                    default={[{ propetry: 'value'}]}
                    // x-decorator="FormItem"
                    x-component="ArrayTable"
                  >
                    <SingleCase />
                  </SchemaField.Array>
                  <SchemaField.Object
                    name={"actionDetail"}
                    title="事件"
                    // x-component={SingleAction}
                    // x-component-props={{
                    //   actionTypeList: actionTypeList.filter(
                    //     (item) => item.value != 'del'
                    //   ),
                    // }}
                    x-reactions={{
                      dependencies: [".enableCase"],
                      fulfill: {
                        schema: {
                          "x-visible": "{{!$deps[0]}}",
                        },
                      },
                    }}
                  >
                    <SingleAction actionTypeList={actionTypeList.filter(
                        (item) => item.value != 'del'
                      )} />
                  </SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayCollapse.Remove"
                    x-reactions={{
                      dependencies: ['...caseAction'],
                      fulfill: {
                        state: {
                          "hidden":  '{{$deps[0].length == 1 }}'
                        },
                      }
                    }}
                  />
                  <SchemaField.Void x-component="ArrayCollapse.MoveUp" />
                  <SchemaField.Void x-component="ArrayCollapse.MoveDown" />
                </SchemaField.Object>

                <SchemaField.Void
                  x-component="ArrayCollapse.Addition"
                  title="添加事件"
                  x-reactions={{
                    dependencies: ['..caseAction'],
                    fulfill: {
                      schema: {
                        "x-visible":  '{{$deps[0].length < 3 }}'
                      },
                    }
                  }}
                />
              </SchemaField.Array>
            </SchemaField>
          </Form>
        )}
      </Modal>
    </>
  );
}