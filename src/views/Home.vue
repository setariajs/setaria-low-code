<template>
  <div class="rootContainer">
    <left-side @add="addComponent" />
    <main-content :drawingList="drawingList"
      :formProps="formProps"
      @setActiveComponent="setActiveComponent" />
    <right-side :formProps="formProps"
      :activeComponent="activeComponent" />
  </div>
</template>
<script>
import LeftSide from '@/components/LeftSide/index.vue';
import RightSide from '@/components/RightSide/index.vue';
import MainContent from '@/components/MainContent/index.vue';

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
      formProps: {
        inline: false,
        disabled: false,
        'label-position': '',
        'label-width': '100px',
        'label-suffix': ':',
        size: '',
        columns: undefined,
        'validate-on-rule-change': true,
        'column-max-label-length': undefined,
        'show-message': true,
      },
    };
  },
  mounted() {},
  methods: {
    addComponent(item) {
      this.drawingList.push(item);
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
