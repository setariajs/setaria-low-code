<template>
  <div class="rootContainer">
    <left-side @add="addComponent" />
    <main-content :drawingList="drawingList"
      ref="mainCotent"
      :formProps="formProps"
      @changeFormProps="changeFormProps"
      @setActiveComponent="setActiveComponent" />
    <right-side :formProps="formProps"
      :activeComponent="activeComponent"
      :tableColumnProps="tableColumnProps" />
  </div>
</template>
<script>
import LeftSide from '@/components/formGenerator/LeftSide/Index.vue';
import RightSide from '@/components/formGenerator/RightSide/Index.vue';
import MainContent from '@/components/tableGenerator/MainContent/Index.vue';
import { tableFormProps } from '@/components/formGenerator/components';

export default {
  components: {
    LeftSide,
    RightSide,
    MainContent,
  },
  provide: {
    generatorType: 'table',
  },
  data() {
    return {
      drawingList: [],
      activeComponent: {},
      tableColumnProps: {},
      formProps: tableFormProps,
    };
  },
  mounted() {},
  methods: {
    addComponent(item, type) {
      this.$refs.mainCotent.addComponent(item, type);
    },
    setActiveComponent(item, type) {
      if (type === 'formItem') {
        this.activeComponent = item;
      } else if (type === 'tableColumn') {
        this.tableColumnProps = item;
      }
    },
    changeFormProps(props) {
      this.formProps = props;
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
