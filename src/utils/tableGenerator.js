import JsBeautify from 'js-beautify';
import get from 'lodash/get';
import {
  inputComponents, selectComponents, formFormProps, tableColumnProps,
} from '@/components/formGenerator/components';

function getStyle() {
  return `
<style scoped lang="scss">
</style>`;
}

function getFormSchemaFromData(properties, formUiSchema, requiredList) {
  const list = [];

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

    list.push({
      required,
      key: newKey,
      lcComponentName,
      schema: Object.assign({}, componentsObject[lcComponentName].schema, item),
      uiSchema,
    });
  });
  return list;
}

function getTableSchemaFromData(properties, formUiSchema) {
  const list = [];

  // 转换原始组件为map

  // const componentsObject = inputComponents.concat(selectComponents).reduce((res, { lcComponentName, schema, uiSchema }) => {
  //   res[lcComponentName] = { schema, uiSchema };
  //   return res;
  // }, {});

  Object.keys(properties).forEach((key, index) => {
    // let required = false;
    const item = properties[key];
    Object.keys(formUiSchema[key]['ui:options']).forEach((oKey) => {
      item[`ui:options.${oKey}`] = formUiSchema[key]['ui:options'][oKey];
    });
    // 处理默认导出时与本地key相冲突问题
    let newKey = key;
    if (key.includes('field')) {
      newKey = key + index;
    }
    item.key = newKey;


    // const { lcComponentName } = item;
    // if (requiredList.includes(key)) {
    //   required = true;
    // }
    // const uiSchema = Object.assign({}, componentsObject[lcComponentName].uiSchema, formUiSchema[key]);
    // // 处理默认导出时与本地key相冲突问题
    // let newKey = key;
    // if (key.includes('field')) {
    //   newKey = key + index;
    // }

    list.push(Object.assign({}, tableColumnProps, item));
  });
  return list;
}

// 通过文件导入Vue文件，并获取组件List
function getScriptByVueFile(codeStr) {
  let normalList = [];
  let advanceList = [];
  let tableList = [];
  // eslint-disable-next-line no-useless-escape
  const p = /\<script\>.*?\<\/script\>/g;
  codeStr = codeStr.replace(/\n/g, '').replace(/ /g, '');
  const scriptStr = codeStr.match(p);
  if (scriptStr) {
    const jsCodeStr = scriptStr[0].replace('<script>exportdefault', '').replace('</script>', '');
    // eslint-disable-next-line no-eval
    const jsCode = eval(`(${jsCodeStr})`);
    const data = jsCode.data();

    normalList = getFormSchemaFromData(
      get(data, 'normalSchema.properties', {}),
      get(data, 'normalUiSchema', {}),
      get(data, 'normalSchema.required', []),
    );
    advanceList = getFormSchemaFromData(
      get(data, 'advanceSchema.properties', {}),
      get(data, 'advanceUiSchema', {}),
      get(data, 'advanceSchema.required', []),
    );
    tableList = getTableSchemaFromData(
      get(data, 'tableSchema.properties', {}),
      get(data, 'tableUiSchema', {}),
    );
  }
  return {
    normalList,
    advanceList,
    tableList,
  };
}
// 获取template 中的jsomForm属性信息
function getDomProps(codeStr) {
  codeStr = codeStr.replace(/\n/g, '');
  // console.log()
  // eslint-disable-next-line no-useless-escape
  const formStr = codeStr.match(/\<el-query-filter .*?\/\>/g);
  const list = formStr[0].replace('/>', '').split(' :');
  list.shift();

  const keys = Object.keys(formFormProps);

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
        formFormProps[key] = value === 'true';
      } else {
        formFormProps[key] = value;
      }
    }
    //
  });
  return formFormProps;
}

function formatUiSchema(formUiSchema) {
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
  return uiSchema;
}

export const getFormJson = (normalSchema,
  normalUiSchema,
  advanceSchema,
  advanceUiSchema,
  formModel) => JsBeautify.js(`
{
    normalSchema:${JSON.stringify(normalSchema)},
    normalUiSchema:${formatUiSchema(normalUiSchema)},
    advanceSchema:${JSON.stringify(advanceSchema)},
    advanceUiSchema:${formatUiSchema(advanceUiSchema)},
    formModel:${JSON.stringify(formModel)}
}
`);

export const getTableJson = (schema,
  uiSchema) => JsBeautify.js(`
{
    tableSchema:${JSON.stringify(schema)},
    tableUiSchema:${formatUiSchema(uiSchema)},
    tableList:[],
}
`);

function getScript(normalSchema,
  normalUiSchema,
  advanceSchema,
  advanceUiSchema,
  tableSchema,
  tableUiSchema,
  formModel) {
  const jsonStr = getFormJson(normalSchema,
    normalUiSchema,
    advanceSchema,
    advanceUiSchema,
    formModel);

  const tableStr = getTableJson(tableSchema,
    tableUiSchema);

  return `
<script>
export default {
    components: {},
    props: [],
    data () {
        return {
          ${jsonStr.substring(1, jsonStr.length - 1)},
          ${tableStr.substring(1, tableStr.length - 1)}
      }
    },
    computed: {},
    watch: {},
    mounted () {},
    methods: {
      afterSubmit(){
        console.log('afterSubmit');
      }
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
          ${propList.join('\n          ')}
          />
      </el-card>

      <el-pro-table
        :schema="tableSchema"
        :uiSchema="tableUiSchema"
        :data="tableList"
      ></el-pro-table>

    </div>
</template>
    `;
}
// 生成Vue文件代码
export const generatVueCode = (props,
  normalSchema,
  normalUiSchema,
  advanceSchema,
  advanceUiSchema,
  tableSchema,
  tableUiSchema,
  formModel) => {
  const code = getTemplate(props) + JsBeautify.html(getScript(normalSchema,
    normalUiSchema,
    advanceSchema,
    advanceUiSchema,
    tableSchema,
    tableUiSchema,
    formModel)) + getStyle();

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
        ...getScriptByVueFile(codeStr),
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
// v-bind="formFormProps"


//  */ }
