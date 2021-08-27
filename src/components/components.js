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
    clearable: {
      type: 'boolean',
      title: '是否可清空',
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
    clearable: commonUiSchemaSelect,
    'ui:disabled': commonUiSchemaSelect,
    readonly: commonUiSchemaSelect,
    'ui:hidden': commonUiSchemaSelect,
    'show-password': commonUiSchemaSelect,
    type: [],
  },

};
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

export const selectComponents = [
  {
    componentName: 'select',
    required: false,
    key: undefined,
    schema: {
      description: undefined,
      type: 'string',
      title: '下拉选择',
      oneOf: [],
    },
    uiSchema: {
      'ui:placeholder': undefined,
      'ui:disabled': undefined,
      'ui:hidden': undefined,
      'ui:colspan': undefined,
      'ui:options': {
        readonly: undefined,
        clearable: undefined,
        // multiple
      },
    },
  },
];

export default {
  inputComponents,
  selectComponents,
};
