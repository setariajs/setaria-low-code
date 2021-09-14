<template>

  <el-dialog class="sortDeleteTableColumnDialog"
    width="60%"
    title="排序&删除"
    :visible.sync="innerVisible">

    <draggable class="formDraggable"
      :list="list"
      :animation="340"
      group="componentsGroup">
      <div class="item"
        v-for="(item,index) in list"
        :key="index">
        <span>{{item.title}} —— {{item.key}}</span>
        <i class="el-icon-delete deleteItem"
          @click="deleteItem(index)"></i>
      </div>
    </draggable>

    <div slot="footer">
      <el-button-group class="dialog-bt-group">
        <el-button type="info"
          @click="innerVisible = false">关闭</el-button>
      </el-button-group>
    </div>
  </el-dialog>
</template>
<script>
import draggable from 'vuedraggable';

export default {
  components: { draggable },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => [],
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
    deleteItem(index) {
      this.list.splice(index, 1);
      this.$emit('delete');
    },
  },
};
</script>
<style  scoped lang="scss">
.sortDeleteTableColumnDialog {
  .item {
    padding: 10px;
    margin: 10px;
    border: 1px solid #efefef;
    background-color: #fcf3ff;
    cursor: move;
    border-radius: 3px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    .deleteItem {
      border-radius: 50%;
      border: 1px solid #f44336;
      color: #f44336;
      font-size: 12px;
      width: 16px;
      height: 16px;
      text-align: center;
      line-height: 15px;
      padding-left: 1px;
      cursor: pointer;
    }
  }
  .emptyInfo {
    text-align: center;
    font-size: 18px;
    color: #ccb1ea;
    letter-spacing: 4px;
  }
}
</style>
