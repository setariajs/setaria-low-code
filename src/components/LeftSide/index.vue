<template>
  <div class="leftSideContainer">
    <el-scrollbar>
      <!--  -->
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
    addComponent(item) {
      this.$emit('add', item);
    },
  },
};
</script>

<style scoped lang="scss">
.leftSideContainer {
  height: 100%;
  border-right: 1px solid #e3e3e3;
  width: 270px;
  padding: 10px;
}
</style>
