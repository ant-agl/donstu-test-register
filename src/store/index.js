import { createStore } from "vuex";

export default createStore({
  state: {
    registerFields: [
      {
        type: "text",
        label: "Ваш ФИО",
        placeholder: "Ваш ФИО",
        validations: {
          required: true,
        },
        name: "name",
      },
      // {
      //   type: "tel",
      //   label: "Телефон",
      //   placeholder: "Телефон",
      //   validations: {
      //     required: true,
      //     phone: true,
      //   },
      //   name: "phone",
      // },
      {
        type: "text",
        label: "Ваш e-mail",
        placeholder: "Ваш e-mail",
        validations: {
          required: true,
          email: true,
        },
        name: "email",
      },
      {
        type: "password",
        label: "Пароль",
        placeholder: "Пароль",
        validations: {
          required: true,
          minLength: 8,
        },
        name: "password",
      },
      {
        type: "password",
        label: "Повторите пароль",
        placeholder: "Пароль",
        validations: {
          required: true,
          minLength: 8,
          sameAs: "password",
        },
        name: "repeat-password",
      },
      {
        type: "select",
        label: "Выберете пункт из списка",
        placeholder: "Выбор",
        list: [
          { id: 0, label: "Выбор 0" },
          { id: 1, label: "Выбор 1" },
          { id: 2, label: "Выбор 2" },
          { id: 3, label: "Выбор 3" },
          { id: 4, label: "Выбор 4" },
        ],
        validations: {
          required: true,
        },
        name: "select",
      },
    ],
  },
  getters: {
    registerFields: (s) => s.registerFields,
  },
  mutations: {},
  actions: {},
  modules: {},
});
