
<script>
// import cloneDeep from 'lodash/cloneDeep';
// import TableColumnDialog from './TableColumnDialog.vue';
// import {
//   // oneOfTureFalse,
//   tableColumnProps,
// } from '@/components/formGenerator/components';
// import ClipboardJS from 'clipboard';
// import { saveAs } from 'file-saver';
// import SortDeleteDialog from './SortDeleteDialog.vue';
// import {
//   generatVueCode,
//   getDataJson,
//   importVueFile,
// } from '@/utils/formGenerator';
// import { saveIdGlobal } from '@/utils/db';

// function hasClass(target, key) {
//   return Array.from(target.classList).includes(key);
// }
// // TODO 增加顶部相关按钮
export default {
  components: {},
  props: {
    tableList: {
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
      schema: {},
      uiSchema: {},
      tableData: [],
    };
  },
  mounted() {
    document
      .querySelector('.tableCardContainer')
      .addEventListener('click', (e) => {
        this.bindFindComponent(e);
      });
  },
  watch: {
    tableList: {
      deep: true,
      handler() {
        this.initSchema();
      },
    },
  },
  methods: {
    clear() {
      this.setActiveComponent({});
    },
    bindFindComponent(event) {
      const thNode = event.path.find(item => item.nodeName === 'TH');
      if (thNode) {
        const title = thNode.querySelector('.vxe-cell--title').innerText;

        const findObject = this.tableList.find(item => item.title === title);
        if (findObject) {
          this.setActiveComponent(findObject);
        }
      }
      // // if (event.target.nodeName.toLowerCase() === 'label') {
      // //   key = event.target.getAttribute('for');
      // // } else
      // if (labelNode) {
      //   key = labelNode.getAttribute('data-key');
      // } else if (
      //   hasClass(event.target, 'el-col')
      //   || hasClass(event.target, 'el-form-item')
      // ) {
      //   key = event.target.querySelector('label').getAttribute('data-key');
      // }
      // if (key) {
      //   const findObj = this.normalList
      //     .concat(this.advanceList)
      //     .find(item => item.key === key);
      //   if (findObj) {
      //     this.setActiveComponent(findObj);
      //     this.setActiveComponentClass(findObj);
      //   }
      // }
    },
    setActiveComponent(selectItem) {
      const array = Array.from(
        document.querySelectorAll('.tableCardContainer th'),
      );
      const findObj = array.find(item => item.innerText === selectItem.title);
      const alreadyItem = document.querySelector(
        '.tableCardContainer th.selected',
      );
      if (alreadyItem) {
        alreadyItem.classList.remove('selected');
      }
      if (findObj) {
        findObj.classList.add('selected');
      } else if (array.length) {
        array[array.length - 1].classList.add('selected');
      }
      this.$emit('setActiveComponent', selectItem, 'tableColumn');
    },
    initSchema() {
      const properties = {};
      const uiSchema = {};
      // const model = {};
      this.tableList.forEach((item) => {
        //            key: '',
        //   title: '',
        //   type: 'string',
        const { key, title, type } = item;

        properties[key] = {
          title,
          type,
        };
        uiSchema[key] = {
          'ui:options': {},
        };
        const optionKeys = Object.keys(item).filter(pKey => pKey.includes('ui:options.'));

        optionKeys.forEach((oKey) => {
          uiSchema[key]['ui:options'][oKey.split('ui:options.')[1]] = item[oKey] || '';
        });
        // if (key.includes('ui:options.')) {
        //   uiSchema[key]['ui:options'][key.split('ui:options.')[0]] = item[key] || '';
        // }

        // properties[key].lcComponentName = item.lcComponentName;
      });
      //   this.formModel = Object.assign(
      //     {},
      //     this.normalFormModel,
      //     this.advanceFormModel,
      //   );
      this.schema = {
        properties,
      };
      this.uiSchema = uiSchema;
    },
    renderProTable() {
      const { schema, uiSchema, tableData } = this;
      return (
        <el-pro-table
          schema={schema}
          uiSchema={uiSchema}
          data={tableData}
          isShowColumnSetting={false}
        ></el-pro-table>
      );
    },
    // renderAddDialog() {
    //   const { detailData } = this;
    //   return (
    //     <TableColumnDialog
    //       visible={this.visible}
    //       {...{
    //         on: {
    //           'update:visible': (val) => {
    //             this.visible = val;
    //           },
    //         },
    //       }}
    //       props={{ model: detailData }}
    //     />
    //   );
    // },
    // renderAddBtn() {
    //   const self = this;
    //   const newOne = () => {
    //     self.detailData = cloneDeep(tableColumnProps);
    //     self.visible = true;
    //   };
    //   return (
    //     <el-button type="primary" onClick={newOne}>
    //       新建表格字段
    //     </el-button>
    //   );
    // },
  },
  render() {
    //   :label-mode="labelMode"
    //     multiple-selection
    //     :get-row-button="getRowButton"
    //     :schema="schema"
    //     :ui-schema="uiSchema"
    //     data="data"
    //     row-key="id"
    //     @row-button-click="onRowButtonClick"
    //     @selection-change="onSelectionChange"

    return <div class="tableCardContainer">{this.renderProTable()}</div>;
  },
};
</script>

<style scoped lang="scss">
.tableCardContainer {
  margin: 10px 20px;
  /deep/ th.selected {
    background: #fcf3ff;
  }
}
</style>
