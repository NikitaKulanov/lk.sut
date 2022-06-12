<template>
  <div class="chat-message">
    <div class="avatar-block">
      <img :src="userAvatar" alt="Отправитель">
    </div>
    <div class="user-messages">
      <div class="header">
        <div class="full-name">{{user_sender.surname}} {{user_sender.name}}</div>
        <div class="date_of_dispatch">{{date_of_dispatch}}</div>
      </div>
      <div class="user-role"><span>{{user_sender.role === 'student' ? 'Студент' : 'Преподаватель'}}</span></div>
      <div class="text-message">{{message}}</div>
      <div class="message-read">
        <span>Запрос прочтения</span>
        <input type="checkbox" :checked="is_checked" disabled>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: ['payload'],

  data() {
    return {
      userAvatar: this.payload.self? this.payload.user_sender.avatar : process.env.VUE_APP_API_SERVER_NEW + '/storage/img/avatar/' + this.payload.user_sender.avatar,
      id: this.payload.id,
      message: this.payload.message,
      is_checked: true,// Временно
      // is_checked: this.payload.is_checked,
      date_of_dispatch: this.payload.date_of_dispatch,
      user_sender: this.payload.user_sender,
    }
  },

}
</script>

<style scoped>
.chat-message .avatar-block img {
  margin-top: 10px;
  padding: 0;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  border-radius: 25px;
  object-fit: cover;
}

.chat-message {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  position: relative;
  margin-bottom: 10px;
}

.avatar-block {
  flex-basis: 36px;
  margin-left: 5px;
}

.user-messages {
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  flex-basis: calc(100% - 36px);
}

.user-messages .header{
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.user-messages .user-role{
  padding-top: 2px;
}

.user-role span{
  font-size: 12px;
  color: white;
  background-color: #808080;
  padding: 1px 4px;
  border-radius: 15px;
}

.user-messages .text-message {
  font-family: Arial, serif;
  line-height: 25px;
  padding-top: 10px;
  font-size: 14px;
  font-weight: 400;
  width: 97%;
  text-align: justify
}

.header .full-name{
  font-size: 14px;
  /*color: #42526E;*/
  font-weight: 600;
}

.header .date_of_dispatch{
  padding-left: 10px;
  font-size: 14px;
}

.user-messages .text-message {
  font-family: Arial, serif;
  line-height: 25px;
  padding-top: 10px;
  font-size: 14px;
  font-weight: 400;
  width: 97%;
  text-align: justify
}

.message-read {
  width: 120px;
  padding-top: 10px;
}

.message-read span {
  vertical-align: middle;
  font-size: 12px;
  margin-right: 5px;
}

.message-read input {
  vertical-align: middle;
}
</style>