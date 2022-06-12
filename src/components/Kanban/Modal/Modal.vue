<template>
  <div class="modal-kanban" ref="modal">
    <div class="modal-content">
      <div class="modal-header">
        <span @click.prevent="hideModal" class="close-modal"><img src="../../../assets/images/task/close_task.png" alt="Закрыть"></span>
        <div class="discipline-header">
          <a href="#"><span>{{disciplineTask.abbreviation}}</span></a> / <a href="#"><span>{{disciplineTask.title}}</span></a>
        </div>
        <div class="title-task">{{titleTask}}</div>
      </div>
      <div class="modal-body">
        <div class="body-main">
          <div class="body-description">

            <div class="button-enclosure">
              <div class="attach-link">
                <button @click.prevent="openOrCloseLinkBlock" name="attach-link"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M11.643 17.965c-1.53 1.495-4.016 1.496-5.542.004a3.773 3.773 0 01.002-5.412l7.147-6.985a2.316 2.316 0 013.233-.003c.893.873.895 2.282.004 3.153l-6.703 6.55a.653.653 0 01-.914-.008.62.62 0 010-.902l6.229-6.087a.941.941 0 000-1.353.995.995 0 00-1.384 0l-6.23 6.087a2.502 2.502 0 000 3.607 2.643 2.643 0 003.683.009l6.703-6.55a4.074 4.074 0 00-.003-5.859 4.306 4.306 0 00-6.002.003l-7.148 6.985a5.655 5.655 0 00-.001 8.118c2.29 2.239 6.015 2.238 8.31-.005l6.686-6.533a.941.941 0 000-1.353.995.995 0 00-1.384 0l-6.686 6.534z" fill="currentColor" fill-rule="evenodd"></path></svg> Прикрепить ссылку</button>
              </div>
              <div class="attach-file">
                <label for="add-file" class="custom-file-upload">
                  <svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentColor" fill-rule="evenodd"><path d="M12.856 5.457l-.937.92a1.002 1.002 0 000 1.437 1.047 1.047 0 001.463 0l.984-.966c.967-.95 2.542-1.135 3.602-.288a2.54 2.54 0 01.203 3.81l-2.903 2.852a2.646 2.646 0 01-3.696 0l-1.11-1.09L9 13.57l1.108 1.089c1.822 1.788 4.802 1.788 6.622 0l2.905-2.852a4.558 4.558 0 00-.357-6.82c-1.893-1.517-4.695-1.226-6.422.47"></path><path d="M11.144 19.543l.937-.92a1.002 1.002 0 000-1.437 1.047 1.047 0 00-1.462 0l-.985.966c-.967.95-2.542 1.135-3.602.288a2.54 2.54 0 01-.203-3.81l2.903-2.852a2.646 2.646 0 013.696 0l1.11 1.09L15 11.43l-1.108-1.089c-1.822-1.788-4.802-1.788-6.622 0l-2.905 2.852a4.558 4.558 0 00.357 6.82c1.893 1.517 4.695 1.226 6.422-.47"></path></g></svg> Прикрепить файл
                </label>
                <input id="add-file" name="file" type="file" multiple="" @change="attachFiles" title=" "/>
              </div>
            </div>
            <div class="theme_task"><strong>Тема: </strong>{{themeTask}}</div>
            <label>
              <strong>Описание</strong>
              <textarea class="input-text-description" placeholder="Описание..." disabled>{{descriptionTask}}</textarea>
            </label>

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
                    <button name="add-link" @click.prevent="attachLink">Прикрепить</button>
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
                  <a :href="file.href" :title="`Отправитель ` + file.user_sender.surname + ' ' + file.user_sender.name">{{file.original_name}}</a>  |
                </span>
                <span v-else>Отсутствуют</span>
              </div>

            </div>
          </div>

          <Messenger v-if="payloadForMessenger" :payload="payloadForMessenger"></Messenger>

        </div>

        <Information v-if="payloadForInformation" :payload="payloadForInformation"></Information>

      </div>
    </div>
  </div>
</template>

<script>
import Messenger from "@/components/Kanban/Modal/Messenger";
import Information from "@/components/Kanban/Modal/Information";

