import JsBeautify from 'js-beautify';

function getStyle() {
  return `
<style scoped lang="scss">
</style>`;
}
function getScript(formSchema, formUiSchema, formModel) {
  return `
<script>
export default {
    components: {},
    props: [],
    data () {
        return {
            formSchema:${JSON.stringify(formSchema)},
            formUiSchema:${JSON.stringify(formUiSchema)},
            formModel:${JSON.stringify(formModel)},
            formRules:{}
        }
    },
    computed: {},
    watch: {},
    mounted () {},
    methods: {
    
    }
}
</script>
`;
}
function getTemplate(formProps) {
  const propList = [];
  Object.keys(formProps).forEach((key) => {
    if (formProps[key]) {
      if (typeof formProps[key] === 'string') {
        propList.push(`:${key}="'${formProps[key]}'"`);
      } else {
        propList.push(`:${key}="${formProps[key]}"`);
      }
    }
  });


  return `
<template>
    <div>
        <el-json-form ref="form"
            :model="formModel"
            :schema="formSchema"
            :ui-schema="formUiSchema"
            :rules="formRules"
            ${propList.join('\n            ')}
            
            />
    </div>
</template>
    `;
}

export const generatVueCode = (formProps, formSchema, formUiSchema, formModel) => {
  const code = getTemplate(formProps) + JsBeautify.html(getScript(formSchema, formUiSchema, formModel)) + getStyle();

  return code;
};
export default {
  generatVueCode,
};


// { /*
// v-bind="formProps"


//  */ }
