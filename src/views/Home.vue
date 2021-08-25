<template>
  <div class="rootContainer">
    <left-side @add="addComponent" />
    <main-content :drawingList="drawingList" />
    <right-side />
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
    };
  },
  mounted() {},
  methods: {
    addComponent(item) {
      this.drawingList.push(item);
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
