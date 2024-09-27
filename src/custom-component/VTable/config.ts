const valueEnum = {
  all: { text: '全部', status: 'Default' },
  open: {
    text: '未解决',
    status: 'Error',
  },
  closed: {
    text: '已解决',
    status: 'Success',
    disabled: true,
  },
  processing: {
    text: '解决中',
    status: 'Processing',
  },
};

export const options = [
  { value: 'index', label: '序号' },
  { value: 'indexBorder', label: '序号带边框' },
  { value: `text`, label: `文本`, initialValue: '123456' },
  { value: 'wrapText', label: '多行文本', initalValue: '123456\n121212' },
  { value: 'button', label: '按钮', initalValue: '按钮' },
  { value: 'editText', label: '可编辑文本' },
  { value: 'input', label: '输入框' },
  { value: 'labels', label: '标签' },

  { value: `password`, label: `密码`, initialValue: '123456' },
  { value: `money`, label: `金额`, initialValue: '123456' },
  // { value: `textarea`, label: `文本域`, initialValue: '123456\n121212' },
  { value: `date`, label: `日期`, initialValue: Date.now() },
  // { value: `dateTime`, label: `日期时间`, initialValue: Date.now() },
  // { value: `dateWeek`, label: `周`, initialValue: Date.now() },
  // { value: `dateMonth`, label: `月`, initialValue: Date.now() },
  // { value: `dateQuarter`, label: `季度输入`, initialValue: Date.now() },
  // { value: `dateYear`, label: `年份输入`, initialValue: Date.now() },
  // {
  //   value: `dateRange`,
  //   label: `日期区间`,
  //   initialValue: [Date.now(), Date.now()],
  // },
  // {
  //   value: `dateTimeRange`,
  //   label: `日期时间区间`,
  //   initialValue: [Date.now(), Date.now()],
  // },
  // { value: `time`, label: `时间`, initialValue: Date.now() },
  // {
  //   value: `timeRange`,
  //   label: `时间区间`,
  //   initialValue: [Date.now(), Date.now()],
  // },
  { value: `select`, label: `状态`, initialValue: 'open' },
  // {
  //   value: 'treeSelect',
  //   label: '树形下拉框',
  //   initialValue: ['0-0', '0-0-0'],
  // },
  { value: `checkbox`, label: `多选框`, initialValue: 'open' },
  { value: `rate`, label: `星级组件`, initialValue: '' },
  // { value: `radio`, label: `单选框`, initialValue: 'open' },
  // { value: `radioButton`, label: `按钮单选框`, initialValue: 'open' },
  { value: `progress`, label: `进度条`, initialValue: '10' },
  { value: `percent`, label: `百分比组件`, initialValue: '20' },
  // { value: `digit`, label: `数字输入框`, initialValue: '200000' },
  { value: `second`, label: `秒格式化`, initialValue: 20000 },
  {
    value: `avatar`,
    label: `头像`,
    initialValue:
      'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  },
  { value: `code`, label: `代码框`, initialValue: '# 2121' },
  { value: `switch`, label: `开关`, initialValue: 'open' },
  { value: `fromNow`, label: `相对于当前时间`, initialValue: Date.now() },
  {
    value: `image`,
    label: `图片`,
    initialValue:
      'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  },
  {
    value: `jsonCode`,
    label: `JSON代码框`,
    initialValue: '{ "name":"qixian" }',
  },
  {
    value: `color`,
    label: `颜色显示`,
    initialValue: '#1890ff',
  },
];


export const colorOptions = [
  {
    label: '成功',
    value: 'success',
  },
  {
    label: '等待',
    value: 'processing',
  },
  {
    label: '失败',
    value: 'error',
  },
  {
    label: '警告',
    value: 'warning',
  },
  {
    label: '默认',
    value: 'default',
  }
];

export const defaultEnum = [
  {
    text: '成功',
    value: '1',
    color: 'success'
  },
  {
    text: '失败',
    value: '0',
    color: 'error'
  }
]


export const documents = [
  ['类型', '介绍'],
  ['序号', '不需要填写，默认从1开始'],
  ['带边框序号', '同序号，样式上为实心数字'],
  ['文本', '略'],
  ['多行文本', '在excel里面的强制换行格式会被保存'],
  ['按钮', '略'],
  ['可编辑', '同文本,可以通过点击修改'],
  ['输入框', '同文本，显示为一个输入框'],
  ['标签', '需要配置数据，excel里只需要填写字段的值，多个标签用,分割，比如： 0,1'],
  ['密码', '密码展示的数据'],
  ['金额', '要求数字，展示时会自动带上￥符号'],
  ['日期', '略'],
  ['状态', '配置数据，默认配置数据1代表成功0代表失败，excel只需要填写对应的字段，不支持多个'],
  ['多选框', '1 或者 0 ，1代表默认勾选，不填或0代表不勾选'],
  ['星级组件', '0-5之间的数字，类似于五星评分'],
  ['进度条', '0-100之间的数字'],
  ['百分比', '数字'],
  ['秒', '数字'],
  ['头像', '图片链接'],
  ['代码', '略'],
  ['代码块', '略'],
  ['开关', '参考多选框'],
  ['相对时间', '请填写日期，会显示相对当前时间'],
  ['图片', '图片链接'],
  ['颜色', '例如： #000000'],
]