<template>
  <div class="regularPropsContainer">
    <el-divider>正则校验</el-divider>
    <el-form size="mini">

      <div v-for="(item, index) in value"
        :key="index"
        class="regularItem">

        <el-form-item label="表达式">
          <el-input v-model="item.pattern"
            placeholder="请输入正则" @blur="changePattern(item)"/>
        </el-form-item>
        <el-form-item label="错误提示"
          style="margin-bottom:0">
          <el-input v-model="item.message"
            placeholder="请输入错误提示" />
        </el-form-item>

        <span class="closeBtn"
          @click="value.splice(index, 1)">
          <i class="el-icon-close" />
        </span>

      </div>
    </el-form>

    <div style="margin-left: 20px">
      <el-button icon="el-icon-circle-plus-outline"
        type="text"
        @click="addRegular">
        添加规则
      </el-button>
    </div>

  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    changePattern(item) {
      if (item.pattern) {
        // eslint-disable-next-line no-eval
        item.pattern = eval(item.pattern);
      }
    },
    addRegular() {
      this.value.push({
        pattern: '',
        message: '',
      });
    },
  },
};
</script>

<style scoped lang="scss">
.regularPropsContainer {
  padding: 0 10px;
  .regularItem {
    padding: 12px;
    background: #f8f8f8;
    position: relative;
    border-radius: 4px;
    margin: 10px 0;
    // .el-input {
    //   padding: 0 3px;
    // }
    // .regularIcon {
    //   line-height: 32px;
    //   font-size: 22px;
    //   padding: 0 4px;
    //   color: #777;
    // }
    // .regularDrag {
    //   cursor: move;
    // }
    .closeBtn {
      position: absolute;
      right: -6px;
      top: -6px;
      display: block;
      width: 16px;
      height: 16px;
      line-height: 16px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      color: #fff;
      text-align: center;
      z-index: 1;
      cursor: pointer;
      font-size: 12px;
      :hover{
        background: rgba(210,23,23,.5);
      }
    }
  }
}
</style>
