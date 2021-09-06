<template>
  <div class="rootContainer">
    <left-side @add="addComponent" />
    <main-content  :drawingList="drawingList"
    ref="mainCotent"
      :formProps="formProps"
      @setActiveComponent="setActiveComponent"  @empty="empty"/>
    <right-side :formProps="formProps"
      :activeComponent="activeComponent" />
  </div>
</template>
<script>
import LeftSide from '@/components/formGenerator/LeftSide/Index.vue';
import RightSide from '@/components/formGenerator/RightSide/Index.vue';
import MainContent from '@/components/formGenerator/MainContent/Index.vue';
import { saveIdGlobal } from '@/utils/db';

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
        'validate-on-rule-change': undefined,
        'column-max-label-length': undefined,
        'show-message': true,
      },
    };
  },
  mounted() {},
  methods: {
    addComponent(item) {
      const loading = this.$loading({
        lock: true,
        text: '渲染中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      this.drawingList.push(item);
      this.setActiveComponent(item);
      setTimeout(() => {
        this.$refs.mainCotent.setActiveComponentClass(item);
        loading.close();
      }, 200);
    },
    setActiveComponent(item) {
      // TODO 默认添加时设置激活组件
      this.activeComponent = item;
    },
    empty() {
      saveIdGlobal(100);
      this.drawingList = [];
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
