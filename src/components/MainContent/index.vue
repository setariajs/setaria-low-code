<template>

  <el-scrollbar :vertical="true"
    class="mainContentContainer">
    <!-- draggable=".el-form-item" -->
    <!--
      handle=".el-form-item__label-wrap"
       tag="el-json-form"
      :component-data="draggableComponentData" -->
    <draggable class="drawingBoard"
      draggable=".el-row .el-col"
      :list="drawingList"
      :animation="340"
      group="componentsGroup">
      <el-json-form ref="form"
        v-bind="formProps"
        :model="formModel"
        :schema="formSchema"
        :ui-schema="formUiSchema"
        :rules="rules">
      </el-json-form>

    </draggable>
    <div class="el-col"
      v-for="(item,index) in drawingList"
      :key="index">{{item}}</div>
    <div v-show="!drawingList.length"
      class="emptyInfo">
      从左侧拖入或点选组件进行表单设计
    </div>
  </el-scrollbar>
</template>

<script>
import draggable from 'vuedraggable';


function hasClass(target, key) {
  return Array.from(target.classList).includes(key);
}
// TODO 增加顶部相关按钮
export default {
  components: { draggable },
  props: {
    drawingList: {
      type: Array,
      default: () => [],
    },
    formProps: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formModel: {},
      formSchema: {},
      formUiSchema: {},
      rules: {},
      // drawingList: [],
    };
  },
  mounted() {
    document
      .querySelector('.drawingBoard')
      .addEventListener('click', (e) => {
        this.bindFindComponent(e);
        this.bindRomoveComponent(e);
      });
  },
  watch: {
    drawingList: {
      deep: true,
      handler() {
        this.initFormModel();
      },
    },
  },
  computed: {
    draggableComponentData() {
      return {
        props: {
          model: this.formModel,
          schema: this.formSchema,
          'ui-schema': this.formUiSchema,
          rules: this.rules,
        },
      };
    },
  },
  methods: {
    initFormModel() {
      console.log('drawingList change');
      const required = [];
      const properties = {};
      const uiSchema = {};
      const model = {};
      this.drawingList.forEach((item) => {
        const { key } = item;
        // debugger;
        // console.log(item.length);
        if (!item.isDeleted) {
          if (item.required) {
            required.push(key);
          }
          properties[key] = this.formSchema[key] || item.schema;
          uiSchema[key] = this.formUiSchema[key] || item.uiSchema;
          // 处理 uiSchema.ui:options 类型赋值问题

          this.processUiSchemaKey(uiSchema[key]['ui:options']);

          // uiSchema[key]['ui:options'].type = 'month';

          // TODO 需要判断类型
          if (properties[key].type === 'array') {
            model[key] = this.formModel[key] || [];
          } else {
            model[key] = this.formModel[key] || '';
          }
        } else {
          properties[key] = {};
          uiSchema[key] = {};
        }
      });

      this.formModel = model;
      this.formSchema = {
        required,
        properties,
      };
      this.formUiSchema = uiSchema;
      this.$nextTick(() => {
        this.appendOperBtn();
      });
    },
    // 处理 uiSchema.ui:options 类型赋值问题
    processUiSchemaKey(uiOptions) {
      Object.keys(uiOptions).forEach((key) => {
        if (key.includes('uiSchema.ui:options.')) {
          const targetKey = key.split('.').pop();
          uiOptions[targetKey] = uiOptions[key];
        }
      });
    },
    // 添加各种处理按钮
    appendOperBtn() {
      Array.from(
        document.querySelectorAll('.drawingBoard .el-col'),
      ).forEach((dom, index) => {
        if (!dom.innerHTML.includes('deleteOper')) {
          dom.innerHTML += '<i class="el-icon-delete deleteOper"><i>';
        }
        dom.querySelector('label').setAttribute('data-key', this.drawingList[index].key);
      });
    },
    bindFindComponent(event) {
      let key = '';
      // TODO 增加选中样式
      const labelNode = event.path.find(item => (item.className ? item.className.includes('el-form-item__label') : false));
      // if (event.target.nodeName.toLowerCase() === 'label') {
      //   key = event.target.getAttribute('for');
      // } else
      if (labelNode) {
        key = labelNode.getAttribute('data-key');
      } else if (
        hasClass(event.target, 'el-col')
        || hasClass(event.target, 'el-form-item')
      ) {
        key = event.target.querySelector('label').getAttribute('data-key');
      }
      if (key) {
        const findObj = this.drawingList.find(item => item.key === key);
        if (findObj) {
          this.setActiveComponent(findObj);
          this.setActiveComponentClass(findObj);
        }
      }
    },
    bindRomoveComponent(event) {
      if (hasClass(event.target, 'deleteOper')) {
        const key = event.target.parentElement.querySelector('label').getAttribute('data-key');
        this.removeComponentByKey(key);
      }
    },
    setActiveComponentClass(selectItem) {
      const findObj = Array.from(
        document.querySelectorAll('.drawingBoard .el-col'),
      ).find(item => item.querySelector(`label[data-key="${selectItem.key}"]`));
      const alreadyItem = document.querySelector(
        '.drawingBoard .el-col.selected',
      );
      if (alreadyItem) {
        alreadyItem.classList.remove('selected');
      }
      findObj.classList.add('selected');
    },
    setActiveComponent(item) {
      this.$emit('setActiveComponent', item);
    },
    removeComponentByKey(key) {
      console.log(key);
      const index = this.drawingList.findIndex(item => item.key === key);
      if (index !== -1) {
        // TODO 删除有问题，需要修改jsonForm组件
        this.drawingList[index].isDeleted = true; // .splice(index, 1);
        this.initFormModel();
        // this.$emit('removeComponent');

      //   this.drawingList = JSON.parse(JSON.stringify(this.drawingList));
        // console.log('removeComponentByKey');
        // this.$refs.form.$forceUpdate();
        // this.drawingList = this.drawingList;
      }
      // this.$emit('setActiveComponent', item);
    },

  },
};
</script>

<style scoped lang="scss">
.mainContentContainer {
  .drawingBoard {
    min-height: 500px;
    padding: 20px;
    overflow-x: hidden;
  }
  .emptyInfo {
    position: absolute;
    top: 46%;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 18px;
    color: #ccb1ea;
    letter-spacing: 4px;
  }
  /deep/ .el-col {
    position: relative;
    .deleteOper {
      content: "\E6D7";
      display: none;
      font-family: element-icons !important;
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
      position: absolute;
      bottom: 0;
      right: 5px;
    }
    &:hover {
      background: #fcf3ff;
      .deleteOper  {
        display: block;
      }
    }
    &.selected {
      background: #fcf3ff;
      .deleteOper  {
        display: block;
      }
    }
  }
}
</style>
