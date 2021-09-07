<template>
  <div class="formPropsContainer">
    <el-json-form ref="form"
      :size="'mini'"
      :label-position="'right'"
      :label-width="'130px'"
      :label-suffix="':'"
      :model="value"
      :schema="schema"
      :ui-schema="uiSchema"
      :validate-on-rule-change="false"
      :columns="1" />
  </div>
</template>

<script>

import { oneOfTureFalse, formProps } from '@/components/formGenerator/components';

// const oneOfTureFalse = [
//   { const: false, title: '否' },
//   { const: true, title: '是' },
// ];
export default {
  components: {},
  props: {
    activeComponent: {
      type: Object,
      default: () => {},
    },
    value: {
      type: Object,
      default: () => formProps,
    },
  },
  data() {
    return {
      schema: {
        properties: {
          'label-position': {
            type: 'string',
            title: '标签位置',
            oneOf: [
              { const: 'right', title: '右边' },
              { const: 'left', title: '左边' },
              { const: 'top', title: '上边' },
            ],
          },
          'label-width': {
            type: 'string',
            title: '标签宽度',
          },
          'label-suffix': {
            type: 'string',
            title: '标签后缀',
          },
          'column-max-label-length': {
            type: 'string',
            title: '标签省略数量',
          },
          columns: {
            type: 'string',
            title: '列数',
          },
          size: {
            type: 'string',
            title: '尺寸',
            oneOf: [
              { const: 'medium', title: 'medium' },
              { const: 'small', title: 'small' },
              { const: 'mini', title: 'mini' },
            ],
          },
          inline: {
            type: 'boolean',
            title: '行内模式',
            oneOf: oneOfTureFalse,
          },
          disabled: {
            type: 'boolean',
            title: '表单禁用',
            oneOf: oneOfTureFalse,
          },
          'validate-on-rule-change': {
            type: 'boolean',
            title: 'rules变更校验',
            oneOf: oneOfTureFalse,
          },
          'show-message': {
            type: 'boolean',
            title: '显示校验错误信息',
            oneOf: oneOfTureFalse,
          },
        },
      },
      uiSchema: {
        inline: {
          'ui:widget': 'select',
          'ui:options': {
            clearable: true,
          },
        },
        disabled: {
          'ui:widget': 'select',
          'ui:options': {
            clearable: true,
          },
        },
        size: {
          'ui:widget': 'select',
          'ui:options': {
            clearable: true,
          },
        },
        'label-position': {
          'ui:widget': 'select',
          'ui:options': {
            clearable: true,
          },
        },
        'validate-on-rule-change': {
          'ui:widget': 'select',
          'ui:options': {
            clearable: true,
          },
        },
        'show-message': {
          'ui:widget': 'select',
          'ui:options': {
            clearable: true,
          },
        },
      },
    };
  },
};
</script>

<style scoped lang="scss">
.formPropsContainer {
  padding: 0 10px;
  height: 100%;
  box-sizing: content-box;
}
</style>
