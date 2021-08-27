<template>

  <el-scrollbar :vertical="true" class="mainContentContainer">
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

      <!-- <draggable-item
                v-for="(item, index) in drawingList"
                :key="item.renderKey"
                :drawing-list="drawingList"
                :current-item="item"
                :index="index"
                :active-id="activeId"
                :form-conf="formConf"
                @activeItem="activeFormItem"
                @copyItem="drawingItemCopy"
                @deleteItem="drawingItemDelete"
              /> -->
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
      .addEventListener('click', this.findComponent);
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
        // :model="this.formModel"
        //       :schema="formSchema"
        //       :ui-schema="formUiSchema"
        //       :rules="rules"
      };
    },
    // formSchema() {
    //   // required: ['firstName', 'lastName', 'age', 'comment'],
    //   // properties: {
    //   //   firstName: {
    //   //     description: 'First Name(名)First Name(名)First Name(名)First Name(名)First Name(名)First Name(名)First Name(名)First Name(名)First Name(名)First Name(名)First Name(名)First Name(名)',
    //   //     type: 'string',
    //   //     title: 'First name',
    //   //     minLength: 3,
    //   //     maxLength: 6,
    //   //   },
    //   // }
    //   //  uiSchema: {}
    //   return {
    //     required,
    //     properties,
    //   };
    // },
    // formUiSchema() {
    //   const required = [];
    //   const properties = {};
    //   const uiSchema = {};
    //   this.drawingList.forEach((item) => {
    //     if (item.required) {
    //       required.push(item.key);
    //     }
    //     properties[item.key] = item.schema;
    //     uiSchema[item.key] = item.uiSchema;
    //   });
    //   return uiSchema;
    // },
  },
  methods: {
    initFormModel() {
      const required = [];
      const properties = {};
      const uiSchema = {};
      const model = {};
      this.drawingList.forEach((item) => {
        const { key } = item;
        if (item.required) {
          required.push(key);
        }
        properties[key] = this.formSchema[key] || item.schema;
        uiSchema[key] = this.formUiSchema[key] || item.uiSchema;
        // TODO 需要判断类型
        model[key] = this.formModel[key] || '';
      });

      this.formModel = model;
      this.formSchema = {
        required,
        properties,
      };
      this.formUiSchema = uiSchema;
    },
    findComponent(event) {
      let key = '';

      const labelNode = event.path.find(item => (item.className ? item.className.includes('el-form-item__label') : false));
      // if (event.target.nodeName.toLowerCase() === 'label') {
      //   key = event.target.getAttribute('for');
      // } else
      if (labelNode) {
        key = labelNode.getAttribute('for');
      } else if (
        Array.from(event.target.classList).includes('el-col')
        || Array.from(event.target.classList).includes('el-form-item')
      ) {
        key = event.target.querySelector('label').getAttribute('for');
      }
      if (key) {
        const findObj = this.drawingList.find(item => item.key === key);
        this.setActiveComponent(findObj);
      }
    },
    setActiveComponent(item) {
      this.$emit('setActiveComponent', item);
      // this.setActiveComponent = item;
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
  /deep/ .el-col:hover {
    background: #fcf3ff;
  }
}
</style>
