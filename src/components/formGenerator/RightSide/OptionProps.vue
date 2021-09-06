<template>
  <div class="optionPropsContainer">
    <el-divider>选项</el-divider>
    <draggable :list="value"
      :animation="340"
      group="optionItem"
      handle=".optionDrag">
      <div v-for="(item, index) in value"
        :key="index"
        class="optionItem">
        <div class="optionIcon optionDrag">
          <i class="el-icon-s-operation" />
        </div>
        <el-input v-model="item.title"
          placeholder="选项名"
          size="small" />
        <el-input placeholder="选项值"
          size="small"
          :value="item.const"
          @input="setOptionValue(item, $event)" />
        <div class="closeBtn optionIcon"
          @click="value.splice(index, 1)">
          <i class="el-icon-remove-outline" />
        </div>
      </div>
    </draggable>
    <div style="margin-left: 20px;">
      <el-button style="padding-bottom: 0"
        icon="el-icon-circle-plus-outline"
        type="text"
        @click="addOption">
        添加选项
      </el-button>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import isNumber from 'lodash/isNumber';

export default {
  components: { draggable },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
    };
  },
  computed: {},
  watch: {
  },
  methods: {
    setOptionValue(item, val) {
      item.const = isNumber(val) ? +val : val;
    },
    addOption() {
      this.value.push({
        title: '',
        const: '',
      });
    },

  },
};
</script>

<style scoped lang="scss">
.optionPropsContainer {
  padding: 0 10px;
  .optionItem {
    display: flex;
    margin-bottom: 10px;
    .el-input {
      padding: 0 3px;
    }
    .optionIcon {
      line-height: 32px;
      font-size: 22px;
      padding: 0 4px;
      color: #777;
    }
    .optionDrag {
      cursor: move;
    }
    .closeBtn {
      cursor: pointer;
      color: #f56c6c;
    }
  }
}
</style>
