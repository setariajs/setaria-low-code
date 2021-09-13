<template>
  <div class="tableColumnPropsContainer">
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
import {
  // oneOfTureFalse,
  tableColumnProps,
} from '@/components/formGenerator/components';

// const oneOfTureFalse = [
//   { const: false, title: '否' },
//   { const: true, title: '是' },
// ];
export default {
  components: {},
  inject: {
    generatorType: {
      default: 'form',
    },
  },
  props: {
    activeComponent: {
      type: Object,
      default: () => {},
    },
    value: {
      type: Object,
      default: () => tableColumnProps,
    },
  },
  data() {
    return {
      // schema:
      schema: {
        required: ['title', 'key', 'type'],
        properties: {
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
          'ui:options.width': {
            type: 'string',
            title: '宽度',
          },
          'ui:options.minWidth': {
            type: 'string',
            title: '最小宽度',
          },
          'ui:options.fixed': {
            type: 'string',
            title: '固定位置',
            oneOf: [
              { const: 'left', title: '左边' },
              { const: 'right', title: '右边' },
            ],
          },
          // fixed: {},
          // width: {},
          // minWidth: {},
        },
      },
      uiSchema: {
        key: {},
        title: {},
        type: [],
        'ui:options.width': {},
        'ui:options.minWidth': {},
        'ui:options.fixed': {
          'ui:options': {
            clearable: true,
          },

        },
      },
    };
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
  },
};
</script>

<style scoped lang="scss">
.tableColumnPropsContainer {
  padding: 0 10px;
  height: 100%;
  box-sizing: content-box;
}
</style>
