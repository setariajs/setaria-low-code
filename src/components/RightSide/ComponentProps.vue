<template>
  <div class="componentPropsContainer">
    <el-json-form ref="form"
      :size="'mini'"
      :label-position="'right'"
      :label-width="'130px'"
      :label-suffix="':'"
      :model="innerValue"
      :schema="schema"
      :ui-schema="uiSchema"
      :validate-on-rule-change="false"
      :columns="1"
      @change="handlerChange" />

    <!-- 单选选项配置 -->
    <option-props v-model="value.schema.oneOf"
      v-if="value.schema && value.schema.oneOf" />
    <!-- 多选选项配置 -->
    <option-props v-model="value.schema.anyOf"
      v-if="value.schema && value.schema.anyOf" />
    <!-- 正则校验配置 -->
    <regular-props v-model="value.uiSchema['ui:rules']"
      v-if="value.uiSchema && value.uiSchema['ui:rules']" />
  </div>
</template>

<script>
import get from 'lodash/get';
import { propsMapping } from '@/components/components';
import OptionProps from './OptionProps.vue';
import RegularProps from './RegularProps.vue';


export default {
  components: { OptionProps, RegularProps },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      schema: {},
      uiSchema: {},
      innerValue: {},
      subComponentType: '',
      componentName: '',
      list: [],
    };
  },
  computed: {},
  watch: {
    value: {
      deep: true,
      handler() {
        this.initComponent();
      },
    },
  },
  methods: {
    initComponent() {
      this.componentName = this.value.componentName;
      this.subComponentType = get(this.value, 'uiSchema.ui:widget', 'input');
      // 转换值为平层值
      const innerValue = Object.assign(
        {},
        this.value,
        this.value.schema,
        this.value.uiSchema,
        this.processUiSchemaKey(this.value.uiSchema['ui:options']),
      );
      // 删除无用参数
      delete innerValue.schema;
      delete innerValue.uiSchema;
      delete innerValue['ui:options'];

      const properties = {};
      const uiSchema = {};
      // 获取propsMapping 直接对接jsonform格式
      Object.keys(innerValue).forEach((key) => {
        if (propsMapping.properties[key]) {
          properties[key] = propsMapping.properties[key];
        }
        if (propsMapping.uiSchema[key]) {
          uiSchema[key] = propsMapping.uiSchema[key];
        }
      });

      this.innerValue = innerValue;

      this.schema = {
        properties,
      };
      this.uiSchema = uiSchema;
    },
    // 暂时删除被冲突的key
    processUiSchemaKey(uiOptions) {
      Object.keys(uiOptions).forEach((key) => {
        if (key.includes('uiSchema.ui:options.')) {
          const targetKey = key.split('.').pop();
          delete uiOptions[targetKey];
          // uiOptions[targetKey] = uiOptions[key];
        }
      });
      return uiOptions;
    },
    handlerChange(sourceKey, newValue) {
      const keys = this.loopFindKey(this.value, sourceKey);
      // 弹出对应的sourceKey位置内容
      keys.pop();
      // 获取sourceKey上一层对象，并准备赋值
      const model = get(this.value, keys.join('.'), this.value);
      model[sourceKey] = newValue;
    },
    // 轮询获取对应的可以位置
    loopFindKey(loopModel, sourceKey) {
      let res = [];

      /* eslint-disable */
      for (const key in loopModel) {
        if (typeof loopModel[key] === "object") {
          const subRes = this.loopFindKey(loopModel[key], sourceKey);

          if (subRes.length !== 0) {
            res.push(key);
            res = res.concat(subRes);
            break;
          }
        }

        if (key === sourceKey) {
          res.push(key);
          break;
        }
      }
      /* eslint-enable */
      return res;
    },
  },
};
</script>

<style scoped lang="scss">
.componentPropsContainer {
  padding: 0 10px;
  height: 100%;
  box-sizing: content-box;
}
</style>
