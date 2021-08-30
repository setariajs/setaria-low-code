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

  </div>
</template>

<script>
import draggable from 'vuedraggable';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import { getIdGlobal, saveIdGlobal } from '@/utils/db';

const idGlobal = getIdGlobal();
export default {
  components: { draggable },
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
      this.$emit('add', this.cloneComponent(item));
      // this.fetchData(clone)
      // this.drawingList.push(clone)
      // this.activeFormItem(clone)
    },
    cloneComponent(origin) {
      const clone = cloneDeep(origin);
      this.idGlobal = getIdGlobal() + 1;
      clone.key = `field${this.idGlobal}`;
      return clone;
    },
    // addComponent(item) {
    //   this.$emit('add', item);
    // },
    // cloneComponent(item) {
    //   this.$emit('clone', item);
    // },
    onEnd(item) {
      if (item.from !== item.to) {
        // console.log('endDrag', item);
        // this.$emit('add', this.draggerComponent);
        // this.$emit('endDrag', item);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.groupContainer {
  margin-bottom: 20px;
  .title {
    font-size: 16px;
  }
  .componentsDraggable {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .componentsItem {
      padding: 7px 20px;
      margin: 3px;
      border: 1px solid #efefef;
      background-color: #fcf3ff;
      cursor: move;
      border-radius: 3px;
      font-size: 14px;
      width: 32%;
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
