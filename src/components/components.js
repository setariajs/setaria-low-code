const oneOfTureFalse = [
  { const: false, title: '否' },
  { const: true, title: '是' },
];
const commonUiSchemaSelect = {
  'ui:widget': 'select',
  'ui:options': {
    clearable: true,
  },
};
// 通用的属性映射
export const propsMapping = {
  properties: {
    required: {
      type: 'boolean',
      title: '是否必填',
      oneOf: oneOfTureFalse,
    },
    key: {
      type: 'string',
      title: '字段名',
    },
    title: {
      type: 'string',
      title: '标题',
    },
    type: {
      type: 'string',
      title: '类型',
      oneOf: [
        { const: 'string', title: '字符' },
        { const: 'number', title: '数值' },
        { const: 'boolean', title: '布尔' },
        { const: 'object', title: '对象' },
        { const: 'array', title: '数组' },
      ],
    },
    description: {
      type: 'string',
      title: '扩展标题',
    },
    'ui:placeholder': {
      type: 'string',
      title: '默认显示内容',
    },
    'ui:colspan': {
      type: 'number',
      title: '跨越的列数',
    },
    'ui:rows': {
      type: 'number',
      title: '输入框行数',
    },
    minLength: {
      type: 'number',
      title: '最小长度',
    },
    maxLength: {
      type: 'number',
      title: '最大长度',
    },
    'ui:autosize': {
      type: 'boolean',
      title: '是否自适应高度',
      oneOf: oneOfTureFalse,
    },
    'show-word-limit': {
      type: 'boolean',
      title: '是否显示字数统计',
      oneOf: oneOfTureFalse,
    },
    multiple: {
      type: 'string',
      title: '是否可多选',
      oneOf: oneOfTureFalse,
    },
    clearable: {
      type: 'boolean',
      title: '是否可清空',
      oneOf: oneOfTureFalse,
    },
    filterable: {
      type: 'boolean',
      title: '是否可搜索',
      oneOf: oneOfTureFalse,
    },
    'ui:disabled': {
      type: 'boolean',
      title: '是否禁用',
      oneOf: oneOfTureFalse,
    },
    readonly: {
      type: 'boolean',
      title: '是否只读',
      oneOf: oneOfTureFalse,
    },
    'ui:hidden': {
      type: 'boolean',
      title: '是否隐藏',
      oneOf: oneOfTureFalse,
    },
    'show-password': {
      type: 'boolean',
      title: '是否显示切换密码',
      oneOf: oneOfTureFalse,
    },
    'datePicker.uiSchema.ui:options.type': {
      type: 'string',
      title: '选取类型',
      oneOf: [
        { const: 'year', title: '年' },
        { const: 'month', title: '月' },
        { const: 'date', title: '日期' },
        { const: 'dates', title: '多个日期' },
        { const: 'week', title: '周' },
      ],
    },

  },
  uiSchema: {
    required: commonUiSchemaSelect,
    key: {},
    title: {},
    description: {},
    'ui:placeholder': {},
    'ui:colspan': {},
    'ui:rows': {},
    minLength: {},
    maxLength: {},
    'ui:autosize': commonUiSchemaSelect,
    'show-word-limit': commonUiSchemaSelect,
    multiple: commonUiSchemaSelect,
    filterable: commonUiSchemaSelect,
    clearable: commonUiSchemaSelect,
    'ui:disabled': commonUiSchemaSelect,
    readonly: commonUiSchemaSelect,
    'ui:hidden': commonUiSchemaSelect,
    'show-password': commonUiSchemaSelect,
    type: [],
    'datePicker.uiSchema.ui:options.type': commonUiSchemaSelect,
  },

};

