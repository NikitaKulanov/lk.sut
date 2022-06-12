<template>
    <div class="modal-add-task" ref="modal">
        <div class="modal-content" style="width: 70%; height: auto;">
            <div class="modal-header">
              <span @click.prevent="hideModal" class="close-modal"><img src="../../../assets/images/task/close_task.png" alt="Закрыть"></span>
              <nav class="discipline">
                <a href="#"><span id="title_discipline">{{disciplineAbbreviation}}</span></a> / <a href="#"><span  id="full_title_discipline">{{disciplineTitle}}</span></a>
              </nav>
              <div class="title_task">Добавить задание</div>
            </div>
            <div class="modal-body">
                <div class="body-main">
                    <div class="body-description">
                        <div class="button-enclosure">
                          <div class="attach-link">
                            <button @click.prevent="openOrCloseLinkBlock" name="attach-link"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M11.643 17.965c-1.53 1.495-4.016 1.496-5.542.004a3.773 3.773 0 01.002-5.412l7.147-6.985a2.316 2.316 0 013.233-.003c.893.873.895 2.282.004 3.153l-6.703 6.55a.653.653 0 01-.914-.008.62.62 0 010-.902l6.229-6.087a.941.941 0 000-1.353.995.995 0 00-1.384 0l-6.23 6.087a2.502 2.502 0 000 3.607 2.643 2.643 0 003.683.009l6.703-6.55a4.074 4.074 0 00-.003-5.859 4.306 4.306 0 00-6.002.003l-7.148 6.985a5.655 5.655 0 00-.001 8.118c2.29 2.239 6.015 2.238 8.31-.005l6.686-6.533a.941.941 0 000-1.353.995.995 0 00-1.384 0l-6.686 6.534z" fill="currentColor" fill-rule="evenodd"></path></svg>
                              Прикрепить ссылку
                            </button>
                          </div>
                          <div class="attach-file">
                            <label for="add-file" class="custom-file-upload">
                              <svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentColor" fill-rule="evenodd"><path d="M12.856 5.457l-.937.92a1.002 1.002 0 000 1.437 1.047 1.047 0 001.463 0l.984-.966c.967-.95 2.542-1.135 3.602-.288a2.54 2.54 0 01.203 3.81l-2.903 2.852a2.646 2.646 0 01-3.696 0l-1.11-1.09L9 13.57l1.108 1.089c1.822 1.788 4.802 1.788 6.622 0l2.905-2.852a4.558 4.558 0 00-.357-6.82c-1.893-1.517-4.695-1.226-6.422.47"></path><path d="M11.144 19.543l.937-.92a1.002 1.002 0 000-1.437 1.047 1.047 0 00-1.462 0l-.985.966c-.967.95-2.542 1.135-3.602.288a2.54 2.54 0 01-.203-3.81l2.903-2.852a2.646 2.646 0 013.696 0l1.11 1.09L15 11.43l-1.108-1.089c-1.822-1.788-4.802-1.788-6.622 0l-2.905 2.852a4.558 4.558 0 00.357 6.82c1.893 1.517 4.695 1.226 6.422-.47"></path></g></svg>
                              Прикрепить файл
                            </label>
                            <input id="add-file" name="file" type="file" multiple="" @change="addFileInStack" title=" "/>
                          </div>
                        </div>
                        <div class="theme_task theme_task_with_input"><strong>Название: </strong>
                          <input v-model="title" required >
                        </div>
                        <div class="theme_task theme_task_with_input"><strong>Тема: </strong>
                          <input v-model="theme" required >
                        </div>
                        <div class="container-description">
                            <div class="input-description">
                                <div class="container-body">
                                    <div class="input-text">
                                        <div class="container-menu">
                                            <div class="item-menu">
                                                <span class="item-menu__current" data-id="1">Обычный текст</span>
                                                <div class="item-menu__icon"><svg width="24" height="24" viewBox="0 0 24 24" ><path d="M8.292 10.293a1.009 1.009 0 000 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 000-1.419.987.987 0 00-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 00-1.406 0z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
                                            </div>
                                            <div class="item-menu">
                                                <span class="item-menu__current" data-id="1">Жирный</span>
                                                <div class="item-menu__icon"><svg width="24" height="24" viewBox="0 0 24 24" ><path d="M8 6h4.832C13.908 6 16 6.5 16 9c0 1.333-.333 2.167-1 2.5 1.333.333 2 1.333 2 3 0 .5 0 3.5-4 3.5H8a1 1 0 01-1-1V7a1 1 0 011-1zm1 10h3.5c1 0 2-.25 2-1.5s-1.104-1.5-2-1.5H9v3zm0-4.975h3c.504 0 2 0 2-1.525S12 8 12 8H9v3.025z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
                                            </div>
                                            <div class="item-menu">
                                                <span class="item-menu__current" data-id="1">Курсив</span>
                                                <div class="item-menu__icon"><svg width="24" height="24" viewBox="0 0 24 24" ><path d="M10 6h6a1 1 0 010 2h-6a1 1 0 110-2zM8 16h6a1 1 0 010 2H8a1 1 0 010-2zm4-8h2l-2 8h-2l2-8z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
                                            </div>
                                            <div class="item-menu">
                                                <span class="item-menu__current" data-id="1">Список</span>
                                                <div class="item-menu__icon"><svg width="24" height="24" viewBox="0 0 24 24" ><path d="M6 8c0-.552.444-1 1-1 .552 0 1 .444 1 1 0 .552-.444 1-1 1-.552 0-1-.444-1-1zm5-1h6a1 1 0 010 2h-6a1 1 0 010-2zm-5 5c0-.552.444-1 1-1 .552 0 1 .444 1 1 0 .552-.444 1-1 1-.552 0-1-.444-1-1zm5-1h6a1 1 0 010 2h-6a1 1 0 010-2zm-5 5c0-.552.444-1 1-1 .552 0 1 .444 1 1 0 .552-.444 1-1 1-.552 0-1-.444-1-1zm5-1h6a1 1 0 010 2h-6a1 1 0 010-2z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
                                            </div>
                                            <div class="item-menu">
                                                <span class="item-menu__current" data-id="1">Эмодзи</span>
                                                <div class="item-menu__icon"><svg width="24" height="24" viewBox="0 0 24 24" ><path d="M12 5a7 7 0 110 14 7 7 0 010-14zm0 12.5c3.033 0 5.5-2.467 5.5-5.5S15.033 6.5 12 6.5A5.506 5.506 0 006.5 12c0 3.033 2.467 5.5 5.5 5.5zm-1.5-6a1 1 0 110-2 1 1 0 010 2zm3 0a1 1 0 110-2 1 1 0 010 2zm.27 1.583a.626.626 0 01.932.834A3.63 3.63 0 0112 15.125a3.63 3.63 0 01-2.698-1.204.625.625 0 01.93-.835c.901 1.003 2.639 1.003 3.538-.003z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
                                            </div>
                                        </div>
                                        <label for="input-text-description">
                                        </label>
                                      <textarea v-model="description" id="input-text-description" placeholder="Добавить описание..."></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="body-enclosure">

                          <transition name="enclosure-link">
                            <div class="link-add-field" v-if="isEventLinkAdd">
                              <div class="input-field">
                                <div class="input-field-flex-left">
                                  URL
                                  <input placeholder="https://www.example.com" ref="url_link" type="text" name="url-link">
                                </div>
                                <div class="input-field-flex-right">
                                  Текст ссылки
                                  <input placeholder="Добавить описание..." ref="description_link" type="text" name="description-link">
                                </div>
                              </div>
                              <div class="button-link">
                                <div class="removal-link">
                                  <button @click.prevent="openOrCloseLinkBlock" name="removal-link">Отмена</button>
                                </div>
                                <div class="add-link">
                                  <button name="add-link" @click.prevent="addLinkInStack">Прикрепить</button>
                                </div>
                              </div>
                            </div>
                          </transition>

                          <div class="links_task">
                            <strong>Закреплённые ссылки: </strong>
                            <span v-if="links.length !== 0" class="links" v-for="link in links">
                              <a :href="link.href">{{link.description}}</a>  |
                            </span>
                            <span v-else>Отсутствуют</span>
                          </div>
                          <div class="files_task">
                            <strong>Вложенные файлы: </strong>
                            <span v-if="files.length !== 0"  class="files" v-for="file in files">
                              <a :title="`Отправитель ` + file.user_sender.surname + ' ' + file.user_sender.name">{{file.original_name}}</a>  |
                            </span>
                            <span v-else>Отсутствуют</span>
                          </div>

                        </div>
                    </div>
                </div>

                <Information v-if="payloadForInformation" :payload="payloadForInformation"></Information>
            </div>
        </div>
    </div>
