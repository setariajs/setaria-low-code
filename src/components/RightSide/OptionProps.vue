<template>
  <div class="optionPropsContainer">
    <el-divider>选项</el-divider>
    <draggable :list="value"
      :animation="340"
      group="optionItem"
      handle=".optionDrag">
      <div v-for="(item, index) in value"
        :key="index"
        class="optionItem">
        <div class="optionIcon optionDrag">
          <i class="el-icon-s-operation" />
        </div>
        <el-input v-model="item.label"
          placeholder="选项名"
          size="small" />
        <el-input placeholder="选项值"
          size="small"
          :value="item.value"
          @input="setOptionValue(item, $event)" />
        <div class="closeBtn optionIcon"
          @click="value.splice(index, 1)">
          <i class="el-icon-remove-outline" />
        </div>
      </div>
    </draggable>
    <div style="margin-left: 20px;">
      <el-button style="padding-bottom: 0"
        icon="el-icon-circle-plus-outline"
        type="text"
        @click="addOption">
        添加选项
      </el-button>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import isNumber from 'lodash/isNumber';
// import get from 'lodash/get';
// import { propsMapping } from '@/components/components';
// import findKey from 'lodash/findKey';

// const oneOfTureFalse = [
//   { const: false, title: '否' },
//   { const: true, title: '是' },
// ];
export default {
  components: { draggable },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // schema: {},
      // uiSchema: {},
      // innerValue: {},
      // subComponentType: '',
      // componentName: '',
    };
  },
  computed: {},
  watch: {
    // value: {
    //   deep: true,
    //   handler() {
    //     this.initComponent();
    //   },
    // },
  },
  methods: {
    setOptionValue(item, val) {
      item.value = isNumber(val) ? +val : val;
    },
    addOption() {
      this.value.push({
        label: '',
        value: '',
      });
    },

    // initComponent() {
    //   this.componentName = this.value.componentName;
    //   this.subComponentType = get(this.value, 'uiSchema.ui:widget', 'input');
    //   // 转换值为平层值
    //   const innerValue = Object.assign(
    //     {},
    //     this.value,
    //     this.value.schema,
    //     this.value.uiSchema,
    //     this.value.uiSchema['ui:options'],
    //   );
    //   // 删除无用参数
    //   delete innerValue.schema;
    //   delete innerValue.uiSchema;
    //   delete innerValue['ui:options'];

    //   const properties = {};
    //   const uiSchema = {};
    //   // 获取propsMapping 直接对接jsonform格式
    //   Object.keys(innerValue).forEach((key) => {
    //     if (propsMapping.properties[key]) {
    //       properties[key] = propsMapping.properties[key];
    //     }
    //     if (propsMapping.uiSchema[key]) {
    //       uiSchema[key] = propsMapping.uiSchema[key];
    //     }
    //   });

    //   this.innerValue = innerValue;

    //   this.schema = {
    //     properties,
    //   };
    //   this.uiSchema = uiSchema;
    // },
    // handlerChange(sourceKey, newValue) {
    //   const keys = this.loopFindKey(this.value, sourceKey);
    //   // 弹出对应的sourceKey位置内容
    //   keys.pop();
    //   // 获取sourceKey上一层对象，并准备赋值
    //   const model = get(this.value, keys.join('.'), this.value);
    //   model[sourceKey] = newValue;
    // },
    // // 轮询获取对应的可以位置
    // loopFindKey(loopModel, sourceKey) {
    //   let res = [];

    //   /* eslint-disable */
    //   for (const key in loopModel) {
    //     if (typeof loopModel[key] === "object") {
    //       const subRes = this.loopFindKey(loopModel[key], sourceKey);

    //       if (subRes.length !== 0) {
    //         res.push(key);
    //         res = res.concat(subRes);
    //         break;
    //       }
    //     }

    //     if (key === sourceKey) {
    //       res.push(key);
    //       break;
    //     }
    //   }
    //   /* eslint-enable */
    //   return res;
    // },
  },
};
</script>

<style scoped lang="scss">
.optionPropsContainer {
  padding: 0 10px;
  .optionItem {
    display: flex;
    margin-bottom: 10px;
    .el-input {
      padding: 0 3px;
    }
    .optionIcon {
      line-height: 32px;
      font-size: 22px;
      padding: 0 4px;
      color: #777;
    }
    .optionDrag {
      cursor: move;
    }
    .closeBtn {
      cursor: pointer;
      color: #f56c6c;
    }
  }
}
</style>
