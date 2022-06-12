<template>
  <header>
    <div id="left-header" class="header-position">
      <div id="logo">
        <a href="/"><img src="../assets/images/header/SPBGUT_logo_white.png" alt="СПБГУТ"></a>
      </div>
      <div id="user-info" ref="user_info">
        <div id="user-FIO">
          Здравствуйте,
          {{name}} {{surname}}!
        </div>
        <div id="user-avatar">
          <img id="avatar-user" :src="avatar" :alt="role" :title="role">
        </div>
      </div>
    </div>
    <div id="right-header" class="header-position">
      <div class="row-div-button">
        <div class="column-div-button">
          <button @click.prevent="logout" class="transparent-button bell" type="button" tabindex="0">
            <img id="logout" src="../assets/images/header/logout.png" alt="Выход">
          </button>
        </div>
        <div class="column-div-button">
          <button class="transparent-button message" type="button" tabindex="0">
            <img id="help" src="../assets/images/header/help.png" alt="Помощь">
          </button>
          <div id="help-count" aria-hidden="true" class="css-1v5plmp">
            <!--   Это кол-во уведомлений      -->
          </div>
        </div>
        <div class="column-div-button">
          <button class="transparent-button message" type="button" tabindex="0">
            <img id="message" src="../assets/images/header/message.png" alt="Сообщения">
          </button>
          <div id="message-count" aria-hidden="true" class="css-1v5plmp">
            <!--   Это кол-во уведомлений      -->
          </div>
        </div>
        <div class="column-div-button">
          <button class="transparent-button bell" type="button" tabindex="0">
            <img id="bell" src="../assets/images/header/bell.png" alt="Уведомления">
          </button>
          <div id="bell-count" aria-hidden="true" class="css-1v5plmp">
            <!--   Это кол-во уведомлений      -->
          </div>
        </div>
        <div id="search-header">
          <form>
            <label>
              <input type="text" placeholder="Искать здесь...">
            </label>
            <button type="submit"><img id="magnifier" src="../assets/images/header/magnifier.png" alt="Уведомления"></button>
          </form>
        </div>
      </div>
    </div>
    <div id="decor-header"></div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: ['payload'],
  inject: ['api', 'errHandler'],
  data(){
    return {
      name: this.payload.user.name,
      surname: this.payload.user.surname,
      avatar: this.payload.user.avatar,
      role: this.payload.user.role
    }
  },
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
header {
  z-index: 99;
  width: 100%;
  height: 70px;
  background-color: #363636;
  position: fixed;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
}

.header-position {
  position: relative;
  height: 50px;
  display: flex;
}

#left-header {
  padding-left: 30px;
  flex-basis: 37%;
}

#right-header {
  flex-basis: 63%;
  min-width: 610px;
  justify-content: flex-end;
}

.item-header {
  padding: 7px;
}

#logo {
  flex-basis: 190px;
}

#logo img {
  width: 190px;
  height: 44px;
}

#user-info {
  flex-basis: calc(100% - 190px);
  display: flex;
  justify-content: flex-start;
}

#user-FIO {
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  flex-basis: 150px;
  margin-left: 10px;
}

#user-avatar {
  flex-basis: 45px;
}

#user-avatar img {
  /*vertical-align: middle;*/
  width: 45px;
  height: 50px;
  border-radius: 7px;
  object-fit: cover;
}

.row-div-button {
  /*display: inline-block;*/
  /*border: 1px solid red;*/
}

.column-div-button {
  float: right;
  margin-right: 30px;
}

.transparent-button {
  width: 50px;
  height: 50px;
  padding: 7px;
  border:none;
  background:transparent;
}

.transparent-button:hover {
  cursor: pointer;
  border: 3px solid white;
  border-radius: 30px;
}

#search-header {
  float: right;
  margin-right: 30px;
}

form {
  top: 3px;
  position: relative;
  width: 20vw;
  margin: 0 auto;
}
#search-header input {
  width: 100%;
  height: 42px;
  padding-left: 10px;
  border: 2px solid #fd9c2d;
  border-radius: 5px;
  outline: none;
  background: #F9F0DA;
  font-size: 18px;
  color: #000;
}
#search-header button {
  position: absolute;
  top: 0;
  right: 00px;
  width: 42px;
  height: 42px;
  border: none;
  background: #fd9c2d;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

#decor-header {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #fd9c2d;
  height: 2pt;
}

</style>