</template>

<script>
import Information from "@/components/Kanban/Modal/Information";
export default {
  name: "ModalAddTask",
  components: {Information},
  inject: ['api', 'errHandler'],
  props: ['payload'],
  data(){
    return {
      payloadForInformation: null,
      isEventLinkAdd: false,
      disciplineId: this.payload.disciplineId,
      groupId: this.payload.groupId,
      disciplineTitle: this.payload.disciplineTitle,
      disciplineAbbreviation: this.payload.disciplineAbbreviation,
      groupTitle: this.payload.groupTitle,

      links: [],
      linksStack: [],
      files: [],
      filesStack: [],

      body: {},

      title: null,
      theme: null,
      description: null,

      tasksId: null
    }
  },

  mounted() {
    console.log(this.payload, 1000)
    this.createPayloadForInformation(this.payload.modalOptions)// Костыль
  },
  methods: {
    openOrCloseLinkBlock() {
      this.isEventLinkAdd = !this.isEventLinkAdd
    },

    createPayloadForInformation(properties) {
      let payload = {
        properties : [],
        haveEventAddTask: true
      }
      properties.forEach((id) => {
        switch(id) {
          case 8:
            payload.properties.push(
                {
                  title: 'Группа',
                  text: this.payload.groupTitle,
                  typeId: 6,
                }
            )
            break
          case 9:
            let user = this.$store.getters.getUser
            payload.properties.push(
                {
                  title: 'Автор',
                  typeId: 2,
                  user: {
                    surname : user.surname,
                    name : user.name,
                    patronymic : user.patronymic,
                    role : user.role,
                    avatar : user.avatar
                  },
                }
            )
            break
          case 10:
            payload.properties.push(
                {
                  title: 'Срок сдачи',
                  typeId: 7,
                }
            )
            break
        }
      })
      this.payloadForInformation = payload
    },// Каждый раз создаём новый, это костыль

    addTask(deadline) {
      let title = this.title
      let theme = this.theme
      let description = this.description
      if (title === '' || title === null) {
        alert('Название не добавлено!')
      } else if (theme === '' || theme === null) {
        alert('Тема не добавлена!')
      } else if (description === '' || description === null) {
        alert('Описание не добавлено!')
      }else {
        let body = {
          deadline: deadline,
          title: title.trim(),
          theme: theme.trim(),
          description: description.trim(),
          author_id: this.$store.getters.getUser.id,
          discipline_id: this.disciplineId,
          group_id: this.groupId,
        }
        this.api.task.createTask(body)
            .then(response => {
              this.tasksId = response.data.tasks_id
              console.log('Задание добавлено!')
            })
            .then(() => {
              this.tasksId.forEach((taskId) => {
                this.linksStack.forEach((link) => {
                  this.bindLink(link, taskId)
                })
                this.filesStack.forEach((file) => {
                  this.bindFile(file, taskId)
                })
              })
            })
            .then(() => {
              this.hideModal()
            })
            .catch(error => {
              alert('Задание не добавлено!')
              console.log(error)
            });
      }
    },

    addFileInStack() {
      let files = Array.from(event.target.files);

      for (let item of files){
        this.files.push({
          original_name: item.name,
          user_sender: {
            surname: this.$store.getters.getUser.surname,
            name: this.$store.getters.getUser.name,
          },
        })
        this.filesStack.push(item)
        console.log('Файл добавлен в очередь!')
      }
    },

    addLinkInStack() {
      if(this.$refs.url_link.value === '' || this.$refs.description_link.value === ''){
        alert('Необходимо ввести ссылку и описание!');
        return false;
      } else {
        this.links.push({
          href: this.$refs.url_link.value,
          description: this.$refs.description_link.value,
        })
        this.linksStack.push(
            {
              href : this.$refs.url_link.value,
              description : this.$refs.description_link.value,
              sender_id: this.$store.getters.getUser.id,
            }
        )
        this.openOrCloseLinkBlock()
        console.log('Ссылка добавлена в очередь!')
      }
    },

    bindFile(item, taskId) {
      let form = new FormData();
      form.append('file', item)// Возможно можно одним стеком все файлы
      form.append('sender_id', this.$store.getters.getUser.id)

      this.api.task.postBindTaskAndFile(taskId, form)
          .then(response => {
            console.log('Файл загружен!')
          })
          .catch(error => {
            alert('Ошибка, файл не загружен!')
            console.log(error)
          });
    },

    bindLink(item, taskId) {
      this.api.task.postBindTaskAndLink(taskId,
          {
            href: item.href,
            description: item.description,
            sender_id: item.sender_id
          }
      )
          .then(res => {
            console.log('Ссылка закреплены!')
          })
          .catch(err => {
            console.log(err)
            alert('Ошибка, ссылки не закреплены!')
          })
    },

    openModel() {
      this.$refs.modal.style.display = "block";
    },
    hideModal() {
      this.$refs.modal.style.display = 'none';
      this.$parent.closeModal()
    },
  }
}
</script>

