import JsBeautify from 'js-beautify';

function getStyle() {
  return `
<style scoped lang="scss">
</style>`;
}

export const getDataJson = (formSchema, formUiSchema, formModel) => {
  // 格式化 RegExp Function类型的数据
  console.log(formUiSchema);
  let uiSchema = JSON.stringify(formUiSchema, (key, value) => {
    if (value instanceof RegExp) {
      return value.toString();
    } if (value instanceof Function) {
      return value.toString();
    }
    return value;
  });


  // 二次格式化化 RegExp类型数据
  // eslint-disable-next-line no-useless-escape
  uiSchema = uiSchema.replace(/\"pattern\"\:\".*?\"/g, (source) => {
    let value = source.split(':"')[1];
    value = value.substring(0, value.length - 1);
    if (value) {
      value = value.replace(/\\\\/g, '\\');
      // eslint-disable-next-line no-eval
      return `"pattern":${value}`;
    }
    return '"pattern":""';
  });
  // 二次格式化化 Function类型数据
  // eslint-disable-next-line no-useless-escape
  uiSchema = uiSchema.replace(/function .*?\(\)/g, '()=>').replace(/\\n/g, '')
    .replace(/_this/g, 'this')
  // eslint-disable-next-line no-useless-escape
    .replace(/\"\(\)\=\>.*?\}\"/g, source => source.substring(1, source.length - 1))
  // eslint-disable-next-line no-useless-escape
    .replace(/\"function.*?\}\"/g, (sources) => {
      const res = sources.replace(/"function\(\)/g, '()=>');
      return res.substring(0, res.length - 1).replace('b.', 'this.');
    });

  return JsBeautify.js(`
  {
    formSchema:${JSON.stringify(formSchema)},
    formUiSchema:${uiSchema},
    formModel:${JSON.stringify(formModel)},
    formRules:{}
}
`);
};
function getScript(formSchema, formUiSchema, formModel) {
  return `
<script>
export default {
    components: {},
    props: [],
    data () {
        return ${getDataJson(formSchema, formUiSchema, formModel)}
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
