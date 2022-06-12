<template>
  <div id="content-for-role-null">
    <div class="role-null">
      Уважаемый пользователь, Вы зарегистрированы!<br>
      Но не авторизованны!<br>
      Приносим Вам свои извинения за предоставленные неудобства!<br>
      Мы работаем над этим! Выход:
      <button @click.prevent="logout" class="transparent-button bell" type="button" tabindex="0">
        <img id="logout" src="../assets/images/header/logout.png" alt="Выход">
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoAuthView",
  inject: ['api', 'errHandler'],
  methods: {
    logout() {
      this.api.auth.logout().then(res => {
        localStorage.removeItem('x_xsrf_token')
        this.$store.commit('setUser', null)
        console.log('Вы успешно вышли!');
        this.$router.push({name: 'user.login'})
      })
    }
  }
}
</script>

<style scoped>

</style>