export default {
  name: "Modal",
  props: ['payload'],
  inject: ['api', 'errHandler', 'toLowerCaseBesidesFirst'],
  components: {
    Messenger,
    Information
  },

  data() {
    return {
      id: this.payload.id ?? null,
      titleTask: this.payload.description_task.title ?? 'Не определено',
      themeTask: this.payload.description_task.theme ?? 'Не определено',
      descriptionTask: this.payload.description_task.description ?? 'Не определено',

      disciplineTask: this.payload.description_task.discipline ? {
        id: this.payload.description_task.discipline.id ?? null,
        abbreviation : this.payload.description_task.discipline.abbreviation ?? 'Не определено',
        title : this.payload.description_task.discipline.title ?? 'Не определено',
      } : {
        id: null,
        abbreviation : 'Не определено',
        title: 'Не определено'
      },

      links: this.payload.links ?? null,
      files: this.payload.files ?? null,

      isEventLinkAdd: false,
      newFile: null,
      newLinks: null,

      payloadForInformation: null,
      payloadForMessenger: {
        messages: this.payload.messages,
        taskId: this.payload.id ?? null,
        userAvatar: this.$store.getters.getUser.avatar
      }
    }
  },

  mounted() {
    console.log(this.links, 909090)
    window.onclick = (event) => {
      if (event.target.className === 'modal-kanban') {
        this.hideModal()
      }
    }
    this.createPayloadForInformation(this.payload.modalTaskOptions)// Костыль
  },

  methods: {
    showModel() {
      this.$refs.modal.style.display = 'block';
    },

    editTaskStatus(statusID) {
      this.$parent.editCardStatus(this.id, statusID)
    },

    editTaskEstimate(estimate) {
      this.api.task.pathTask(
          this.id,
          {
            estimate: estimate
          }
      ).then((response) => {
        console.log('Задача изменила оценку!')
      }).catch(error => {
        alert(error.response.data.message)
        console.log('Задача не изменила оценку!')
        console.log(error)
      })
    },

    createPayloadForInformation(properties) {
      let payload = {
        taskId: this.id,
        properties : [],
        status: {},
        eventAddTask: false
      }
      properties.forEach((id) => {
        switch(id) {
          case 1:
            payload.properties.push(
                {
                  title: 'Статус',
                  value: this.getListStatus(this.payload.statuses, this.payload.forbiddenCells),
                  typeId: 1,
                  active: false
                }
            )
            payload.status.id = this.payload.status.id
            payload.status.title = this.toLowerCaseBesidesFirst(this.payload.status.title)
            break
          case 2:
            this.payload.user_perpetrator.avatar = process.env.VUE_APP_API_SERVER_NEW + '/storage/img/avatar/' + this.payload.user_perpetrator.avatar
            payload.properties.push(
                {
                  title: 'Исполнитель',
                  typeId: 2,
                  user: this.payload.user_perpetrator,
                }
            )
            break
          case 3:
            this.payload.description_task.user_author.avatar = process.env.VUE_APP_API_SERVER_NEW + '/storage/img/avatar/' + this.payload.description_task.user_author.avatar
            payload.properties.push(
                {
                  title: 'Автор',
                  typeId: 2,
                  user: this.payload.description_task.user_author,
                }
            )
            break
          case 4:
            payload.properties.push(
                {
                  title: 'Дата назначения',
                  typeId: 3,
                  date: this.payload.description_task.appointment,
                }
            )
            break
          case 5:
            payload.properties.push(
                {
                  title: 'Срок сдачи',
                  typeId: 3,
                  date: this.payload.description_task.deadline,
                }
            )
            break
          case 6:
            payload.properties.push(
                {
                  title: 'Оценка',
                  typeId: 4,
                  estimate: this.payload.estimate,
                }
            )
            break
          case 7:
            payload.properties.push(
                {
                  title: 'Оценка',
                  typeId: 5,
                  estimate: this.payload.estimate,
                }
            )
            break
        }
      })
      this.payloadForInformation = payload
    },

    getListStatus(statuses, forbiddenCells) {
      let list = []
      statuses.forEach((status) => {
        if (!forbiddenCells.includes(status.id)) {
          list.push({
            id: status.id,
            title: this.toLowerCaseBesidesFirst(status.title),
          })
        }
      })
      return list
    },

    hideModal() {
      this.$refs.modal.style.display = 'none';
      this.$parent.closeModal()
    },

    openOrCloseLinkBlock() {
      this.isEventLinkAdd = !this.isEventLinkAdd
    },

    async uploadFile(item) {
      let form = new FormData();
      form.append('file', item)
      form.append('sender_id', this.$store.getters.getUser.id)
      await this.errHandler(async() => {
        this.newFile =
            (await this.api.task.postBindTaskAndFile(this.id, form)).data
      }, null, 'Файл не загружен!')
      if(this.newFile) {
        console.log('Файл загружен!')
        this.files.push({
          href: this.newFile.href,
          original_name: item.name,
          user_sender: {
            surname: this.$store.getters.getUser.surname,
            name: this.$store.getters.getUser.name,
          },
        })
        return true
      }
    },

    async attachFiles(){
      let files = Array.from(event.target.files);
      for (let item of files){
        await  this.uploadFile(item);
      }
    },

    async attachLink() {
      let urlLink = this.$refs.url_link.value
      let descriptionLink = this.$refs.description_link.value
      if(urlLink === '' || descriptionLink === ''){
        alert('Необходимо ввести ссылку и описание!');
        return false;
      } else {
        await this.errHandler(async() => {
          this.newLinks =
              (await this.api.task.postBindTaskAndLink(this.id,
                {
                  href: urlLink,
                  description: descriptionLink,
                  sender_id: this.$store.getters.getUser.id,
                }
              )).data
        }, null, 'Ссылка не добавлена!')
        if(this.newLinks) {
          this.links.push({
            href: urlLink,
            description: descriptionLink,
          })
          this.openOrCloseLinkBlock()
          console.log('Ссылка добавлена!')
        }
      }
    }
  },
}
</script>

<style scoped>
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
</style>