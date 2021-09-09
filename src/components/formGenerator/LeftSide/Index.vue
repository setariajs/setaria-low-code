<template>
  <div class="leftSideContainer">
    <div class="topArea">
      Setaria Low Code
    </div>
    <el-scrollbar class="scrollBar">
      <component-group @add="addComponent"
        :title="'输入型组件'"
        :components="inputComponents" />
      <component-group @add="addComponent"
        :title="'选择型组件'"
        :components="selectComponents" />
    </el-scrollbar>

  </div>
</template>

<script>
import { inputComponents, selectComponents } from '../components';
import ComponentGroup from './ComponentGroup.vue';

export default {
  components: { ComponentGroup },
  data() {
    return {
      inputComponents,
      selectComponents,
    };
  },
  methods: {
    addComponent(item, type) {
      this.$emit('add', item, type);
    },
  },
};
</script>

<style scoped lang="scss">
.leftSideContainer {
  height: 100%;
  border-right: 1px solid #e3e3e3;
  width: 270px;
  .topArea {
    border-bottom: 1px solid #e3e3e3;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    font-size: 18px;
  }

  .scrollBar {
    height: calc(100% - 40px);
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}
</style>
