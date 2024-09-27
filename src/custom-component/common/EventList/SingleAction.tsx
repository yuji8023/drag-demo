import React from "react";
import { createSchemaField, useExpressionScope  } from "@formily/react";
import {
  Form,
  FormItem,
  Input,
  Switch,
  Select,
  Space,
  Radio,
} from "@formily/antd";

// import ChosePage from "./ChosePage";

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Switch,
    Select,
    Space,
    Radio,
  },
});

export default (props) => {
  const { actionTypeList } = props;
  // const $scope = useExpressionScope();

  return (
    <>
    <SchemaField.String
      title="事件类型"
      name="actionType"
      x-component="Select"
      x-decorator="FormItem"
      required
      enum={actionTypeList}
      x-component-props={{
        placeholder: "请选择",
        allowClear: true,
      }}
    />
    <SchemaField.Boolean
      title="新窗口打开"
      name="target"
      x-component="Switch"
      x-decorator="FormItem"
      x-reactions={{
        dependencies: [".actionType"],
        fulfill: {
          state: {
            visible:
              '{{!!$deps[0] && $deps[0].includes("link") || $deps[0].includes("page") }}',
          },
        },
      }}
    />

    <SchemaField.String
      title="请输入链接"
      name="href"
      x-component="Input"
      x-component-props={{
        placeholder: "请输入链接",
      }}
      x-decorator="FormItem"
      x-validator="url"
      required={true}
      description="以https://或http://开头的网址"
      x-reactions={{
        dependencies: [".actionType"],
        fulfill: {
          state: {
            visible: '{{!!$deps[0] && $deps[0].includes("link")}}',
          },
        },
      }}
    />
    <SchemaField.Object
      name="modalDetail"
      x-reactions={{
        dependencies: [".actionType"],
        fulfill: {
          state: {
            visible: '{{$deps[0] == "modal"}}',
          },
        },
      }}
    >
      <SchemaField.String
        title="弹窗内容"
        name="modalType"
        enum={[
          { label: "界面视图", value: "customPage" },
          { label: "信息提示", value: "confirmModal" },
          { label: "简单文本录入", value: "inputModal" },
        ]}
        x-decorator="FormItem"
        x-component="Radio.Group"
        
        x-component-props={{
          defaultValue: "confirmModal",
        }}
      />
      <SchemaField.String
        title="弹框名称"
        name="title"
        x-decorator="FormItem"
        x-component="Input"
        required
        x-component-props={{
          placeholder: "请填写弹框名称",
        }}
        x-reactions={{
          dependencies: [".modalType"],
          fulfill: {
            state: {
              visible: '{{$deps[0] != "customPage"}}',
            },
          },
        }}
      />
      <SchemaField.String
        title="提示信息"
        name="modalContent"
        x-decorator="FormItem"
        required
        x-component="Input.TextArea"
        x-reactions={{
          dependencies: [".modalType"],
          fulfill: {
            state: {
              visible: '{{!$deps[0] || $deps[0] == "confirmModal"}}',
            },
          },
        }}
        x-component-props={{
          placeholder: "请输入",
        }}
      />
      <SchemaField.String
        title="文本标题"
        name="labelName"
        x-decorator="FormItem"
        x-component="Input"
        x-reactions={{
          dependencies: [".modalType"],
          fulfill: {
            state: {
              visible: '{{$deps[0] == "inputModal"}}',
            },
          },
        }}
      ></SchemaField.String>
      {/* <SchemaField.Object 
        name="modalPage"
        title="选择弹窗视图"
        required
        x-decorator="FormItem"
        x-component={ChosePage}
        x-component-props={{
          pageType: "MODAL"
        }}
        x-reactions={{
          dependencies: [".modalType"],
          fulfill: {
            state: {
              visible: '{{$deps[0] == "customPage"}}',
            },
          },
        }}
      /> */}
      <SchemaField.Void
        x-reactions={{
          dependencies: [".modalType"],
          fulfill: {
            state: {
              visible: '{{ $deps[0] != "customPage"}}',
            },
          },
        }}
      >
        <SchemaField.Object name="cancelBtnProps">
          <SchemaField.Void
            title="取消按钮"
            x-decorator={FormItem}
            x-component="Space"
          >
            <SchemaField.String
              name="show"
              x-decorator="FormItem"
              x-component="Switch"
              x-decorator-props={{
                colon: false,
              }}
              x-component-props={{
                defaultChecked: true,
                checkedChildren: "显示",
                unCheckedChildren: "隐藏",
              }}
              x-index={0}
            />
            <SchemaField.String
              name="text"
              x-decorator="FormItem"
              x-decorator-props={{
                colon: false,
              }}
              x-component="Input"
              x-component-props={{
                placeholder: "默认是取消",
                defaultValue: "取消",
                style: {
                  width: "90px",
                },
              }}
              x-reactions={{
                dependencies: [".show"],
                fulfill: {
                  state: {
                    componentProps: {
                      disabled: '{{ $deps[0] == "0" }}',
                    },
                  },
                },
              }}
              x-index={1}
            />
          </SchemaField.Void>
        </SchemaField.Object>
        <SchemaField.Object name="okBtnProps">
          <SchemaField.Void
            title="确认按钮"
            x-decorator={FormItem}
            x-component="Space"
            x-component-props={{
              wrap: true,
            }}
          >
            <SchemaField.String
              name="show"
              x-decorator="FormItem"
              x-decorator-props={{
                colon: false,
              }}
              x-component="Switch"
              x-component-props={{
                defaultChecked: true,
                checkedChildren: "显示",
                unCheckedChildren: "隐藏",
              }}
              x-index={0}
            />
            <SchemaField.String
              name="text"
              x-decorator="FormItem"
              x-decorator-props={{
                colon: false,
              }}
              x-component="Input"
              x-component-props={{
                placeholder: "默认是确认",
                defaultValue: "确认",
                style: {
                  width: "90px",
                },
              }}
              x-reactions={{
                dependencies: [".show"],
                fulfill: {
                  state: {
                    componentProps: {
                      disabled: '{{ $deps[0] == "0" }}',
                    },
                  },
                },
              }}
              x-index={1}
            />
            {/* <SchemaField.Object 
              name="okCallbackPage"
              title="跳转视图(可选)"
              x-decorator="FormItem"
              x-component={ChosePage}
              x-component-props={{
                pageType: "PAGE"
              }}
              x-reactions={{
                dependencies: [".show"],
                fulfill: {
                  state: {
                    hidden: '{{ $deps[0] == "0" }}',
                    // componentProps: {
                    //   disabled: '{{ $deps[0] == "0" }}',
                    // },
                  },
                },
              }}
            /> */}
            <SchemaField.Boolean
              title="是否新页面打开"
              name="okTarget"
              x-decorator="FormItem"
              x-component="Switch"
              x-reactions={{
                dependencies: [".okCallbackUvId", ".show"],
                fulfill: {
                  state: {
                    visible: "{{!!$deps[0] && $deps[1] != '0'}}",
                  },
                },
              }}
              x-decorator-props={{
                colon: false,
              }}
            />
          </SchemaField.Void>
        </SchemaField.Object>
      </SchemaField.Void>
    </SchemaField.Object>
    {/* <SchemaField.Object 
      name="targetPage"
      title="跳转界面视图"
      x-decorator="FormItem"
      x-component={ChosePage}
      required
      x-component-props={{
        pageType: "PAGE"
      }}
      x-reactions={{
        dependencies: [".actionType"],
        fulfill: {
          state: {
            visible: '{{!!$deps[0] && $deps[0].includes("page")}}',
          },
        },
      }}
    /> */}
    <SchemaField.Object
      name="messageDetail"
      x-reactions={{
        dependencies: [".actionType"],
        fulfill: {
          state: {
            visible: '{{!!$deps[0] && $deps[0].includes("message")}}',
          },
        },
      }}
    >
      <SchemaField.String
        title="信息类型"
        name="messageType"
        x-component="Select"
        x-decorator="FormItem"
        required
        enum={[
          { label: '普通', value: 'info' },
          { label: '成功', value: 'success' },
          { label: '失败', value: 'error' },
          { label: '警告', value: 'warning' },
        ]}
        x-component-props={{
          placeholder: "请选择",
        }}
      />
      <SchemaField.String
        title="信息内容"
        name="messageContent"
        x-component="Input.TextArea"
        x-decorator="FormItem"
        required
        x-component-props={{
          placeholder: "请输入",
        }}
      />
    </SchemaField.Object>
  </>
  );
};
