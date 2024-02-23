<template>
  <div class="wrap">
    <h2 class="title">Регистрация прошла успешно!</h2>
    <p class="text">Поздравляем, вы успешно зарегистрировались на портале!</p>
    <p class="text">
      Письмо с подтверждением регистрации было выслано на вашу почту.
    </p>
    <AppBtn class="button" @click.prevent="$emit('refresh')">
      Отправить повторно
    </AppBtn>
  </div>
</template>

<script>
import AppBtn from "@/components/AppBtn";

export default {
  emit: ["refresh"],
  components: { AppBtn },
};
</script>

<style scoped lang="scss">
.title {
  font-size: 36px;
  font-weight: 600;
  line-height: 46px;
  color: #000;
  margin-bottom: 24px;
}
.text {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #000;
  margin-bottom: 24px;
}
.button {
  margin-top: 24px;
}
</style>