<style scoped>
.modal-add-task {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 15%; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.container-body {
    flex-basis: 100%;
}

.discipline a{
    font-size: 18px;
    font-weight: 600;
    color: #6b778c;
    text-decoration: none;
}

.discipline a:hover{
    color: #333;
    text-decoration: underline;
}

.discipline a:active{
    color: #8c826b;
}

.container-description {
    width: 100%;
    /*border: 1px solid red;*/
}

.input-description {
    height: 140px;
    width: 98%;
    display: flex;
    /*flex-direction: column;*/
}

#input-text-description {
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
  transition: 0.1s;
  outline: none;
}

.theme_task input {
    margin-left: 5px;
    height: 30px;
    flex-basis: 60%;
    padding-left: 7px;
    border: 1px solid #b5b4b0;
    border-radius: 5px;
    outline: none;
    background: #f0ede9;
    font-size: 16px;
}

.theme_task_with_input {
    display: flex;
    flex-direction: row;
}

.theme_task_with_input strong {
    flex-basis: 16%;
    padding-top: 5px;
    text-align: center;
}

.add_files_task a{
    pointer-events: none;
    font-size: 18px;
    font-weight: 600;
    color: #000;
    text-decoration: none;
    cursor: default;
}

.modal-kanban {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  /*padding: 6px 16px 00px 8px;*/
  /*padding: 2px 16px 10px 16px;*/
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  position: relative;
  background-color: #f0ede9;
  margin: auto;
  padding: 8px 8px 00px 10px;
  border: 5px solid #f0ede9;
  border-radius: 10px;
  width: 85%;
  height: 90%;
  max-height: 950px;
  max-width: 1200px;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
}


