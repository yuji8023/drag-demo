import React from "react";
// import { PathSelector } from "./PathSelector";
import "./singleCase.less";
import { observer, useField } from "@formily/react";
import { createSchemaField, useExpressionScope } from "@formily/react";
import { Tooltip } from "antd";
import { ArrayTable, FormItem, Input, Select } from "@formily/antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
    ArrayTable,
  },
});

const FieldStateProperties = [
  {
    label: "value",
    value: "value",
  },
  // {
  //     label: 'title',
  //     value: 'title',
  // },
  // {
  //     label: 'checked',
  //     value: 'checked',
  // },
  // {
  //     label: 'description',
  //     value: 'description',
  // },
];
const compareList = [
  { label: "等于", value: "eq" },
  { label: "不等于", value: "neq" },
  { label: "大于", value: "gt" },
  { label: "小于", value: "lt" },
  { label: "大于等于", value: "gte" },
  { label: "不为空", value: "valid" },
  { label: "未填写", value: "void" },
];

export default observer(() => {
  return (
    <SchemaField.Object>
      {/* <SchemaField.Void
        x-component="ArrayTable.Column"
        x-component-props={{
          title: <>依赖&nbsp;&nbsp;<Tooltip title="依赖只支持输入框、开关、单选、复选、下拉框">
            <InfoCircleOutlined style={{ color: "#666" }} />
          </Tooltip></>,
          width: 240,
        }}
      >
        <SchemaField.String
          name="deps"
          x-decorator="FormItem"
          x-component={PathSelector}
          required
          x-component-props={{
            placeholder: "请选择",
          }}
        />
      </SchemaField.Void> */}
      <SchemaField.Void
        x-component="ArrayTable.Column"
        x-component-props={{
          title: "依赖类型",
          width: 240,
        }}
        x-hidden
      >
        <SchemaField.String
          name="depsType"
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{
            placeholder: "请选择",
          }}
          x-reactions={(field: any) => {
            // if (isVoidField(field)) return
            const propetry = field.query(".deps").get("inputValues");
            if (!propetry || !propetry[1]) return;
            if (propetry[1]?.props["x-component"] == 'Select') {
              const componentProps = propetry[1]?.props["x-component-props"];
              if (componentProps?.mode == 'multiple') {
                // 如果是多选，走复选框的包含逻辑
                field.value = 'Checkbox.Group';
                return;
              }
            }
            field.value = propetry[1]?.props["x-component"];
          }}
        />
      </SchemaField.Void>
      <SchemaField.Void
        x-component="ArrayTable.Column"
        x-component-props={{
          title: "属性",
          width: 200,
        }}
      >
        <SchemaField.String
          name="propetry"
          default="value"
          readOnly
          x-decorator="FormItem"
          x-component="Select"
          enum={FieldStateProperties}
        />
      </SchemaField.Void>
      <SchemaField.Void
        x-component="ArrayTable.Column"
        x-component-props={{
          title: "比较",
          width: 200,
        }}
      >
        <SchemaField.String
          name="compare"
          default="eq"
          x-decorator="FormItem"
          x-component="Select"
          enum={compareList}
          x-reactions={{
            dependencies: [".depsType"],
            fulfill: {
              state: {},
              run: "$effect(() => { const compareList = [ { label: '等于', value: 'eq', }, { label: '不等于', value: 'neq', }, { label: '大于', value: 'gt', }, { label: '小于', value: 'lt', }, { label: '大于等于', value: 'gte', },{label:'不为空',value: 'valid'}, {label:'未填写', value: 'void'} ]; const checkCompareList = [ { label: '包含', value: 'include', }, { label: '不包含', value: 'exclude', }, ] \n  $self.dataSource = $deps[0] == 'Checkbox.Group'\n    ? checkCompareList\n    : compareList; \r\n  if(($deps[0] == 'Checkbox.Group' && !(['include', 'exclude'].includes($self.value))) || ($deps[0] != 'Checkbox.Group' && ['include', 'exclude'].includes($self.value))) {\n $self.value = $deps[0] == 'Checkbox.Group' ? 'include' : 'eq'  \r\n }}, [$deps[0]])\n",
            },
          }}
        />
      </SchemaField.Void>
      <SchemaField.Void
        x-component="ArrayTable.Column"
        x-component-props={{
          title: "值",
          width: 200,
        }}
      >
        <SchemaField.String
          name="resultStr"
          x-decorator="FormItem"
          x-component="Input"
          required
          x-reactions={{
            dependencies: [".depsType", ".compare"],
            fulfill: {
              state: {
                visible: '{{$deps[0] != "Switch" && $deps[1] != "valid" && $deps[1] != "void" }}',
              },
            },
          }}
        />
        <SchemaField.String
          name="resultBol"
          x-decorator="FormItem"
          x-component="Select"
          required
          enum={[
            { label: "true", value: 1 },
            { label: "false", value: 0 },
          ]}
          x-reactions={{
            dependencies: [".depsType"],
            fulfill: {
              state: {
                hidden: '{{$deps[0] != "Switch"}}',
              },
            },
          }}
        />
      </SchemaField.Void>
    </SchemaField.Object>
  );
});
