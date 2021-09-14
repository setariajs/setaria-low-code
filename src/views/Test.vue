
<template>
   <!-- generator by setaria-low-code TableGenerator v1.0 -->
    <div>
      <el-card shadow="never"
        :header="'搜索条件'">
        <el-query-filter v-model="formModel"
          v-bind="formProps"
          :normal-schema="normalSchema"
          :normal-ui-schema="normalUiSchema"
          :advance-schema="advanceSchema"
          :advance-ui-schema="advanceUiSchema"
          :after-submit="afterSubmit"
          :disabled="false"
          :label-position="'top'"
          :label-width="'auto'"
          :label-suffix="'：'"
          :size="'small'"
          :columns="'4'"
          :validate-on-rule-change="true"
          :show-message="true"
          :show-result="true"
          >
        </el-query-filter>
      </el-card>

      <el-pro-table
        :schema="tableSchema"
        :uiSchema="tableUiSchema"
        :data="tableList"
      ></el-pro-table>

    </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {

      normalSchema: {
        required: [],
        properties: {
          field183: {
            type: 'string',
            title: '单行文本',
            lcComponentName: 'input',
          },
        },
      },
      normalUiSchema: {
        field183: {
          'ui:rules': [],
          'ui:hidden': false,
          'ui:options': {},
        },
      },
      advanceSchema: {
        required: [],
        properties: {
          field184: {
            type: 'string',
            title: '单行文本',
            lcComponentName: 'input',
          },
        },
      },
      advanceUiSchema: {
        field184: {
          'ui:rules': [],
          'ui:hidden': false,
          'ui:options': {},
        },
      },
      formModel: {
        field183: '',
        field184: '',
      },

      tableSchema: {
        properties: {
          t1: {
            title: 't1',
            type: 'string',
          },
          t2: {
            title: 't2',
            type: 'string',
          },
        },
      },
      tableUiSchema: {
        t1: {
          'ui:options': {
            width: '',
            minWidth: '',
            fixed: '',
          },
        },
        t2: {
          'ui:options': {
            width: '',
            minWidth: '',
            fixed: '',
          },
        },
      },
      tableList: [],

    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    afterSubmit() {
      console.log('afterSubmit');
    },
  },
};
</script>
<style scoped lang="scss">
</style>
