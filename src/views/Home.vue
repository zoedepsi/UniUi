<template>
  <div>
    <h3>具有数据校验功能的表单组件——Form</h3>
    <i-form ref="form" :model="formValidate" :rules="ruleValidate">
      <i-form-item label="用户名" prop="name">
        <i-input v-model="formValidate.name"></i-input>
      </i-form-item>
      <i-form-item label="邮箱" prop="mail">
        <i-input v-model="formValidate.mail"></i-input>
      </i-form-item>
      <i-form-item label="已婚" prop="married">
        <i-checkbox label="已婚" v-model="formValidate.married"></i-checkbox>
      </i-form-item>
    </i-form>
    <button @click="handleSubmit">提交</button>
    <button @click="handleReset">重置</button>
  </div>
</template>
<script>
import iForm from "../components/form/form.vue";
import iFormItem from "../components/form/form-item.vue";
import iInput from "../components/input/input.vue";
import iCheckbox from "../components/checkbox/checkbox.vue";

export default {
  components: { iForm, iFormItem, iInput, iCheckbox },
  data() {
    return {
      formValidate: {
        name: "",
        mail: "",
        married: false
      },
      ruleValidate: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        mail: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ],
        married: [{ required: true, message: "必选", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          window.alert("提交成功");
        } else {
          window.alert("表单校验失败");
        }
      });
    },
    handleReset() {
      this.$refs.form.resetFields();
    }
  }
};
</script>