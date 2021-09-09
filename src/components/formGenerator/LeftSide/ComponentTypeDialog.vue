<template>

  <el-dialog class="sortDeleteDialog"
    width="30%"
    title="选择添加形式"
    :visible.sync="innerVisible">
     <el-radio-group v-model="selectType">
      <el-radio-button label="normal">普通区域</el-radio-button>
      <el-radio-button label="advance">高级扩展区域</el-radio-button>
    </el-radio-group>
    <div slot="footer">
          <el-button type="primary"
          @click="submit">添加</el-button>
        <el-button type="info"
          @click="innerVisible = false">关闭</el-button>
    </div>
  </el-dialog>
</template>
<script>

export default {
  components: { },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      selectType: 'normal',
    };
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
      this.innerVisible = false;
      this.$emit('submit', this.selectType);
    },
  },
};
</script>
<style  scoped lang="scss">
</style>
