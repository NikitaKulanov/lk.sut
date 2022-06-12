<template>
  <div class="container-messenger">

    <div class="input-message">

      <div class="left-header">
        <img :src="userAvatar" alt="Вы">
      </div>

      <div class="right-header">
        <div class="input-text">
          <div class="container-menu">
            <div class="item-menu">
              <span class="item-menu__current">Обычный текст</span>
              <div class="item-menu__icon"><svg width="24" height="24" viewBox="0 0 24 24" ><path d="M8.292 10.293a1.009 1.009 0 000 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 000-1.419.987.987 0 00-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 00-1.406 0z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
            </div>
            <div class="item-menu">
              <span class="item-menu__current">Жирный</span>
              <div class="item-menu__icon"><svg width="24" height="24" viewBox="0 0 24 24" ><path d="M8 6h4.832C13.908 6 16 6.5 16 9c0 1.333-.333 2.167-1 2.5 1.333.333 2 1.333 2 3 0 .5 0 3.5-4 3.5H8a1 1 0 01-1-1V7a1 1 0 011-1zm1 10h3.5c1 0 2-.25 2-1.5s-1.104-1.5-2-1.5H9v3zm0-4.975h3c.504 0 2 0 2-1.525S12 8 12 8H9v3.025z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
            </div>
            <div class="item-menu">
              <span class="item-menu__current">Курсив</span>
              <div class="item-menu__icon"><svg width="24" height="24" viewBox="0 0 24 24" ><path d="M10 6h6a1 1 0 010 2h-6a1 1 0 110-2zM8 16h6a1 1 0 010 2H8a1 1 0 010-2zm4-8h2l-2 8h-2l2-8z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
            </div>
            <div class="item-menu">
              <span class="item-menu__current">Список</span>
              <div class="item-menu__icon"><svg width="24" height="24" viewBox="0 0 24 24" ><path d="M6 8c0-.552.444-1 1-1 .552 0 1 .444 1 1 0 .552-.444 1-1 1-.552 0-1-.444-1-1zm5-1h6a1 1 0 010 2h-6a1 1 0 010-2zm-5 5c0-.552.444-1 1-1 .552 0 1 .444 1 1 0 .552-.444 1-1 1-.552 0-1-.444-1-1zm5-1h6a1 1 0 010 2h-6a1 1 0 010-2zm-5 5c0-.552.444-1 1-1 .552 0 1 .444 1 1 0 .552-.444 1-1 1-.552 0-1-.444-1-1zm5-1h6a1 1 0 010 2h-6a1 1 0 010-2z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
            </div>
            <div class="item-menu">
              <span class="item-menu__current">Эмодзи</span>
              <div class="item-menu__icon"><svg width="24" height="24" viewBox="0 0 24 24" ><path d="M12 5a7 7 0 110 14 7 7 0 010-14zm0 12.5c3.033 0 5.5-2.467 5.5-5.5S15.033 6.5 12 6.5A5.506 5.506 0 006.5 12c0 3.033 2.467 5.5 5.5 5.5zm-1.5-6a1 1 0 110-2 1 1 0 010 2zm3 0a1 1 0 110-2 1 1 0 010 2zm.27 1.583a.626.626 0 01.932.834A3.63 3.63 0 0112 15.125a3.63 3.63 0 01-2.698-1.204.625.625 0 01.93-.835c.901 1.003 2.639 1.003 3.538-.003z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
            </div>
          </div>
          <label for="input-text-messenger">
          </label>
          <textarea type="text" name="input-text" ref="input_text_messenger" id="input-text-messenger" cols="40" rows="3" required="" placeholder="Добавить комментарий..."></textarea>
        </div>
      </div>
    </div>

    <div class="button-messenger">
      <div class="send-message">
        <button id="send-message" @click.prevent="addMessage" name="send-message">Отправить</button>
      </div>
      <div class="clear-message">
        <button id="clear-message" @click.prevent="clearTextareaMessage" name="clear-message">Очистить</button>
      </div>
    </div>

    <div class="chat-messenger">
      <Message v-for="message in messages" :key="message.id" :payload="message"></Message>
    </div>
  </div>
</template>

