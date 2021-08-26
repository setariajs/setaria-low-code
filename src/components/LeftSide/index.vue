<template>
  <div class="leftSideContainer">
   <el-scrollbar >
     <!--  -->
      <component-group  @add="addComponent" :title="'输入型组件'"  :components="inputComponent"/>
    </el-scrollbar>


  </div>
</template>

<script>
import InputComponent from '../components';
import ComponentGroup from './ComponentGroup.vue';

export default {
  components: { ComponentGroup },
  data() {
    return {
      inputComponent: InputComponent,
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