@-webkit-keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

.modal-header {
  height: 68px;
  /*padding: 6px 16px 00px 8px;*/
  background-color: #f0ede9;
  color: #172B4D;
  /*border: 2px solid green;*/
}

.modal-header .title-task {
  padding-top: 3px;
  color: #333;
  font-size: 30px;
  font-weight: 600;
}

.close-modal {
  color: #172B4D;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close-modal:hover,
.close-modal:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.discipline-header a {
  font-size: 18px;
  font-weight: 600;
  color: #6b778c;
  text-decoration: none;
}

.discipline-header a:hover {
  color: #333;
  text-decoration: underline;
}

.discipline-header a:active {
  color: #8c826b;
}

.modal-body {
  /*padding: 2px 16px 10px 16px;*/
  height: calc(100% - 75px);
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
}

.body-main {
  order: 1;
  flex-grow: 2;
  height: 100%;
  width: 50%;
  overflow: auto;
}

.body-description {
  width: 100%;
}

.button-enclosure {
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  position: relative;
}

.theme_task {
  margin-bottom: 3px;
}

.input-text-description {
  line-height: 25px;
  font-family: Arial, serif;
  border: none;
  margin: 00px 5px 00px 00px;
  padding: 2px 5px 5px 5px;
  width: 98%;
  /*max-height: 125px;*/
  height: 100px;
  resize: none;
  background: #f0ede9;
  font-size: 16px;
  text-align: justify;
}

.button-enclosure button {
  align-items: center;
  flex-shrink: 0;
  justify-content: center;
  /*margin-left: auto;*/
  text-align: center;
  padding: 8px 15px 8px 8px;
  margin-right: 10px;
  margin-bottom: 6px;
  display: flex;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  cursor: pointer;
  height: 2.28571em;
  border-radius: 5px;
  background: #f0efec;
  color: #6b778c;
  border: 1px solid #6b778c;
}

.button-enclosure button:hover {
  background: white;
  color: black;
  border: 1px solid black;
}

.custom-file-upload {
  align-items: center;
  flex-shrink: 0;
  justify-content: center;
  /*margin-left: auto;*/
  text-align: center;
  padding: 8px 15px 8px 8px;
  margin-right: 10px;
  margin-bottom: 6px;
  display: flex;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  cursor: pointer;
  height: 2.28571em;
  border-radius: 5px;
  background: #f0efec;
  color: #6b778c;
  border: 1px solid #6b778c;
}

.custom-file-upload:hover {
  background: white;
  color: black;
  border: 1px solid black;
}

#add-file {
  display: none;
}

