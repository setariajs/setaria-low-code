<template>
  <div class="groupContainer">
    <p class="title">{{title}}</p>
    <draggable class="componentsDraggable"
      :list="components"
      :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
      :clone="cloneComponent"
      draggable=".componentsItem"
      :sort="false"
      @end="onEnd">
      <div v-for="(item, index) in components"
        :key="index"
        class="componentsItem"
        @click="addComponent(item)">
        <div class="componentsBody">
          {{ item.schema.title }}
        </div>
      </div>
    </draggable>

    <component-type-dialog :visible.sync="visible" @submit="submitType"/>


  </div>
</template>

<script>
import draggable from 'vuedraggable';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import ComponentTypeDialog from './ComponentTypeDialog.vue';
import { getIdGlobal, saveIdGlobal } from '@/utils/db';

const idGlobal = getIdGlobal();
export default {
  components: { draggable, ComponentTypeDialog },
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
    components: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      idGlobal,
      saveIdGlobalDebounce: debounce(saveIdGlobal, 400),
      draggerComponent: null,
      tempCloneComponent: null,
      visible: false,
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
    addComponent(item) {
      const cloneItem = this.getNewComponent(item);
      // 是否需要二次弹出确认
      if (this.generatorType === 'table') {
        this.tempCloneComponent = cloneItem;
        this.visible = true;
      } else {
        this.$emit('add', cloneItem);
      }
    },
    submitType(type) {
      this.$emit('add', this.tempCloneComponent, type);
    },
    getNewComponent(item) {
      const clone = cloneDeep(item);
      this.idGlobal = getIdGlobal() + 1;
      clone.key = `field${this.idGlobal}`;
      return clone;
    },
    cloneComponent(origin) {
      const clone = this.getNewComponent(origin);
      this.tempCloneComponent = clone;
      return clone;
    },
    onEnd(item) {
      if (item.from !== item.to) {
        this.$emit('add', this.tempCloneComponent);
      }
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
