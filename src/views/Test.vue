
<template>
   <!-- generator by setaria-low-code v1.0 -->
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
          field235: {
            type: 'string',
            title: '单行文本',
          },
          field236: {
            type: 'string',
            title: '密码',
          },
          field237: {
            type: 'string',
            title: '文本域',
          },
        },
      },
      formUiSchema: {
        field235: {
          'ui:rules': [],
          'ui:options': {},
        },
        field236: {
          'ui:widget': 'password',
          'ui:rules': [],
          'ui:options': {},
        },
        field237: {
          'ui:widget': 'textarea',
          'ui:rules': [],
          'ui:options': {
            'ui:rows': 2,
          },
        },
      },
      formModel: {
        field235: '',
        field236: '',
        field237: '',
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