#add-files {
  display: none;
}

.link-add-field {
  width: 95%;
  padding: 10px;
}

.input-field {
  display: flex;
}

.input-field input {
  width: 100%;
  padding: 8px 6px;
  height: 2.57em;
  background-color: #f0ede9;
  border-radius: 4px;
  border: 1px solid #b5b4b0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  outline: none;
}

.input-field input[type=text]:focus {
  border: 2px solid #b5b4b0;
}

.input-field-flex-right {
  flex-basis: 50%;
  padding-left: 15px;
}

.input-field-flex-left {
  flex-basis: 50%;
}

.button-link {
  padding-top: 5px;
  display: flex;
  flex-direction: row-reverse;
}

.button-link button {
  margin-left: 15px;
  padding: 7px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  height: 2.28571em;
  /*height: 32px;*/
  border-radius: 5px;
}

.add-link button {
  background: #fd9c2d;
  color: white;
  border: 1px solid white;
}

.add-link button:hover {
  background: white;
  color: #fd9c2d;
  border: 1px solid #fd9c2d;
}

.removal-link button {
  color: black;
  border: 1px solid #f0ede9;
}

.removal-link button:hover {
  background: white;
  border: 1px solid #6b778c;
}


/*      Анимации       */

.enclosure-link-enter-active{
  transition: opacity 1.1s ease;
}
.enclosure-link-leave-active {
  transition: opacity 0.7s ease;
}

.enclosure-link-enter-from,
.enclosure-link-leave-to {
  opacity: 0;
}

/*      Закреплённые      */
.links_task {
  padding-bottom: 10px;
}

.links_task a{
  font-size: 18px;
  font-weight: 600;
  color: #6b778c;
  text-decoration: none;
}

.links_task a:hover{
  color: #333;
  text-decoration: underline;
}

.links_task a:active{
  color: #8c826b;
}

.files_task {
  padding-bottom: 10px;
}

.files_task a{
  font-size: 18px;
  font-weight: 600;
  color: #6b778c;
  text-decoration: none;
}

.files_task a:hover{
  color: #333;
  text-decoration: underline;
}

.files_task a:active{
  color: #8c826b;
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

.modal-header .title_task {
  padding-top: 3px;
  color: #333;
  font-size: 30px;
  font-weight: 600;
}
</style>
