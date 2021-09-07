import JsBeautify from 'js-beautify';
import get from 'lodash/get';
import { inputComponents, selectComponents, formProps } from '@/components/formGenerator/components';

function getStyle() {
  return `
<style scoped lang="scss">
</style>`;
}

// 通过文件导入Vue文件，并获取组件List
function getScriptByVueFile(codeStr) {
  const drawingList = [];
  // eslint-disable-next-line no-useless-escape
  const p = /\<script\>.*?\<\/script\>/g;
  codeStr = codeStr.replace(/\n/g, '').replace(/ /g, '');
  const scriptStr = codeStr.match(p);
  if (scriptStr) {
    const jsCodeStr = scriptStr[0].replace('<script>exportdefault', '').replace('</script>', '');
    // eslint-disable-next-line no-eval
    const jsCode = eval(`(${jsCodeStr})`);
    const data = jsCode.data();
    const properties = get(data, 'formSchema.properties', {});
    const formUiSchema = get(data, 'formUiSchema', {});
    const requiredList = get(data, 'formSchema.required', []);

    // 转换原始组件为map

    const componentsObject = inputComponents.concat(selectComponents).reduce((res, { lcComponentName, schema, uiSchema }) => {
      res[lcComponentName] = { schema, uiSchema };
      return res;
    }, {});

    Object.keys(properties).forEach((key, index) => {
      let required = false;
      const item = properties[key];
      const { lcComponentName } = item;
      if (requiredList.includes(key)) {
        required = true;
      }
      const uiSchema = Object.assign({}, componentsObject[lcComponentName].uiSchema, formUiSchema[key]);
      // 处理默认导出时与本地key相冲突问题
      let newKey = key;
      if (key.includes('field')) {
        newKey = key + index;
      }

      drawingList.push({
        required,
        key: newKey,
        lcComponentName,
        schema: Object.assign({}, componentsObject[lcComponentName].schema, item),
        uiSchema,
      });
    });
  }
  return drawingList;
}
// 获取template 中的jsomForm属性信息
function getDomProps(codeStr) {
  codeStr = codeStr.replace(/\n/g, '');
  // console.log()
  // eslint-disable-next-line no-useless-escape
  const formStr = codeStr.match(/\<el-json-form .*?\/\>/g);
  const list = formStr[0].replace('/>', '').split(' :');
  list.shift();

  const keys = Object.keys(formProps);

  list.forEach((item) => {
    item.trim();
    console.log(item);
    const kv = item.split('=');
    const key = kv[0];
    // eslint-disable-next-line no-useless-escape
    const value = kv[1].replace(/\"/g, '').replace(/\'/g, '').replace(/ /g, '');
    if (keys.includes(key)) {
      console.log(key, value);
      if (['true', 'false'].includes(value)) {
        formProps[key] = value === 'true';
      } else {
        formProps[key] = value;
      }
    }
    //
  });
  return formProps;
}

// 获取Vue中data部分json数据
export const getDataJson = (formSchema, formUiSchema, formModel) => {
  // 格式化 RegExp Function类型的数据
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
      return res.substring(0, res.length - 1);// .replace('b.', 'this.');
    })
  // eslint-disable-next-line no-useless-escape
    .replace(/\\\"/g, '"');

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
// 获取基础模板代码
function getTemplate(props) {
  const propList = [];
  Object.keys(props).forEach((key) => {
    if (!(props[key] === '' || props[key] === undefined)) {
      if (typeof props[key] === 'string') {
        propList.push(`:${key}="'${props[key]}'"`);
      } else {
        propList.push(`:${key}="${props[key]}"`);
      }
    }
  });


  return `
<template>
   <!-- generator by setaria-low-code v1.0 -->
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
// 生成Vue文件代码
export const generatVueCode = (props, formSchema, formUiSchema, formModel) => {
  const code = getTemplate(props) + JsBeautify.html(getScript(formSchema, formUiSchema, formModel)) + getStyle();

  return code;
};

// 导入Vue代码
export const importVueFile = targer => new Promise((resolve, reject) => {
  const reader = new FileReader();
  if (targer.files) {
    reader.readAsText(targer.files[0], 'UTF-8');
    reader.onload = (e) => {
      const codeStr = e.target.result;
      resolve({
        drawingList: getScriptByVueFile(codeStr),
        formProps: getDomProps(codeStr),
      });
    };
  } else {
    reject(new Error('上传Vue文件错误'));
  }
});


export default {
  generatVueCode,
};


// { /*
// v-bind="formProps"


//  */ }
