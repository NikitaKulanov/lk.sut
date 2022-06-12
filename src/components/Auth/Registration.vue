<template>
    <div class="block-form form-register">
      <div id="login_logo">
        <img src="@/assets/images/logo_SPBGUT.png" alt="СПБГУТ">
      </div>
      <h3 id="login_text"><img src="@/assets/images/lock.png" alt="">&ensp; Регистрация в личный кабинет</h3>
      <div class="ui-form form-registration">
        <div class="row-form-registration">
          <div class="column-form-registration">
            <div class="form-row">
              <input v-model="surname" id="last_name" required ><label for="last_name">Фамилия</label>
            </div>
            <div class="form-row">
              <input v-model="name" id="name" required ><label for="name">Имя</label>
            </div>
            <div class="form-row">
              <input v-model="patronymic" id="patronymic" required ><label for="patronymic">Отчество</label>
            </div>
          </div>
          <div class="column-form-registration">
            <div class="form-row">
              <input v-model="email" id="email" required ><label for="email">Адрес электронной почты</label>
            </div>
            <div class="form-row">
              <input v-model="password" type="password" id="password" required><label for="password">Пароль</label>
            </div>
            <div class="form-row">
              <input v-model="password_confirmation" type="password" id="password_confirmation" required><label for="password_confirmation">Повтор пароля</label>
            </div>
          </div>
        </div>
        <div class="bottom-block">
          <div class="checkbox">
            <input class="checkbox__input" type="checkbox" v-model="checkbox_consent" id="checkbox_consent">
            <label class="checkbox__label" for="checkbox_consent"></label>
            <span>Согласие на обработку <br>персональных данных</span>
          </div>
          <p id="question_form_register">&emsp;Есть профиль в личном кабинете? <router-link id="link_form" :to="{name: 'user.login'}">Войти</router-link></p>
        </div>
        <p><input @click.prevent="register" type="submit" placeholder="Зарегистрироваться" value="Зарегистрироваться"></p>
      </div>
    </div>
</template>

<script>
export default {
  name: "Registration",
  inject: ['api', 'errHandler'],
  data(){
    return {
      surname: null,
      name: null,
      patronymic: null,
      email: null,
      password: null,
      password_confirmation: null,
      checkbox_consent: null
    }
  },

  methods: {
    deleteCanvas(){
      let canvas = document.getElementById("particle");
      if(canvas !== null){
        canvas.remove()
      }
    },
    register(){
      if (this.surname == null || this.surname ===''){
        alert('Введите вашу фамилию!')
      } else if (this.name == null || this.name ===''){
        alert('Введите ваше имя!')
      } else if (this.patronymic == null || this.patronymic ===''){
        alert('Введите ваше отчество!')
      } else if (this.email == null || this.email ===''){
        alert('Введите адрес электронной почты!')
      } else if (this.password == null || this.password ===''){
        alert('Введите пароль!')
      }  else if (this.password_confirmation == null || this.password_confirmation ===''){
        alert('Введите пароль повторно!')
      } else if (this.password !== this.password_confirmation){
        alert('Повторный пароль введён неверно!')
      } else if (this.password.length < 8){
        alert('Пароль должен быть не менее 8 символов!')
      } else if (this.checkbox_consent === null || this.checkbox_consent === false){
        alert('Согласие на обработку персональных данных НЕ дано!')
      } else {
        this.api.auth.getCSRF().then((response) => {
          console.log('Токен получен!')
          this.api.auth.register(
              {
                surname: this.surname,
                name: this.name,
                patronymic: this.patronymic,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation,
                consent_to_privacy_policy: this.checkbox_consent
              }
          ).then((response) => {
            localStorage.setItem('x_xsrf_token', response.config.headers['X-XSRF-TOKEN'])
            this.$store.commit('setUser', response.data)
            console.log('Регистрация прошла успешно!')
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
            console.log('Регистрация прошла не успешно!')
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

.form-register {
  width: 750px;
  height: 530px;
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
  padding: 0 0 0 25px;
  color: #9a9a9a;
  font-size: 20px;
}

#question_form_register {
  padding-top: 10px;
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

.form-registration {
  display: flex;
  flex-direction: column;
}

.row-form-registration {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.column-form-registration {
  flex-basis: 45%;
  display: flex;
  height: 230px;
  flex-direction: column;
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

.bottom-block {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: #857c73;
  font-size: 18px;
  height: 55px;
}

.checkbox {
  display: flex;
  position: relative;
  height: 40px;
}

.checkbox span {
  padding-left: 8px;
}

.checkbox__input {
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
}

.checkbox__label {
  padding-top: 10px;
}

.checkbox__label:before {
  content: "";
  display: block;
  width: 16px;
  height: 16px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 3px;
  z-index: 1;
  float: left;

  transition: background .1s linear, border .1s linear;
}

.checkbox__label:after {
  content: "";
  display: block;
  width: 12px;
  height: 12px;
  cursor: pointer;
  position: absolute;
  top: 12px;
  left: 2px;

  background: url("http://127.0.0.1:8000/storage/img/check.png") no-repeat;
  background-size: 12px 12px;
  opacity: 0;
  z-index: 2;

  transition: opacity .1s linear;
}

.checkbox__input:checked + .checkbox__label:before {
  background-color: #fd9c2d;
  border-color: #fd9c2d;
}

.checkbox__input:checked + .checkbox__label:after {
  opacity: 1;
}
</style>
