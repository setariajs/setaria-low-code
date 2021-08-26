export default [
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
      'ui:disabled': undefined,
      'ui:hidden': undefined,
      'ui:colspan': undefined,
      'ui:options': {
        'ui:readonly': undefined,
        'ui:clearable': undefined,
        'ui:show-word-limit': undefined,
        'ui:placeholder': undefined,
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
      'ui:disabled': undefined,
      'ui:colspan': undefined,
      'ui:hidden': undefined,
      'ui:options': {
        'ui:readonly': undefined,
        'ui:clearable': undefined,
        'ui:show-word-limit': undefined,
        'ui:placeholder': undefined,
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
      'ui:disabled': undefined,
      'ui:hidden': undefined,
      'ui:colspan': undefined,
      'ui:options': {
        'ui:autosize': undefined,
        'ui:rows': 2,
        'ui:readonly': undefined,
        'ui:clearable': undefined,
        'ui:show-word-limit': undefined,
        'ui:placeholder': undefined,
      },

    },
  },
];
