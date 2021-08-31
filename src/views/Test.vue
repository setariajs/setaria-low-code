
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
          field138: {
            type: 'string',
            title: '单行文本',
          },
          field139: {
            type: 'string',
            title: '密码',
          },
        },
      },
      formUiSchema: {
        field138: {
          'ui:rules': [],
          'ui:options': {},
        },
        field139: {
          'ui:widget': 'password',
          'ui:rules': [],
          'ui:options': {},
        },
      },
      formModel: {
        field138: '',
        field139: '',
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
