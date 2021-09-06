<template>
  <div class="rootContainer">
    <left-side @add="addComponent" />
    <main-content :drawingList="drawingList"
      ref="mainCotent"
      :formProps="formProps"
      @setActiveComponent="setActiveComponent" />
    <right-side :formProps="formProps"
      :activeComponent="activeComponent" />
  </div>
</template>
<script>
import LeftSide from '@/components/formGenerator/LeftSide/Index.vue';
import RightSide from '@/components/formGenerator/RightSide/Index.vue';
import MainContent from '@/components/formGenerator/MainContent/Index.vue';
import { formProps } from '@/components/formGenerator/components';

export default {
  components: {
    LeftSide,
    RightSide,
    MainContent,
  },
  data() {
    return {
      drawingList: [],
      activeComponent: {},
      formProps,
    };
  },
  mounted() {},
  methods: {
    addComponent(item) {
      this.$refs.mainCotent.addComponent(item);
    },
    setActiveComponent(item) {
      // TODO 默认添加时设置激活组件
      this.activeComponent = item;
    },
  },
};
</script>
<style lang="scss" scoped>
.rootContainer {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  .mainContentContainer {
    flex: 1;
  }
}
</style>
