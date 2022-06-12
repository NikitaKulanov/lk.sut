<template>
<div class="block-form form-login">
    <div id="login_logo">
        <img src="@/assets/images/logo_SPBGUT.png" alt="СПБГУТ">
    </div>
    <h3 id="login_text"><img src="@/assets/images/lock.png" alt="">&ensp; Вход в личный кабинет</h3>
    <div class="ui-form">
        <div class="form-row">
            <input v-model="email" id="email" required ><label for="email">Адрес электронной почты</label>
        </div>
        <div class="form-row">
            <input v-model="password" type="password" id="password" required><label for="password">Пароль</label>
        </div>
        <p id="question_form">&emsp;Нет профиля в личном кабинете? <router-link id="link_form" :to="{name: 'user.registration'}">Зарегистрироваться</router-link></p>
        <p><input @click.prevent="login" type="submit" placeholder="Вход" value="Войти"></p>
    </div>
</div>
</template>

<script>
export default {
  name: "Login",
  inject: ['api', 'errHandler'],
  data() {
        return {
          email: 'kulanov@mail.ru',
          password: '123123123123',
          responseLogin: null
        }
    },

  methods: {
    deleteCanvas(){
      let canvas = document.getElementById("particle");
      if(canvas !== null){
        canvas.remove()
      }
    },
    login() {
      if (this.email == null || this.email === '') {
        alert('Введите адрес электронной почты')
      } else if (this.password == null || this.password === '') {
        alert('Введите пароль')
      } else {
        this.api.auth.getCSRF().then((response) => {
          console.log('Токен получен!')
          this.api.auth.login(
              {
                email: this.email,
                password: this.password
              }
          ).then((response) => {
            localStorage.setItem('x_xsrf_token', response.config.headers['X-XSRF-TOKEN'])
            this.$store.commit('setUser', response.data)
            console.log('Идентификация прошла успешно!')
            this.deleteCanvas()
            switch(response.data.role) {
              case 'student':
                this.$router.push({name: 'user.board.studies'})
                break
              case 'professor':
                this.$router.push({name: 'user.board.groups.disciplines'})
                break
              default:
                this.$router.push({name: 'user.unauthenticated'})
                break
            }
          }).catch(error => {
            alert(error.response.data.message)
            console.log('Идентификация прошла не успешно!')
            console.log(error)
          })
        })
      }
    }
  }
}
</script>

<style scoped>
.block-form {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background-color: #fadcbb;
  border-radius: 25px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
.form-login {
  width: 550px;
}

#login_logo{
  width: 100%;
  height: 100px;
  background: #f3f5f0;
  border-radius: 25px 25px 0 0;
  text-align: center;
}

#login_logo img {
  width: 280px;
  margin-top: 20px;
  margin-bottom: 20px;
}

#login_text{
  /*background-image: url(https://lk.sut.ru/cabinet/ini/general/0/cabinet/img/zamokbg.png);*/
  background-repeat: no-repeat;
  font: 18px Arial;
  margin: 20px 00px 20px 50px;
  /*padding: 0 0 0 25px;*/
  color: #9a9a9a;
  font-size: 20px;
}

#question_form{
  color: #857c73;
  font-size: 18px;
  margin-top: -10px;
  margin-bottom: 20px;
}

#link_form{
  color: #fd9c2d;
}

#link_form:hover{
  color: #fbb834;
}

.ui-form {
  width: 100%;
  border-radius:  0 0 25px 25px;
  padding: 30px 30px 12px 30px;
  background: #f6f6f6;
}

.form-row {
  position: relative;
  margin-bottom: 40px;
}
.form-row input {
  display: block;
  width: 100%;
  padding: 0;
  line-height: 40px;
  font-family: 'Roboto', sans-serif;
  background: none;
  border-width: 0;
  border-bottom: 2px solid #a6988a;
  transition: all 0.2s ease;
  color: #898989;
  font-size: 20px;
}
.form-row label {
  position: absolute;
  left: 13px;
  color: #9d959d;
  font-size: 20px;
  font-weight: 300;
  transform: translateY(-35px);
  transition: all 0.2s ease;
}
.form-row input:focus {
  outline: 0;
  border-color: #fd9c2d;
}
.form-row input:focus+label, .form-row input:valid+label {
  transform: translateY(-60px);
  margin-left: -14px;
  font-size: 14px;
  font-weight: 400;
  outline: 0;
  border-color: #fd9c2d;
  color: #fd9c2d;
}
.ui-form input[type="submit"] {
  cursor: pointer;
  width: 100%;
  padding: 0;
  line-height: 42px;
  background: #fd9c2d;
  border-width: 0;
  color: white;
  font-size: 20px;
  border-radius:  7px;
}

.ui-form input:hover[type="submit"] {
  background: #fbb834;
}

.ui-form input:active[type="submit"] {
  background: #ba8f3a;
}

.ui-form label{
  cursor: text;
}

.checkbox span {
  padding-left: 8px;
}

.checkbox__input:checked + .checkbox__label:before {
  background-color: #fd9c2d;
  border-color: #fd9c2d;
}

.checkbox__input:checked + .checkbox__label:after {
  opacity: 1;
}
</style>
