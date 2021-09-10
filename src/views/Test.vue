<template>
  <div>
  <el-pro-table
    :schema="schema"
    :ui-schema="uiSchema"
    row-key="id"
    multiple-selection
    :data="data"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    @selection-change="handleSelectionChange">
    <template slot="batchControl">
      <el-button type="text" :disabled="!isBatchButtonEnable">批量删除</el-button>
    </template>
  </el-pro-table>
</div>
</template>
<script>
const total = parseInt(Math.random() * 100, 10);

export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      schema: {
        properties: {
          Name: {
            title: '名称',
            type: 'string',
          },
          Enum: {
            title: '枚举值',
            type: 'string',
            oneOf: [
              {
                const: '1',
                title: '枚举值一',
              },
              {
                const: '2',
                title: '枚举值二',
              },
            ],
            updatable: true,
          },
          AnyOf: {
            title: '多选枚举值',
            type: 'array',
            anyOf: [
              {
                const: '1',
                title: '枚举值一',
              },
              {
                const: '2',
                title: '枚举值二',
              },
            ],
            updatable: true,
          },
          MaxLengthString: {
            title: '字符串输入',
            type: 'string',
            updatable: true,
            maxLength: 5,
          },
          Number: {
            title: '数字',
            type: 'number',
            updatable: true,
          },
          Price: {
            title: '价格',
            type: 'number',
            precision: '16',
            scale: '2',
            format: 'price',
            updatable: true,
          },
          Comment: {
            title: '备注',
            type: 'string',
            updatable: true,
          },
          Date: {
            title: '日期',
            type: 'string',
            format: 'date',
            updatable: true,
          },
          Time: {
            title: '时间',
            type: 'string',
            format: 'time',
            updatable: true,
          },
          Boolean: {
            title: '布尔值',
            type: 'boolean',
            updatable: true,
          },
          CustomSlot: {
            title: '自定义插槽',
            type: 'string',
            updatable: true,
          },
          HtmlContent: {
            title: '自定义渲染',
            type: 'string',
          },
        },
        required: ['MaxLengthString'],
      },
      uiSchema: {
      },
      data: null,
      totalDataLength: total,
    };
  },
  computed: {
    isBatchButtonEnable() {
      return this.multipleSelection.length > 0;
    },
  },
  mounted() {
    const tableData = [];
    for (let i = 0; i < total; i += 1) {
      tableData.push({
        Name: 'XXX',
        Price: 12345.678,
        Enum: '2',
        AnyOf: ['1', '2'],
        MaxLengthString: null,
        Number: 98765,
        Date: '2021-08-31',
        Time: '11:29:00',
        Comment: 'setaria-ui',
        Boolean: true,
        CustomSlotCode: '4104.01.03.01.02.05.10',
        CustomSlot: '装饰线条',
        HtmlContent: 'Link',
      });
    }
    this.data = tableData;
  },
  methods: {
    onRequest(params) {
      const { pageNum, pageSize } = params;
      const tableData = [];
      const startIndex = ((pageNum - 1) * pageSize) + 1;
      const endIndex = (pageNum * pageSize) > total ? total : (pageNum * pageSize);
      for (let i = startIndex; i <= endIndex; i += 1) {
        tableData.push({
          no: i,
          id: `zhangsan${i}`,
          age: parseInt(Math.random() * 100, 10),
          gender: (parseInt(Math.random() * 10, 10) % 2) + 1,
          birth: '1990-10-01',
          interest: '1',
        });
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: tableData,
            total,
          });
        }, 2000);
      });
    },
    handleUpdateButtonClick({ row }) {
      this.$message.warning(`修改 ${row.id} 数据!`);
    },
    handleCurrentChange(val) {
      this.$message.info(`跳转至 ${val} 页`);
    },
    handleSizeChange(val) {
      this.$message.info(`每页数据显示数量改为 ${val}`);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
