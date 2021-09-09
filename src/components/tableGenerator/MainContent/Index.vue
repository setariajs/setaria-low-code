<template>
  <div class="mainContentContainer">
    <div class="topArea">
      <div class="leftArea">
        <el-button type="text"
          icon="el-icon-notebook-2"
          @click="$router.push('/')">前往表单设计器</el-button>
      </div>
      <div class="rightArea">
        <!-- <el-button type="text"
          icon="el-icon-s-operation"
          @click="showSortDeleteDialog">排序&删除</el-button>

        <el-dropdown @command="upDownCommand">
          <el-button type="text"
            icon="el-icon-sort"
            class="copyBtn">上传/下载Vue文件</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="uplaod">上传Vue文件</el-dropdown-item>
            <el-dropdown-item command="download">下载Vue文件</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>


        <el-dropdown @command="copyCommand">
          <el-button type="text"
            icon="el-icon-document-copy"
            class="copyBtn">复制</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="all">复制完整代码</el-dropdown-item>
            <el-dropdown-item command="json">复制Json代码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-button type="text"
          icon="el-icon-delete"
          @click="empty"
          class="dangerText">清空</el-button> -->
      </div>
    </div>

    <el-scrollbar class="scrollBar"
      :vertical="true">

      <el-card shadow="never"
        class="drawingBoard"
        :header="'搜索条件'">
        <!-- :before-submit="beforeSubmit"
                   :after-submit="afterSubmit"
                   @change="handleChange"
                   @clear="handleClear" -->
        <el-query-filter v-model="formModel"
          v-bind="formProps"
          :normal-schema="normalSchema"
          :normal-ui-schema="normalUiSchema"
          :advance-schema="advanceSchema"
          :advance-ui-schema="advanceUiSchema">
        </el-query-filter>

      </el-card>

      <!-- <draggable
        draggable=".el-col"
        :list="normalList"
        :animation="340"
        group="componentsGroup">
        <el-json-form ref="form"
          v-bind="formProps"
          :model="formModel"
          :schema="formSchema"
          :ui-schema="formUiSchema"
          :rules="rules">
        </el-json-form>

      </draggable> -->

      <div v-show="!normalList.length"
        class="emptyInfo">
        从左侧点选组件进行表单设计
      </div>
    </el-scrollbar>
    <!-- <input id="copyNode"
      type="hidden">
    <input type="file"
      accept=".vue"
      id="uploader"
      @change="changeFile"
      style="display:none;" /> -->
    <!-- <sort-delete-dialog :visible.sync="visible"
        v-model="normalList"
        @delete="setDefaultComponent" /> -->

  </div>
</template>

<script>
// import draggable from 'vuedraggable';
// import ClipboardJS from 'clipboard';
// import { saveAs } from 'file-saver';
// import SortDeleteDialog from './SortDeleteDialog.vue';
// import {
//   generatVueCode,
//   getDataJson,
//   importVueFile,
// } from '@/utils/formGenerator';
// import { saveIdGlobal } from '@/utils/db';

