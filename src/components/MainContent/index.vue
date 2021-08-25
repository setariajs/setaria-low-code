<template>

  <el-scrollbar class="mainContentContainer">
    <!-- draggable=".el-form-item" -->
    <!-- draggable=".el-col"
      handle=".el-form-item__label-wrap"
       tag="el-json-form"
      :component-data="draggableComponentData" -->
    <draggable class="drawingBoard"
      :list="drawingList"
      :animation="340"
      group="componentsGroup">
      <el-json-form ref="form"
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
        if (item.required) {
          required.push(item.key);
        }
        properties[item.key] = item.schema;
        uiSchema[item.key] = item.uiSchema;
        // TODO 需要判断类型
        model[item.key] = '';
      });

      this.formModel = model;
      this.formSchema = {
        required,
        properties,
      };
      this.formUiSchema = uiSchema;
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
}
</style>
