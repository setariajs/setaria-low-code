<template>
  <div class="groupContainer">
    <p class="title">{{title}}</p>
    <div class="componentsDraggable">
      <div class="componentsItem"
        @click="showAddDialog">
        表字段
      </div>
      <!-- <div v-for="(item, index) in components"
        :key="index"
        class="componentsItem"
        @click="addComponent(item)">
        <div class="componentsBody">
          {{ item.schema.title }}
        </div>
      </div> -->
    </div>

    <table-column-dialog :visible.sync="visible"
      @submit="submitData"
      v-model="detailData" />

  </div>
</template>

<script>
// import draggable from 'vuedraggable';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import TableColumnDialog from './TableColumnDialog.vue';
import { getIdGlobal, saveIdGlobal } from '@/utils/db';
import { tableColumnProps } from '@/components/formGenerator/components';

const idGlobal = getIdGlobal();
export default {
  components: { TableColumnDialog },
  inject: {
    generatorType: {
      default: 'form',
    },
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    // components: {
    //   type: Array,
    //   default: () => [],
    // },
  },
  data() {
    return {
      idGlobal,
      saveIdGlobalDebounce: debounce(saveIdGlobal, 400),
      visible: false,
      detailData: tableColumnProps,
    };
  },
  watch: {
    idGlobal: {
      handler(val) {
        this.saveIdGlobalDebounce(val);
      },
      immediate: true,
    },
  },
  methods: {
    showAddDialog() {
      this.detailData = this.getNewComponent(tableColumnProps);
      this.visible = true;
    },
    submitData(data) {
      this.$emit('add', data);
    },
    getNewComponent(item) {
      const clone = cloneDeep(item);
      this.idGlobal = getIdGlobal() + 1;
      clone.key = `field${this.idGlobal}`;
      return clone;
    },
  },
};
</script>

<style scoped lang="scss">
.groupContainer {
  margin-bottom: 20px;
  padding: 10px;
  .title {
    font-size: 16px;
  }
  .componentsDraggable {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .componentsItem {
      padding: 10px 0;
      margin: 3px;
      border: 1px solid #efefef;
      background-color: #fcf3ff;
      cursor: move;
      border-radius: 3px;
      font-size: 14px;
      width: 46%;
      text-align: center;
      .componentsBody {
      }
      &:hover {
        border: 1px dashed #000;
        background-color: #cf76ed;
        color: #fff;
      }
    }
  }
}
</style>
