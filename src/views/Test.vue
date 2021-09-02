
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
          field119: {
            type: 'string',
            title: '搜索帮助',
          },
          field120: {
            type: 'string',
            title: '单行文本',
          },
        },
      },
      formUiSchema: {
        field119: {
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
        field120: {
          'ui:rules': [{
            pattern: /^1[3|4|5|7|8]\d{9}$/,
            message: '1213123',
          }],
          'ui:options': {},
        },
      },
      formModel: {
        field119: '',
        field120: '',
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
