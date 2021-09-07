<template>
  <div class="mainContentContainer">
    <div class="topArea">
      <el-button type="text"
        icon="el-icon-setting"
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

      <!-- <el-button type="text"
        icon="el-icon-download"
        @click="downloadCode">下载Vue文件</el-button> -->

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
        class="dangerText">清空</el-button>
    </div>

    <el-scrollbar class="scrollBar"
      :vertical="true">
      <draggable class="drawingBoard"
        draggable=".el-col"
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
        <!-- <div class="el-col"
        v-for="(item,index) in drawingList"
        :key="index">{{item}}</div> -->

      </draggable>

      <div v-show="!drawingList.length"
        class="emptyInfo">
        从左侧拖入或点选组件进行表单设计
      </div>
    </el-scrollbar>
    <input id="copyNode"
      type="hidden">
    <input type="file"
      accept=".vue"
      id="uploader"
      @change="changeFile"
      style="display:none;" />
    <sort-delete-dialog :visible.sync="visible"
      v-model="drawingList"
      @delete="setDefaultComponent" />

  </div>
</template>

<script>
import draggable from 'vuedraggable';
import ClipboardJS from 'clipboard';
import { saveAs } from 'file-saver';
import SortDeleteDialog from './SortDeleteDialog.vue';
import {
  generatVueCode,
  getDataJson,
  importVueFile,
} from '@/utils/formGenerator';
import { saveIdGlobal } from '@/utils/db';

function hasClass(target, key) {
  return Array.from(target.classList).includes(key);
}
// TODO 增加顶部相关按钮
export default {
  components: { draggable, SortDeleteDialog },
  props: {
    // drawingList: {
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
      formSchema: {},
      formUiSchema: {},
      rules: {},
      visible: false,
      copyType: '',
      drawingList: [],
    };
  },
  mounted() {
    document.querySelector('.drawingBoard').addEventListener('click', (e) => {
      this.bindFindComponent(e);
      // this.bindRomoveComponent(e);
    });
    const clipboard = new ClipboardJS('#copyNode', {
      text: () => {
        const codeStr = this.generateCode(this.copyType);
        this.$notify({
          title: '成功',
          message: '代码已复制到剪切板，可粘贴。',
          type: 'success',
        });
        return codeStr;
      },
    });
    clipboard.on('error', () => {
      this.$message.error('代码复制失败');
    });
  },
  watch: {
    drawingList: {
      deep: true,
      handler() {
        this.initFormModel();
      },
    },
    'formProps.inline': {
      handler() {
        this.initFormModel();
        setTimeout(() => {
          this.setDefaultComponent();
        }, 500);
      },
    },
  },
  computed: {
  },
  methods: {
    addComponent(item) {
      const loading = this.$loading({
        lock: true,
        text: '渲染中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      this.drawingList.push(item);
      this.setActiveComponent(item);
      setTimeout(() => {
        this.setActiveComponentClass(item);
        loading.close();
      }, 200);
    },
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

      this.formModel = model;
      this.formSchema = {
        required,
        properties,
      };
      this.formUiSchema = uiSchema;
      this.$nextTick(() => {
        this.appendKeyInfo();
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
    appendKeyInfo() {
      Array.from(document.querySelectorAll('.drawingBoard .el-form-item')).forEach(
        (dom, index) => {
          // if (!dom.innerHTML.includes('deleteOper')) {
          //   dom.innerHTML += '<i class="el-icon-delete deleteOper"><i>';
          // }
          dom
            .querySelector('label')
            .setAttribute('data-key', this.drawingList[index].key);
        },
      );
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
        const findObj = this.drawingList.find(item => item.key === key);
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
      if (this.drawingList.length) {
        this.setActiveComponent(this.drawingList[0]);
        this.setActiveComponentClass(this.drawingList[0]);
      }
    },
    showSortDeleteDialog() {
      this.visible = true;
    },
    empty() {
      this.$confirm('确定要清空所有组件吗？', '提示', { type: 'warning' }).then(
        () => {
          saveIdGlobal(100);
          this.drawingList = [];
          this.setActiveComponent({});
        },
      );
    },
    generateCode(generateType) {
      if (generateType === 'json') {
        return getDataJson(this.formSchema, this.formUiSchema, this.formModel);
      }
      return generatVueCode(
        this.formProps,
        this.formSchema,
        this.formUiSchema,
        this.formModel,
      );
    },
    copyCommand(name) {
      this.copyType = name;
      document.getElementById('copyNode').click();
    },
    upDownCommand(name) {
      if (name === 'download') {
        this.downloadCode();
      } else {
        document.getElementById('uploader').click();
      }
    },
    downloadCode() {
      const codeStr = this.generateCode();
      const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, 'LowCodeForm.vue');
    },
    async changeFile(e) {
      const loading = this.$loading({
        lock: true,
        text: '渲染中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });

      const { drawingList, formProps } = await importVueFile(e.target);
      this.drawingList = drawingList;
      this.$emit('changeFormProps', formProps);
      document.getElementById('uploader').value = '';
      setTimeout(() => {
        this.setDefaultComponent();
        loading.close();
      }, 200);
    },
  },
};
</script>

<style scoped lang="scss">
.mainContentContainer {
  .topArea {
    border-bottom: 1px solid #e3e3e3;
    text-align: right;
    padding-right: 20px;
    .dangerText {
      color: #f56c6c;
    }
    .copyBtn {
      margin: 0 7px;
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
    min-height: 300px;
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
