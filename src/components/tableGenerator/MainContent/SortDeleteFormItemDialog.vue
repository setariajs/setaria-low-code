<template>

  <el-dialog class="sortDeleteFormItemDialog"
    width="60%"
    title="排序&删除"
    :visible.sync="innerVisible">

    <div class="formArea">
      <div class="formItem">
        <p>普通搜索</p>
        <draggable class="formDraggable"
          :list="normalList"
          :animation="340"
          group="componentsGroup"
          @end="onEnd">
          <div class="item"
            v-for="(item,index) in normalList"
            :key="index">
            <span>{{item.schema.title}} —— {{item.key}}</span>
            <i class="el-icon-delete deleteItem"
              @click="deleteItem(normalList,index)"></i>
          </div>
        </draggable>

      </div>
      <div class="formItem">
        <p>高级搜索</p>
        <draggable class="formDraggable"
          :list="advanceList"
          :animation="340"
          group="componentsGroup">
          <div class="item"
            v-for="(item,index) in advanceList"
            :key="index">
            <span>{{item.schema.title}} —— {{item.key}}</span>
            <i class="el-icon-delete deleteItem"
              @click="deleteItem(advanceList,index)"></i>
          </div>
        </draggable>
      </div>

    </div>

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
    normalList: {
      type: Array,
      default: () => [],
    },
    advanceList: {
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
    deleteItem(list, index) {
      list.splice(index, 1);
      this.$emit('delete');
    },
    onEnd() {
      this.$emit('draggerEnd');
    },
  },
};
</script>
<style  scoped lang="scss">
.sortDeleteFormItemDialog {
  .formArea {
    display: flex;
    .formItem {
      flex: 1;
      p{
        font-size: 16px;
      }
    }
  }
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