<script>
import Message from "@/components/Common/Message";
export default {
  name: "Messenger",
  props: ['payload'],
  inject: ['api', 'errHandler', 'getDateTime'],
  components: {
    Message,
  },

  data() {
    return {
      userAvatar: this.$store.getters.getUser.avatar,
      userId: this.$store.getters.getUser.id,
      messages: null,
      taskId: this.payload.taskId,
      idNewMessage: null
    }
  },

  mounted() {
    window.Echo.channel('kanban-sut-new-message').listen('BindTaskWithMessage', (response) => {
      if(response.user_sender.id !== this.userId) {
        this.messages.unshift(response)
      }
    })

    // Это заглушка
    let messages = this.payload.messages.slice().reverse()
    messages.forEach((message) => {
      if(message.user_sender.id !== this.userId) {
        message.is_checked = true
      }
    })
    this.messages = messages
  },

  methods: {
    async addMessage() {
      let sendingMessage = this.$refs.input_text_messenger.value.trim()
      if(sendingMessage === '' || sendingMessage === false){
        alert('Для отправки сообщения, введите текст!');
        return false;
      } else {
        this.api.task.postBindTaskAndMessage(this.taskId, {
          message : sendingMessage,
          sender_id: this.$store.getters.getUser.id,
        }).then((response) => {
          if(response.data.length !== 0){
            this.idNewMessage = response.data.id
            this.addMessageInStack(sendingMessage)
            this.clearTextareaMessage()
            console.log('Сообщение отправлено!')
          } else {
            console.log('Сообщение отправлено, но id не получен!')
          }
        }).catch(error => {
          alert(error.response.data.message)
          console.log('Сообщение не отправлено!')
          console.log(error)
        })
      }
    },

    addMessageInStack (sendingMessage) {
      let user = this.$store.getters.getUser
      this.messages.unshift({
        self: true,
        id: this.idNewMessage,
        message: sendingMessage,
        is_checked: 0,
        date_of_dispatch: this.getDateTime(),
        user_sender: {
          id: user.id,
          surname: user.surname,
          name: user.name,
          patronymic: user.patronymic,
          role: user.role,
          avatar: user.avatar
        }
      })
    },

    clearTextareaMessage(){
      this.$refs.input_text_messenger.value = '';
    },
  }
}
</script>

<style scoped>
.container-messenger {
  width: 100%;
}

.input-message {
  width: 98%;
  height: 135px;
  display: flex;
  /*flex-direction: column;*/
}

.input-message .left-header{
  flex-basis: 36px;
  margin-left: 5px;
}

.input-message .right-header{
  flex-basis: calc(100% - 36px);
  margin-left: 5px;
}

.input-message .left-header img {
  margin-top: 10px;
  padding: 0;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  border-radius: 25px;
  object-fit: cover;
}

.input-text {
  box-sizing: border-box;
  border: 1px solid #b5b4b0;
  border-radius: 4px 4px 4px 4px;
  width: 100%;
}

.container-menu {
  width: 100%;
  height: 32px;
  padding: 3px 3px 00px 3px;
  display: flex;
  border-bottom: 1px solid #b5b4b0;
}

.item-menu {
  /*background-color: red;*/
  border-right: 1px solid #b5b4b0;
  cursor: pointer;
  display: flex;
}
.item-menu__current {
  font-size: 14px;
  padding: 4px 00px 00px 7px;
  white-space: nowrap;
}
.item-menu__icon {
  align-items: center;
  flex-shrink: 0;
  justify-content: center;
  /*margin-left: auto;*/
  text-align: center;
}

#input-text-messenger {
  font-family: Arial, serif;
  border: none;
  margin: 5px 5px 00px 5px;
  padding: 5px;
  width: 97%;
  height: 90px;
  resize: none;
  background: #f0ede9;
  font-size: 16px;
  text-align: justify;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  outline: none;
}

/*#input-text-messenger input[type=text]:focus {*/
/*  border: 2px solid #b5b4b0;*/
/*}*/

.button-messenger {
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  position: relative;
  padding-left: 44px;
}

.button-messenger button {
  margin-right: 10px;
  margin-top: 3px;
  padding: 7px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  height: 2.28571em;
  border-radius: 5px;
}

.send-message button {
  background: #fd9c2d;
  color: white;
  border: 1px solid white;
}

.send-message button:hover {
  background: white;
  color: #fd9c2d;
  border: 1px solid #fd9c2d;
}

.clear-message button {
  color: black;
  border: 1px solid #f0ede9;
}

.clear-message button:hover {
  background: white;
  border: 1px solid #6b778c;
}


/*  chat  */

.chat-messenger {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  position: relative;
  margin-top: 8px;
}
</style>