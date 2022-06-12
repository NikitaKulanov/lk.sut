<template>
  <div class="body-information">
    <div class="task_information">
      <div class="information point">Сведения</div>

      <div v-for="property in properties" class="property_task point">
        <div class="property">
          {{property.title}}
        </div>

        <div v-if="property.typeId === this.typeProperty.list" class="value">
          <div class="select">
            <div :class="[
                'select__header',
                this.status.id === 1 ? 'to-fulfil' : '',
                this.status.id === 2 ? 'in-work' : '',
                this.status.id === 3 ? 'for-consideration' : '',
                this.status.id === 4 ? 'on-verification' : '',
                this.status.id === 5 ? 'finish' : '',
            ]"  @click.prevent="property.active = !property.active">
              <span class="select__current" id="select_status">{{this.status.title}}</span>
              <div class="select__icon"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M8.292 10.293a1.009 1.009 0 000 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 000-1.419.987.987 0 00-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 00-1.406 0z" fill="currentColor" fill-rule="evenodd"></path></svg></div>
            </div>
            <div v-if="property.active" class="select__body" @click.prevent="property.active = !property.active">
              <div v-for="value in property.value" @click.prevent="editStatus(value.id ,value.title)" class="select__item">{{value.title}}</div>
            </div>
          </div>
        </div>

        <div v-if="property.typeId === this.typeProperty.user" class="value">
          <img :src="property.user.avatar" :alt="property.user.role">
          <div class="user">{{property.user.surname + ' ' + property.user.name}}</div>
        </div>

        <div v-if="property.typeId === this.typeProperty.date" class="value">
          {{property.date}}
        </div>

        <div v-if="property.typeId === this.typeProperty.estimate" class="value">
          <input  class="estimate-false" type="text" size="40" :value="property.estimate" readonly>
        </div>

        <div v-if="property.typeId === this.typeProperty.estimateCanBeEdited" class="value">
          <input  class="estimate" ref="estimate" type="text" size="40" :value="property.estimate">
          <button @click.prevent="editEstimate" class="edit-estimate">Изменить</button>
        </div>

        <div v-if="property.typeId === this.typeProperty.text" class="value">
          {{property.text}}
        </div>

        <div v-if="property.typeId === this.typeProperty.inputDate" class="value">
          <input style="width: 95%" ref="deadline" type="datetime-local">
        </div>

      </div>
    </div>
    <div v-if="haveEventAddTask" class="add-task"><button @click.prevent="addTask" id="add-task" name="add-task">Добавить задание</button></div>
  </div>
</template>

<script>
export default {
  name: "Information",
  props: ['payload'],
  inject: ['api', 'errHandler', 'toLowerCaseBesidesFirst'],
  data() {
    return {
      taskId: this.payload.taskId,
      properties: this.payload.properties,
      status: this.payload?.status,
      haveEventAddTask: this.payload?.haveEventAddTask,
      typeProperty: {
        list : 1,
        user : 2,
        date : 3,
        estimate : 4,
        estimateCanBeEdited : 5,
        text : 6,
        inputDate: 7
      },
    }
  },
  mounted() {
    window.Echo.channel('kanban-sut-task-status').listen('EditTaskStatus', (response) => {
      if(response.taskId === this.taskId){
        this.status.id = response.status.id
        this.status.title = this.toLowerCaseBesidesFirst(response.status.title)
      }
    })
  },
  methods: {
    addTask() {
      let deadline = this.$refs.deadline[0].value
      if(deadline === '' || deadline === null) {
        alert('Выберете срок сдачи!')
      } else {
        this.$parent.addTask(deadline)
      }
    },
    editStatus(id, title){
      this.status = {
        id: id,
        title: title
      }
      this.$parent.editTaskStatus(id)
    },
    editEstimate() {
      let estimate = this.$refs.estimate[0].value
      if(estimate === '' || estimate === null){
        alert('Необходимо ввести текст!');
        return false;
      } else {
        this.$parent.editTaskEstimate(estimate)
      }
    }
  }
}
</script>