// 输入型组件属性
export const inputComponents = [
  {
    componentName: 'input',
    required: false,
    key: undefined,
    schema: {
      description: undefined,
      type: 'string',
      title: '单行文本',
      minLength: undefined,
      maxLength: undefined,
    },
    uiSchema: {
      'ui:placeholder': undefined,
      'ui:rules': [],
      'ui:disabled': undefined,
      'ui:hidden': undefined,
      'ui:colspan': undefined,
      'ui:options': {
        readonly: undefined,
        clearable: undefined,
        'show-word-limit': undefined,
      },
    },
  },
  {
    componentName: 'input',
    required: false,
    key: undefined,
    schema: {
      description: undefined,
      type: 'string',
      title: '密码',
      minLength: undefined,
      maxLength: undefined,
    },
    uiSchema: {
      'ui:widget': 'password',
      'ui:rules': [],
      'ui:placeholder': undefined,
      'ui:disabled': undefined,
      'ui:colspan': undefined,
      'ui:hidden': undefined,
      'ui:options': {
        readonly: undefined,
        clearable: undefined,
        'show-password': undefined,
        // 'show-word-limit': undefined,
      },

    },
  },
  {
    componentName: 'input',
    required: false,
    key: undefined,
    schema: {
      description: undefined,
      type: 'string',
      title: '文本域',
      minLength: undefined,
      maxLength: undefined,
    },
    uiSchema: {
      'ui:widget': 'textarea',
      'ui:rules': [],
      'ui:placeholder': undefined,
      'ui:disabled': undefined,
      'ui:hidden': undefined,
      'ui:colspan': undefined,
      'ui:options': {
        'ui:autosize': undefined,
        'ui:rows': 2,
        readonly: undefined,
        clearable: undefined,
        'show-word-limit': undefined,
      },

    },
  },
];
// 选择性组件属性
export const selectComponents = [
  {
    componentName: 'select',
    required: false,
    key: undefined,
    schema: {
      description: undefined,
      type: 'string',
      title: '下拉选择',
      oneOf: [{
        const: '1',
        title: '选项1',
      }, {
        const: '2',
        title: '选项2',
      }],
    },
    uiSchema: {
      'ui:widget': 'select',
      'ui:placeholder': undefined,
      'ui:disabled': undefined,
      'ui:hidden': undefined,
      'ui:colspan': undefined,
      'ui:options': {
        readonly: undefined,
        clearable: undefined,
        multiple: undefined,
        filterable: undefined,
      },
    },
  },
  {
    componentName: 'radio',
    required: false,
    key: undefined,
    schema: {
      description: undefined,
      type: 'string',
      title: '单选框组',
      oneOf: [{
        const: '1',
        title: '选项1',
      }, {
        const: '2',
        title: '选项2',
      }],
    },
    uiSchema: {
      'ui:widget': 'radio',
      'ui:disabled': undefined,
      'ui:hidden': undefined,
      'ui:colspan': undefined,
      'ui:options': {
        readonly: undefined,
      },
    },
  },
  {
    componentName: 'checkbox',
    required: false,
    key: undefined,
    schema: {
      description: undefined,
      type: 'array',
      title: '多选框组',
      anyOf: [{
        const: '1',
        title: '选项1',
      }, {
        const: '2',
        title: '选项2',
      }],
    },
    uiSchema: {
      'ui:widget': 'checkbox',
      'ui:disabled': undefined,
      'ui:hidden': undefined,
      'ui:colspan': undefined,
      'ui:options': {
        readonly: undefined,
      },
    },
  },
  {
    componentName: 'datePicker',
    required: false,
    key: undefined,
    schema: {
      description: undefined,
      type: 'string',
      title: '日期选择',
      format: 'date',
    },
    uiSchema: {
      'ui:disabled': undefined,
      'ui:hidden': undefined,
      'ui:colspan': undefined,
      'ui:options': {
        readonly: undefined,
        clearable: undefined,
        // type: undefined,
        'datePicker.uiSchema.ui:options.type': undefined,
      },
    },
  },
  {
    componentName: 'dateTimePicker',
    required: false,
    key: undefined,
    schema: {
      description: undefined,
      type: 'string',
      title: '日期时间选择',
      format: 'date-time',
    },
    uiSchema: {
      'ui:disabled': undefined,
      'ui:hidden': undefined,
      'ui:colspan': undefined,
      'ui:options': {
        readonly: undefined,
        clearable: undefined,
      },
    },
  },
  {
    componentName: 'timePicker',
    required: false,
    key: undefined,
    schema: {
      description: undefined,
      type: 'string',
      title: '时间选择',
      format: 'time',
    },
    uiSchema: {
      'ui:disabled': undefined,
      'ui:hidden': undefined,
      'ui:colspan': undefined,
      'ui:options': {
        readonly: undefined,
        clearable: undefined,
      },
    },
  },
  {
    componentName: 'searchHelp',
    required: false,
    key: undefined,
    schema: {
      description: undefined,
      type: 'string',
      title: '搜索帮助',
    },
    uiSchema: {
      'ui:disabled': undefined,
      'ui:hidden': undefined,
      'ui:colspan': undefined,
      'ui:options': {
        'suffix-icon': 'el-icon-search',
        readonly: true,
        clearable: undefined,
      },
      'ui:nativeOn': {
        click: () => {
          this.$message.info('searchHelp click');
        },
      },
      // 'ui:nativeOn': {
      //   click: () => {
      //     alert('test');
      //     this.$message.info('searchHelp click');
      //   },
      // },
    },
  },
];

export default {
  inputComponents,
  selectComponents,
};
