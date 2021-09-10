
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
  components: { },
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
  mounted() {},
  watch: {
    tableList: {
      deep: true,
      handler() {
        this.initSchema();
      },
    },

  },
  methods: {
    initSchema() {
      const properties = {};
      // const model = {};
      this.tableList.forEach((item) => {
        //            key: '',
        //   title: '',
        //   type: 'string',
        const { key, title, type } = item;

        properties[key] = {
          title, type,
        };

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
    },
    renderProTable() {
      const { schema, uiSchema, tableData } = this;
      return <el-pro-table
       schema={schema}
       uiSchema={uiSchema}
       data={tableData}
      ></el-pro-table>;
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

    return (
      <div class="tableCardContainer">
        <el-card shadow="never"
        header="表格信息">
        {this.renderProTable()}
        </el-card>
      </div>
    );
  },
};
</script>

<style scoped lang="scss">
.tableCardContainer {
}
</style>