<style scoped>
.body-information {
  margin-left: 15px;
  overflow: auto;
  font-weight: 600;
  height: 100%;
  width: 37%;
  order: 2;
  flex-grow: 1;
}

.body-information .task_information {
  display: flex;
  flex-direction: column;
  border: 1px solid #b5b4b0;
  border-radius: 4px 4px 4px 4px;
}

.task_information .point {
  height: 48px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding-top: 3px;
  padding-left: 12px;
}

.task_information .information {
  width: 100%;
  border-bottom: 1px solid #b5b4b0;
  /*background-color: #f0ede9;*/
}

.property_task {
  color: #1a202c;
}

.property_task a {
  text-decoration: none;
  color: #1a202c;
}

.property_task .property {
  flex-basis: 50%;
}

.property_task .value {
  display: flex;
  flex-basis: 50%;
}

.property_task .value img {
  margin-right: 10px;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  border-radius: 25px;
  object-fit: cover;
}

.property_task .value .user {
  padding: 6px;
  vertical-align: middle;
  height: 30px;
  border-radius: 25px;
}

.property_task .value input {
  padding: 6px;
  vertical-align: middle;
  height: 30px;
  width: 80%;
  border-radius: 4px;
  background-color: #f0ede9;
  border: 1px solid #b5b4b0;
}

.property_task .value {
  display: flex;
  flex-basis: 50%;
}

.property_task .value img {
  margin-right: 10px;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  border-radius: 25px;
  object-fit: cover;
}

.property_task .value .user {
  padding: 6px;
  vertical-align: middle;
  height: 30px;
  border-radius: 25px;
}

.property_task .value input {
  padding: 6px;
  vertical-align: middle;
  height: 30px;
  width: 80%;
  border-radius: 4px;
  background-color: #f0ede9;
  border: 1px solid #b5b4b0;
}

.select {
  position: relative;
  width: 80%;
  min-width: 180px;
  /*width: 250px;*/
}
.select.is-active .select__body {
  display: block;
}
.select__body {
  z-index: 50;
}

.select__header {
  /*background-color: red;*/
  border: 1px solid #b5b4b0;
  border-radius: 4px 4px 4px 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

/*      Статусы     */
.to-fulfil {

}

.in-work {

}

.for-consideration {
  background-color: #e39318;
  color: white;
}

.on-verification {
  background-color: #4350ac;
  color: white;
}

.finish {
  background-color: #51bd6b;
  color: white;
}
/*      Статусы, конец     */

.select__current {
  user-select: none;
  font-size: 18px;
  line-height: 24px;
  padding: 8px 00px 8px 8px;
  white-space: pre;
}
.select__icon {
  user-select: none;
  align-items: center;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  height: 40px;
  /*margin-left: auto;*/
  text-align: center;
  width: 35px;
  margin-right: 0;
}

.select__body {
  background-color: #f0ede9;
  border: 1px solid #b5b4b0;
  border-radius: 4px 4px 4px 4px;
  border-top: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 100%;
}
.select__item {
  user-select: none;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  padding: 8px;
}

.select__item:hover {
  color: white;
  background-color: #8a8987;
}

.estimate {
  flex-basis: 40%;
  margin-right: 10px;
}

.estimate-false {
  flex-basis: 40%;
  margin-right: 10px;
}

.edit-estimate {
  flex-basis: 35%;
  background: #fd9c2d;
  color: white;
  border: 1px solid white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
}

.edit-estimate:hover {
  background: white;
  color: #fd9c2d;
  border: 1px solid #fd9c2d;
}

.add-task {
  padding-top: 5px;
  display: flex;
  flex-direction: row-reverse;
}

.add-task button {
  background: #fd9c2d;
  color: white;
  border: 1px solid white;
  padding: 7px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  height: 2.28571em;
  border-radius: 5px;
}

.add-task button:hover {
  background: white;
  color: #fd9c2d;
  border: 1px solid #fd9c2d;
}
</style>