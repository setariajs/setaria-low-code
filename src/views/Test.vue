
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
          field113: {
            type: 'string',
            title: '搜索帮助',
            lcComponentName: 'searchHelp',
          },
        },
      },
      formUiSchema: {
        field113: {
          'ui:options': {
            'suffix-icon': 'el-icon-search',
            readonly: true,
          },
          'ui:nativeOn': {
            click: () => {
              console.log('bingo your are click now!!!!!');
            },
          },
        },
      },
      formModel: {
        field113: '',
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
