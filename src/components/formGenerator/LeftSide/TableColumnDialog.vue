<template>

  <el-dialog class="tableColumnDialog"
    width="30%"
    title="添加"
    :visible.sync="innerVisible">
      <table-column-props v-model="value"/>

    <div slot="footer">
       <el-button type="primary"
          @click="submit">新建</el-button>
        <el-button type="info"
          @click="innerVisible = false">关闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import TableColumnProps from '@/components/formGenerator/RightSide/TableColumnProps.vue';
import { tableColumnProps } from '@/components/formGenerator/components';

export default {
  components: { TableColumnProps },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      default: () => tableColumnProps,
    },
  },
  data() {
    return {};
  },
  computed: {
    innerVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit('update:visible', val);
      },
    },
  },
  mounted() {},
  methods: {
    submit() {
      this.$emit('submit', this.value);
    },
  },
};
</script>
<style  scoped lang="scss">
</style>
