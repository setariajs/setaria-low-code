
<template>
    <div>
        <el-json-form ref="form"
            :model="formModel"
            :schema="formSchema"
            :ui-schema="formUiSchema"
            :rules="formRules"
            :label-width="'100px'"
            :label-suffix="':'"
            :show-message="true"

            />
    </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formSchema: {
        required: [],
        properties: {
          field115: {
            type: 'string',
            title: '单行文本',
          },
          field116: {
            type: 'string',
            title: '搜索帮助',
          },
        },
      },
      formUiSchema: {
        field115: {
          'ui:rules': [{
            pattern: /^1[3|4|5|7|8]\d{9}$/,
            message: '111',
          }],
          'ui:options': {},
        },
        field116: {
          'ui:options': {
            'suffix-icon': 'el-icon-search',
            readonly: true,
          },
          'ui:nativeOn': {
            click: () => {
              this.$message.info('searchHelp click');
            },
          },
        },
      },
      formModel: {
        field115: '',
        field116: '',
      },
      formRules: {},
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {

  },
};
</script>
<style scoped lang="scss">
</style>
