<template>
  <form class="form" @submit.prevent="sendForm">
    <div v-for="field in fields" :key="field.name" class="form__field">
      <AppSelect
        v-if="field.type == 'select'"
        :label="field.label"
        :placeholder="field.placeholder"
        :list="field.list"
        v-model="data[field.name]"
        :error="v$.data[field.name].$error"
        :errorText="errorText(field.name)"
      />
      <AppCheckbox
        v-else-if="field.type == 'checkbox'"
        v-model="data[field.name]"
        :error="v$.data[field.name].$error"
        :errorText="errorText(field.name)"
      >
        {{ field.label }}
      </AppCheckbox>
      <AppInput
        v-else
        :type="field.type"
        :placeholder="field.placeholder"
        :label="field.label"
        v-model="data[field.name]"
        :error="v$.data[field.name].$error"
        :errorText="errorText(field.name)"
      />
    </div>

    <div class="form__footer"><slot></slot></div>
  </form>
</template>

<script>
import AppInput from "@/components/AppInput";
import AppCheckbox from "@/components/AppCheckbox";
import AppSelect from "@/components/AppSelect";

import { useVuelidate } from "@vuelidate/core";
import {
  helpers,
  email,
  required,
  minLength,
  sameAs,
} from "@vuelidate/validators";
const phone = (value) => value.replace(/\D/g, "").length == 11;

export default {
  emits: ["sendForm"],
  setup: () => ({
    v$: useVuelidate(),
  }),
  components: {
    AppInput,
    AppCheckbox,
    AppSelect,
  },
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    data: {},
  }),
  validations() {
    return this.getValidations();
  },
  methods: {
    errorText(field) {
      return this.v$.data[field].$error
        ? this.v$.data[field].$errors[0].$message
        : "";
    },
    defaultData() {
      this.fields.forEach((field) => {
        let def = field.type == "checkbox" ? false : "";
        this.data[field.name] =
          this.formData[field.name] ?? field.default ?? def;
      });
    },
    getValidations() {
      let validations = {};

      this.fields.forEach((field) => {
        validations[field.name] = {};
        for (let error in field.validations) {
          let value = field.validations[error];
          if (!value) continue;

          validations[field.name][error] = this.getError(
            error,
            field.validations
          );
        }
      });

      return { data: validations };
    },
    getError(error, params = {}) {
      switch (error) {
        case "required":
          return helpers.withMessage("Обязательное поле", required);
        case "email":
          return helpers.withMessage("Неверный формат e-mail", email);
        case "minLength":
          return helpers.withMessage(
            `Минмимальное количество символов ${params.minLength}`,
            minLength(params.minLength)
          );
        case "phone":
          return helpers.withMessage("Неверный формат телефона", phone);
        case "sameAs":
          return helpers.withMessage(
            "Пароли не совпадают",
            sameAs(this.data[params.sameAs])
          );

        default:
          return {};
      }
    },
    sendForm() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      this.$emit("sendForm", this.data);
    },
  },
  mounted() {
    this.defaultData();
  },
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;

  &__field {
    width: 100%;
  }

  &__footer {
    margin-top: 8px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
