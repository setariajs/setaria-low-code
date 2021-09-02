
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
          field226: {
            type: 'string',
            title: '单行文本',
          },
        },
      },
      formUiSchema: {
        field226: {
          'ui:rules': [{
            pattern: /^1[3|4|5|7|8]\\d{9}$/,
            message: '111',
          }],
          'ui:options': {},
        },
      },
      formModel: {
        field226: '',
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
