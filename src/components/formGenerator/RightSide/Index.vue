<template>
  <div class="rightSideContainer">
    <el-tabs v-model="tabeActive"
      :stretch="true">
      <el-tab-pane label="组件属性"
        name="components" />
      <el-tab-pane label="表单属性"
        name="form" />
      <el-tab-pane label="表字段属性"
        v-if="generatorType === 'table'"
        name="tableColumn" />
    </el-tabs>
    <el-scrollbar>

      <component-props v-show="tabeActive ==='components'"
        v-model="activeComponent" />

      <form-props v-show="tabeActive ==='form'"
        v-model="formProps" />

      <table-column-props v-show="tabeActive ==='tableColumn'"
        v-model="tableColumnProps" />

    </el-scrollbar>
  </div>
</template>

<script>
import FormProps from './FormProps.vue';
import ComponentProps from './ComponentProps.vue';
import TableColumnProps from './TableColumnProps.vue';

export default {
  components: { FormProps, ComponentProps, TableColumnProps },
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
    formProps: {
      type: Object,
      default: () => {},
    },
    tableColumnProps: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tabeActive: 'components',
    };
  },
};
</script>

<style scoped lang="scss">
.rightSideContainer {
  border-left: 1px solid #e3e3e3;
  width: 350px;
  height: 100%;
  .el-scrollbar {
    height: calc(100% - 60px);
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}
</style>
