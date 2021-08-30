<template>
  <div class="rightSideContainer">
    <el-tabs v-model="tabeActive"
      :stretch="true">
      <el-tab-pane label="组件属性"
        name="components" />
      <el-tab-pane label="表单属性"
        name="form" />
    </el-tabs>
    <el-scrollbar>

      <component-props v-show="tabeActive ==='components'"
        v-model="activeComponent" />

      <form-props v-show="tabeActive ==='form'"
        v-model="formProps" />

    </el-scrollbar>
  </div>
</template>

<script>
import FormProps from './FormProps.vue';
import ComponentProps from './ComponentProps.vue';

export default {
  components: { FormProps, ComponentProps },
  props: {
    activeComponent: {
      type: Object,
      default: () => {},
    },
    formProps: {
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
  height: calc(100% - 60px);
  .el-scrollbar {
    height: 100%;
  }
  // /deep/ {
  //   .el-tabs,
  //   .el-tabs__content,
  //   .el-tab-pane {
  //     height: calc(100% - 40px);
  //   }
  // }
}
</style>
