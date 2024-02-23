<template>
  <div class="auth">
    <div class="auth__bg"></div>
    <div class="auth__wrap">
      <div class="auth__content">
        <Transition mode="out-in">
          <AppForm
            v-if="state == 0"
            :fields="registerFields"
            :formData="formData"
            @sendForm="sendForm"
          >
            <AppCheckbox v-model="checked" :error="v$.checked.$error">
              Я подтверждаю, что даю согласие на
              <router-link to="#" class="link">
                обработку персональных данных
              </router-link>
            </AppCheckbox>
            <AppBtn>Регистрация</AppBtn>
            <p v-if="error" class="auth__error">{{ error }}</p>
          </AppForm>

          <AppLoader v-else-if="state == 1" />

          <RegisterSuccess v-else-if="state == 2" @refresh="refresh" />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
import AppLoader from "@/components/AppLoader";
import AppForm from "@/components/AppForm";
import AppBtn from "@/components/AppBtn";
import AppCheckbox from "@/components/AppCheckbox";
import RegisterSuccess from "@/components/RegisterSuccess";

import { mapGetters } from "vuex";

import { useVuelidate } from "@vuelidate/core";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const mock = new MockAdapter(axios, { delayResponse: 500 });
mock.onPost("/register").reply(200, { ok: true });
// mock.onPost("/register").reply(500, "Этот E-mail уже зарегестрирован");

export default {
  setup: () => ({
    v$: useVuelidate(),
  }),
  components: {
    AppLoader,
    AppForm,
    AppBtn,
    AppCheckbox,
    RegisterSuccess,
  },
  data: () => ({
    state: 0,
    checked: false,
    error: "",
    formData: {},
  }),
  computed: {
    ...mapGetters(["registerFields"]),
  },
  validations: () => ({
    checked: { check: (val) => val === true },
  }),
  methods: {
    refresh() {
      this.state = 0;
      this.v$.$reset();
      this.checked = false;
      this.formData = {};
    },
    sendForm(data) {
      this.formData = data;
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      data.checked = this.checked;
      console.log(data);

      this.state = 1;

      axios
        .post("/register", data)
        .then((response) => {
          console.log("Response:", response.data);

          this.state = 2;
        })
        .catch((error) => {
          console.error("Error:", error);

          this.state = 0;
          this.error = error.response.data;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.auth {
  display: flex;
  height: 100vh;
  overflow: hidden;

  &__bg {
    width: 100%;
    background: url("@/assets/img/bg.png") center no-repeat;
    background-size: cover;
    @media (max-width: 860px) {
      display: none;
    }
  }
  &__wrap {
    width: 100%;
    box-sizing: border-box;
    padding: 40px 60px;
    overflow-y: auto;
    display: flex;
    align-items: center;

    @media (max-width: 860px) {
      padding: 30px 20px;
    }
  }
  &__content {
    max-width: 340px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
  }
  &__error {
    color: var(--error-color);
    font-size: 14px;
    line-height: 16px;
  }
}
</style>
