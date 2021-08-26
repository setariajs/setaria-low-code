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
  </div>
</template>

<script>
import get from 'lodash/get';
// import findKey from 'lodash/findKey';

// const oneOfTureFalse = [
//   { const: false, title: '否' },
//   { const: true, title: '是' },
// ];
export default {
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
    };
  },
  computed: {
    // innerValue: {
    //   get() {
    //     return this.value;
    //   },
    //   set(val) {
    //     this.$emit('input', val);
    //   },
    // },
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.initParams();
      },
    },
  },
  methods: {
    initParams() {
      const { componentName } = this.value;
      if (componentName === 'input') {
        this.initInputComponent();
      }
    },
    initInputComponent() {
      this.subComponentType = get(this.value, 'uiSchema.ui:widget', 'input');


      const properties = {
        key: {
          type: 'string',
          title: '字段名',
        },
        title: {
          type: 'string',
          title: '标题',
        },
        description: {
          type: 'string',
          title: '标题补充描述',
        },
        // required: {
        //   type: 'boolean',
        //   title: '是否必填',
        //   oneOf: oneOfTureFalse,
        // },
      };

      const innerValue = Object.assign({}, this.value, this.value.schema, this.value.uiSchema);
      delete innerValue.schema;
      delete innerValue.uiSchema;
      this.innerValue = innerValue;
      //   const uiSchema = {
      //     required: {
      //       'ui:widget': 'select',
      //       'ui:options': {
      //         clearable: true,
      //       },
      //     },
      //   };
      this.schema = {
        properties,
      };


    //   console.log(componentType);
    },
    handlerChange(sourceKey, newValue) {
      //   console.log(this.loopFindKey(this.value, 'key'));
      //   console.log(this.loopFindKey(this.value, 'description'));
      //   console.log(this.loopFindKey(this.value, 'ui:disabled'));
      //   console.log(this.loopFindKey(this.value, 'ui:readonly'));
      const keys = this.loopFindKey(this.value, sourceKey);
      keys.pop();
      const model = get(this.value, keys.join('.'), this.value);
      model[sourceKey] = newValue;
    },
    loopFindKey(loopModel, sourceKey) {
      const res = [];

      /* eslint-disable */
      for (const key in loopModel) {
        if (typeof loopModel[key] === 'object') {
          const subRes = this.loopFindKey(loopModel[key], sourceKey);

          if (subRes.length !== 0) {
            res.push(key);
            res.push(subRes[0]);
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
    //   Object.keys(loopModel).forEach(key => key === sourceKey);
    //   return loopModel[resKey];
    },
  },

};
</script>

<style scoped lang="scss">

</style>
