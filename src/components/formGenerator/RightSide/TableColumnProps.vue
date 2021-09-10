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
          // fixed: {},
          // width: {},
          // minWidth: {},
        },
      },
      uiSchema: {
        key: {},
        title: {},
        type: [],
      },
    };
  },
  computed: {
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
