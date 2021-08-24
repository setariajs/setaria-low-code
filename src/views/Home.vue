<template>
  <div class="rootContainer">
    <left-side />
    <main-content />
    <right-side />
  </div>
</template>
<script>
import LeftSide from '@/components/LeftSide.vue';
import RightSide from '@/components/RightSide.vue';
import MainContent from '@/components/MainContent.vue';

export default {
  components: {
    LeftSide,
    RightSide,
    MainContent,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
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