function hasClass(target, key) {
  return Array.from(target.classList).includes(key);
}
// TODO 增加顶部相关按钮
export default {
  components: {},
  props: {
    // normalList: {
    //   type: Array,
    //   default: () => [],
    // },
    formProps: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formModel: {},
      normalFormModel: {},
      normalSchema: {},
      normalUiSchema: {},
      advanceFormModel: {},
      advanceSchema: {},
      advanceUiSchema: {},
      visible: false,
      copyType: '',
      normalList: [],
      advanceList: [],
    };
  },
  mounted() {
    document.querySelector('.drawingBoard').addEventListener('click', (e) => {
      this.bindFindComponent(e);
      // this.bindRomoveComponent(e);
    });
    // const clipboard = new ClipboardJS('#copyNode', {
    //   text: () => {
    //     const codeStr = this.generateCode(this.copyType);
    //     this.$notify({
    //       title: '成功',
    //       message: '代码已复制到剪切板，可粘贴。',
    //       type: 'success',
    //     });
    //     return codeStr;
    //   },
    // });
    // clipboard.on('error', () => {
    //   this.$message.error('代码复制失败');
    // });
  },
  watch: {
    normalList: {
      deep: true,
      handler() {
        this.initNormalSchema();
      },
    },
    advanceList: {
      deep: true,
      handler() {
        this.initAdvanceSchema();
      },
    },
    // 'formProps.inline': {
    //   handler() {
    //     this.initFormModel();
    //     setTimeout(() => {
    //       this.setDefaultComponent();
    //     }, 500);
    //   },
    // },
  },
  computed: {},
  methods: {
    addComponent(item, type) {
      const loading = this.$loading({
        lock: true,
        text: '渲染中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });

      if (type === 'normal') {
        this.normalList.push(item);
      } else if (type === 'advance') {
        this.advanceList.push(item);
      }

      // this.setActiveComponent(item);
      setTimeout(() => {
        //   this.setActiveComponentClass(item);
        loading.close();
      }, 200);
    },
    initNormalSchema() {
      const required = [];
      const properties = {};
      const uiSchema = {};
      const model = {};
      this.normalList.forEach((item) => {
        const { key } = item;
        if (item.required) {
          required.push(key);
        }

        properties[key] = this.normalSchema[key] || item.schema;
        uiSchema[key] = this.normalUiSchema[key] || item.uiSchema;
        // 处理 uiSchema.ui:options 类型赋值问题
        this.processUiSchemaKey(uiSchema[key]['ui:options']);

        // TODO 需要判断类型
        if (properties[key].type === 'array') {
          model[key] = this.formModel[key] || [];
        } else {
          model[key] = this.formModel[key] || '';
        }
        properties[key].lcComponentName = item.lcComponentName;
      });
      this.normalFormModel = model;
      this.formModel = Object.assign(
        {},
        this.normalFormModel,
        this.advanceFormModel,
      );
      this.normalSchema = {
        required,
        properties,
      };
      this.normalUiSchema = uiSchema;
      this.$nextTick(() => {
        this.appendKeyInfo('normal');
      });
    },
    initAdvanceSchema() {
      const required = [];
      const properties = {};
      const uiSchema = {};
      const model = {};
      this.advanceList.forEach((item) => {
        const { key } = item;
        if (item.required) {
          required.push(key);
        }

        properties[key] = this.advanceSchema[key] || item.schema;
        uiSchema[key] = this.advanceUiSchema[key] || item.uiSchema;
        // 处理 uiSchema.ui:options 类型赋值问题
        this.processUiSchemaKey(uiSchema[key]['ui:options']);

        // TODO 需要判断类型
        if (properties[key].type === 'array') {
          model[key] = this.formModel[key] || [];
        } else {
          model[key] = this.formModel[key] || '';
        }
        properties[key].lcComponentName = item.lcComponentName;
      });

      this.advanceFormModel = model;
      this.formModel = Object.assign(
        {},
        this.normalFormModel,
        this.advanceFormModel,
      );
      this.advanceSchema = {
        required,
        properties,
      };
      this.advanceUiSchema = uiSchema;
      this.$nextTick(() => {
        this.appendKeyInfo('advance');
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
    // 添加默认key属性
    appendKeyInfo(operType) {
      let list = null;
      let fatherClass = '';
      if (operType === 'normal') {
        list = this.normalList;
        fatherClass = 'el-query-filter__normal';
      } else {
        list = this.advanceList;
        fatherClass = 'el-query-filter__advance';
      }

      Array.from(
        document.querySelectorAll(`.${fatherClass} .el-form-item`),
      ).forEach((dom, index) => {
        // if (!dom.innerHTML.includes('deleteOper')) {
        //   dom.innerHTML += '<i class="el-icon-delete deleteOper"><i>';
        // }
        const labelDom = dom.querySelector('label');
        if (labelDom) {
          labelDom.setAttribute('data-key', list[index].key);
        }
      });
    },
    bindFindComponent(event) {
      let key = '';
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
        const findObj = this.normalList.concat(this.advanceList).find(item => item.key === key);
        if (findObj) {
          this.setActiveComponent(findObj);
          this.setActiveComponentClass(findObj);
        }
      }
    },
    // bindRomoveComponent(event) {
    //   if (hasClass(event.target, 'deleteOper')) {
    //     const key = event.target.parentElement
    //       .querySelector('label')
    //       .getAttribute('data-key');
    //     this.removeComponentByKey(key);
    //   }
    // },
    setActiveComponentClass(selectItem) {
      const array = Array.from(
        document.querySelectorAll('.drawingBoard .el-form-item'),
      );
      const findObj = array.find(item => item.querySelector(`label[data-key="${selectItem.key}"]`));
      const alreadyItem = document.querySelector(
        '.drawingBoard .el-form-item.selected',
      );
      if (alreadyItem) {
        alreadyItem.classList.remove('selected');
      }
      if (findObj) {
        findObj.classList.add('selected');
      } else {
        array[array.length - 1].classList.add('selected');
      }
    },
    setActiveComponent(item) {
      this.$emit('setActiveComponent', item);
    },
    setDefaultComponent() {
      if (this.normalList.length) {
        this.setActiveComponent(this.normalList[0]);
        this.setActiveComponentClass(this.normalList[0]);
      }
    },
    showSortDeleteDialog() {
      this.visible = true;
    },
    // empty() {
    //   this.$confirm('确定要清空所有组件吗？', '提示', { type: 'warning' }).then(
    //     () => {
    //       saveIdGlobal(100);
    //       this.normalList = [];
    //       this.setActiveComponent({});
    //     },
    //   );
    // },
    // generateCode(generateType) {
    //   if (generateType === 'json') {
    //     return getDataJson(this.formSchema, this.formUiSchema, this.formModel);
    //   }
    //   return generatVueCode(
    //     this.formProps,
    //     this.formSchema,
    //     this.formUiSchema,
    //     this.formModel,
    //   );
    // },
    // copyCommand(name) {
    //   this.copyType = name;
    //   document.getElementById('copyNode').click();
    // },
    // upDownCommand(name) {
    //   if (name === 'download') {
    //     this.downloadCode();
    //   } else {
    //     document.getElementById('uploader').click();
    //   }
    // },
    // downloadCode() {
    //   const codeStr = this.generateCode();
    //   const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' });
    //   saveAs(blob, 'LowCodeForm.vue');
    // },
    // async changeFile(e) {
    //   const loading = this.$loading({
    //     lock: true,
    //     text: '渲染中...',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)',
    //   });

    //   const { normalList, formProps } = await importVueFile(e.target);
    //   this.normalList = normalList;
    //   this.$emit('changeFormProps', formProps);
    //   document.getElementById('uploader').value = '';
    //   setTimeout(() => {
    //     this.setDefaultComponent();
    //     loading.close();
    //   }, 200);
    // },
  },
};
</script>

<style scoped lang="scss">
.mainContentContainer {
  .topArea {
    border-bottom: 1px solid #e3e3e3;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    .leftArea {
    }

    .rightArea {
      .dangerText {
        color: #f56c6c;
      }
      .copyBtn {
        margin: 0 7px;
      }
    }
  }

  .scrollBar {
    height: calc(100% - 40px);
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  .drawingBoard {
    height: 100%;
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
  /deep/ .el-form-item {
    // position: relative;
    // .deleteOper {
    //   content: "\E6D7";
    //   display: none;
    //   font-family: element-icons !important;
    //   border-radius: 50%;
    //   border: 1px solid #f44336;
    //   color: #f44336;
    //   font-size: 12px;
    //   width: 16px;
    //   height: 16px;
    //   text-align: center;
    //   line-height: 15px;
    //   padding-left: 1px;
    //   cursor: pointer;
    //   position: absolute;
    //   bottom: 0;
    //   right: 5px;
    // }
    &:hover {
      background: #fcf3ff;
      .deleteOper {
        display: block;
      }
    }
    &.selected {
      background: #fcf3ff;
      .deleteOper {
        display: block;
      }
    }
  }
}
</style>
