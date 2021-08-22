<template>
  <div>
  <div style="margin-bottom: 10px;">
    <el-button @click="onChangeUiSchema">change ui schema</el-button>
  </div>
  <el-json-form
    ref="form1"
    :model="form1"
    :schema="schema"
    :ui-schema="uiSchema"
    :validate-on-rule-change="false"
    :columns="2"
    :rules="rules"
    @submit="onSubmit"
    @change="onChange"
  >
    <div slot="button">
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </div>
  </el-json-form>
  <p>result:</p>
  <div>
    {{ this.form1 }}
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      form1: null,
      rules: {
        comment: [
          {
            validator: (rule, value, callback) => {
              if (value === 'abc') {
                callback(new Error('不能输入abc'));
              }
              callback();
            },
          },
        ],
      },
      schema: {
        required: ['firstName', 'lastName', 'age', 'comment'],
        properties: {
          firstName: {
            description: 'First Name(名)First Name(名)First Name(名)First Name(名)First Name(名)First Name(名)First Name(名)First Name(名)First Name(名)First Name(名)First Name(名)First Name(名)',
            type: 'string',
            title: 'First name',
            minLength: 3,
            maxLength: 6,
          },
          lastName: {
            type: 'string',
            title: 'Last name',
          },
          password: {
            type: 'string',
            title: 'password',
          },
          age: {
            type: 'integer',
            title: 'Age',
          },
          gender: {
            type: 'integer',
            title: 'gender',
            oneOf: [
              { const: 1, title: 'Male' },
              { const: 2, title: 'FeMale' },
              { const: 3, title: 'Other', disabled: true },
            ],
          },
          birth: {
            type: 'string',
            title: 'birth',
            format: 'date',
          },
          time: {
            type: 'array',
            title: 'time',
            format: 'time',
          },
          dateTime: {
            type: 'string',
            title: 'dateTime',
            format: 'date-time',
          },
          interest: {
            type: 'array',
            title: 'interest',
            anyOf: [
              { const: '1', title: 'Game' },
              { const: '2', title: 'Music' },
              { const: '3', title: 'Sport' },
            ],
          },
          comment: {
            type: 'string',
            title: 'comment',
          },
          profession: {
            type: 'string',
            title: 'profession',
            oneOf: [
              { const: 1, title: 'teacher' },
              { const: 2, title: 'doctor' },
            ],
          },
          agree: {
            type: 'boolean',
            title: 'agree',
          },
        },
      },
      uiSchema: {
        lastName: {
          'ui:disabled': false,
        },
        gender: {
          'ui:widget': 'select',
        },
      },
    };
  },
  mounted() {
    this.form1 = {
      firstName: 'first',
      lastName: 'last',
      password: '',
      age: null,
      gender: 1,
      birth: '',
      interest: [],
      comment: '',
      profession: '',
      dateTime: '',
      time: '',
      agree: true,
    };
  },
  methods: {
    onChange(key, value) {
      const { schema } = this;
      if (key === 'gender') {
        if (value === 2) {
          const index = schema.required.findIndex(item => item === 'comment');
          if (index > 0) {
            schema.required.splice(index, 1);
          }
        } else {
          const index = schema.required.findIndex(item => item === 'comment');
          if (index === -1) {
            schema.required.push('comment');
          }
        }
      }
    },
    onSubmit() {
      this.$refs.form1.validate((isValid) => {
        if (isValid !== false) {
          this.$message.success('表单提交成功');
        }
      });
    },
    onChangeUiSchema() {
      // this.uiSchema = {};
      this.uiSchema.lastName['ui:disabled'] = !this.uiSchema.lastName['ui:disabled'];
      if (this.uiSchema.gender['ui:widget'] === 'select') {
        this.uiSchema.gender['ui:widget'] = 'radio';
      } else {
        this.uiSchema.gender['ui:widget'] = 'select';
      }
    },
  },
};
</script>
