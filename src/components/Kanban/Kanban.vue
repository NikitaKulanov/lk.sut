<template >
  <div id="kanban" ref="modalAddTask">
    <Dashboard :payload="payloadForDashboard"></Dashboard>

<!--    <button @click.prevent="test"></button>-->

    <div class="body-kanban">
      <div class="block-columns">
        <ul class="event-columns">
          <li v-for="status in statuses" class="list-caption">{{status.title}}</li>
        </ul>
      </div>
      <div class="kanban">
        <div class="wrapper-kanban">
          <div ref="kanbanRaw" class="kanban-raw" v-for="(row, indexRow) in rows">
            <div @click="rowTurnSolve(indexRow)" class="element-header" >
              <div v-if="this.drawMode === 1" class="title-row">
                <span>∨</span><a :name="row.second_title"></a> {{row.second_title}} / {{row.first_title}}  
              </div>
              <div v-if="this.drawMode === 2" class="title-row">
                <span>∨</span><a :name="row.second_title"></a> {{row.second_title}} {{row.first_title}}  
              </div>
              <div class="line-row"></div>
            </div>
            <div class="status-raw">
              <div v-for="status in statuses"
                   :key="status.id"
                   @drop="onDrop($event, status.id, row.id)"
                   @dragenter="onEnter($event)"
                   @dragleave="onLeave($event)"
                   :data-id="row.id"
                   v-bind:class="[forbiddenCells.includes(status.id) ? 'droppable-no-active' : '', 'droppable']"
                   @dragover.prevent
                   @dragenter.prevent>
                <div v-for="card in cards.filter(x => x.statusId === status.id && x.sectionId === row.id)"
                     @dragstart="onDragStart($event, card)"
                     @dragend="onDragEnd($event, card)"
                     class="draggable"
                     @click.prevent="openModal(card.id)"
                     v-bind:draggable="[!forbiddenCells.includes(status.id)]">
                  <div class="list__card-header">
                    {{card.title}}
                  </div>
                  <div class="list__card-info">
                    <b>Тема:</b>
                    {{card.theme}}
                  </div>
                  <div class="list__card-footer">
                    <img class="time_list__card" alt="Сроки сдачи" :src="card.deadline_img"><p>Срок сдачи {{card.deadline}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal ref="modal" v-if="payloadForModal" :payload="payloadForModal"></Modal>
  </div>
</template>

<script>
import $ from "jquery"
import Dashboard from "@/components/Kanban/Dashboard";
import Modal from "@/components/Kanban/Modal/Modal";
export default {
  name: 'Kanban',
  props: ['payload'],
  inject: ['api', 'errHandler', 'toLowerCaseBesidesFirst'],
  components: {
    Dashboard,
    Modal
  },

  data(){
    return {
      cost: null, // ЭТО КОСТЫЛЬ
      statuses: this.payload.statuses,
      rows: this.payload.rows,
      cards: this.payload.cards,
      forbiddenCells: this.payload.forbiddenStatuses,
      payloadForDashboard: this.payload.payloadForDashboard,
      payloadForModal: null,
      drawMode: null,
    }
  },

  created() {
    switch (this.$parent.$options.name) {
      case 'StudentKanbanStudiesView':
        this.drawMode = 1
        break
      case 'ProfessorKanbanDisciplineStudentsView':
        this.drawMode = 2
        break
    }

    this.cards.forEach((card) => {
      let diffDays = (new Date(card.deadline_timestamp * 1000)).getDate() -
          (new Date()).getDate()
      if (diffDays >= 3) {
        card.deadline_img = require('../../assets/images/task/time_green.png')
      } else if(diffDays === 2) {
        card.deadline_img = require('../../assets/images/task/time_yellow.png')
      } else if(diffDays < 2) {
        card.deadline_img = require('../../assets/images/task/time_red.png')
      }
    });
  },

  mounted() {
    window.Echo.channel('kanban-sut-task-status').listen('EditTaskStatus', (response) => {
      this.editCardStatusLocal(response.taskId, response.status)
    })
    window.Echo.channel('kanban-sut-add-task-card').listen('AddTaskKanban', (response) => {
      if(this.drawMode === 2) {
        if(response.authorId === this.$store.getters.getUser.id && response.disciplineId === Number(this.payload.disciplineId)) {
          response.card.sectionId = response.perpetratorId
          let diffDays = (new Date(response.card.deadline_timestamp * 1000)).getDate() -
              (new Date()).getDate()
          if (diffDays >= 3) {
            response.card.deadline_img = require('../../assets/images/task/time_green.png')
          } else if(diffDays === 2) {
            response.card.deadline_img = require('../../assets/images/task/time_yellow.png')
          } else if(diffDays < 2) {
            response.card.deadline_img = require('../../assets/images/task/time_red.png')
          }
          this.cards.push(response.card)
        }
      } else if (this.drawMode === 1) {
        if(response.perpetratorId === this.$store.getters.getUser.id) {
          response.card.sectionId = response.disciplineId
          let diffDays = (new Date(response.card.deadline_timestamp * 1000)).getDate() -
              (new Date()).getDate()
          if (diffDays >= 3) {
            response.card.deadline_img = require('../../assets/images/task/time_green.png')
          } else if(diffDays === 2) {
            response.card.deadline_img = require('../../assets/images/task/time_yellow.png')
          } else if(diffDays < 2) {
            response.card.deadline_img = require('../../assets/images/task/time_red.png')
          }
          this.cards.push(response.card)
        }
      }
    })
  },

  methods: {
    test(){
      // console.log(this.statuses[0].id)
      this.editCardStatus(11, 2)
      // this.statuses[0].id = 10;
      // this.items[0].categoryId = 1
      // console.log(this.items[0].categoryId)
    },

    onDragStart(e, item) {
      e.target.style.boxShadow ='none'
      e.target.style.opacity = '0.4'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('itemId', item.id.toString())
      this.cost = item.sectionId
    },

    onDragEnd(e) {
      e.target.style.opacity='1'
      e.target.style.boxShadow='0 0 10px rgb(0 0 0 / 50%)'
    },

    onDrop(e, statusId, rowId) {
      if(!this.forbiddenCells.includes(statusId)){
        this.clearBackgroundCell(e.target)
        e.target.style.opacity = 1
        const itemId = parseInt(e.dataTransfer.getData('itemId'))
        this.cards.forEach((item) => {
          if (item.id === itemId && rowId === item.sectionId) {
            let oldStatusId = item.statusId
            item.statusId = statusId
            this.eventEditCardStatusOnBoard(item, statusId, oldStatusId)
          }
        })
      }
    },

    onEnter(e) { // vue event-handling
      let droppable = e.target
      if(droppable) {
        if(droppable.className === "droppable" ) {
          if(this.cost === parseInt(droppable.dataset['id'])) {
            droppable.classList.add('hovered');
          } else {
            droppable.classList.add('hovered_no');
          }
        }
      }
    },

    onLeave(e) {
      if(e.target) {
        this.clearBackgroundCell(e.target)
      }
    },

    clearBackgroundCell(item) {
      if(item.className === "droppable hovered"){
        item.classList.remove('hovered');
      } else if(item.className === "droppable hovered_no") {
        item.classList.remove('hovered_no');
      }
    },

    rowTurnSolve(indexRow){ // ЭТО КОСТЫЛЬ
      let kanbanRaw = this.$refs.kanbanRaw[indexRow]
      let tick = kanbanRaw.children[0].children[0].children[0]
      $(kanbanRaw.children[1]).slideToggle( "slow", () => {
        if(tick.innerText === `∨`){
          tick.innerText = `∧`
        } else {
          tick.innerText = `∨`
        }
      });
    },

    editCardStatusLocal(cardId, status) {
      for (const card of this.cards) {
        if (card.id === cardId) {
          card.statusId = status.id
          // console.log(this.payloadForModal, 879)
          if(this.payloadForModal) {
            this.payloadForModal.status.id = status.id
            this.payloadForModal.status.title = this.toLowerCaseBesidesFirst(status.title)
          }
          return true
        }
      }
    },

    async editCardStatus(cardId, statusID) {
      for (const card of this.cards) {
        if (card.id === cardId) {
          if(await this.editTaskStatus(cardId, statusID)) {
            card.statusId = statusID
          }
          return true
        }
      }
      throw new Error("Element with id = " + cardId + " not found")
    },

    async eventEditCardStatusOnBoard(item, statusId, oldStatusId) {
      if (!await this.editTaskStatus(item.id, statusId)) {
        item.statusId = oldStatusId
      }
    },

    async editTaskStatus(taskId, statusID) {
      let success = false
      await this.api.task.pathTask(taskId, {
        status_id: statusID
      }).then((response) => {
        console.log('Задача изменила свой статус!')
        success = true
      }).catch(error => {
        alert(error.response.data.message)
        console.log('Задача не изменила свой статус!')
        console.log(error)
        success = false
      })
      return success
    },

    async openModal(taskId) {
      let success = false
      await this.api.task.getTask(taskId).then((response) => {
        this.payloadForModal = response.data
        this.payloadForModal.forbiddenCells = this.forbiddenCells
        this.payloadForModal.statuses = this.statuses
        this.payloadForModal.modalTaskOptions = this.payload.modalTaskOptions
        console.log('Информация по задаче получена!')
        success = true
      }).catch(error => {
        alert(error.response.data.message)
        console.log('Информация по задаче не получена!')
        console.log(error)
        success = false
      })
      if(success) {
        this.$refs.modal.showModel()
      }
    },

    closeModal() {
      this.payloadForModal = null
    },
  },
}
</script>

<style scoped>
#kanban {
  max-width: 1820px;
  height: calc(100% - 160px);
  display: flex;
  flex-direction: column;
  /*overflow: auto;*/
  /*border: 2px solid white;*/
}

.status-raw {
  /*display: grid;*/
  /*grid-template-columns: 1fr 1fr 1fr 1fr 1fr;*/
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 13px;
}

.droppable {
  border-radius: 10px;
  background-color: #f0ede9;
  display: inline-block;
  width: 330px;
  padding: 20px 20px 00px 20px;
  min-height: 150px;
  list-style-type: none;
  /*box-shadow: 0px 0px 7px 5px rgb(0, 0, 0, 0.2);*/
  /*overflow: hidden;*/
}
.droppable-no-active {
  background-color: #f5f0df
}
.droppable h4 {
  color: white;
}
.draggable {
  position: relative;
  cursor: pointer;
  box-shadow: rgb(9 30 66 / 25%) 00px 4px 8px -2px, rgb(9 30 66 / 31%) 00px 00px 1px;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: #F9F0DA;
}
.draggable h5 {
  margin: 0;
}

.body-kanban {
  flex-basis: calc(100% - 45px);
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}

.kanban {
  overflow-x: hidden;
  width: 1810px;
  flex-basis: calc(100% - 58px);
  /*border: 2px solid green;*/
  /*max-width: 1830px;*/
  /*height: 95%;*/
  /*overflow: auto;*/
  /*margin: 0 auto;*/
}

.wrapper-kanban {
  width: 1785px;
  /*overflow: auto;*/
}

.element-header {
  padding: 00px 18px 20px 18px;
  z-index: 51;
  cursor: pointer;
  font-weight: bold;
}

.title-row {
  display: inline-block;
  /*z-index: 50;*/
  background-color: #d1c6b8;
  color: #615b53;
  font-size: 18px;
  font-weight: 600;
}

.line-row {
  /*float: left;*/
  z-index: 50;
  /*position: relative;*/
  margin-top: -12px;
  /*margin-left: 10px;*/
  background-color: #615b53;
  height: 3px;
}




.block-columns {
  width: 1785px;
  flex-basis: 48px;
}

.event-columns {
  /*position: relative;*/
  background-color: #d1c6b8;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 10px;
}

.list-caption {
  /*box-shadow: 0 0 10px rgba(0,0,0,0.2); ???*/

  /*border-bottom: 9px solid #d1c6b8;*/
  font-size: 16px;
  background-color: #f0ede9;
  width: 330px;
  height: 48px;
  list-style-type: none;
  font-weight: bold;
  color: #615b53;
  text-align: center;
  line-height: 48px;
  border-radius: 15px 15px 15px 15px;
}







.list__card-header {
  border-radius: 10px 10px 0 0;
  font-weight: bold;
  padding: 12px 20px;
  background-color: #69665e;
  color: white;
  user-select: none;
}

.list__card-info {
  /*display: inline-block;*/
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 12px 20px 2px 20px;
  font-size: 16px;
  user-select: none;
}

.list__card-footer {
  height: 30px;
  position: relative;
  bottom: 00px;
  padding: 00px 00px 3px 20px;
  user-select: none;
}

.list__card-footer img {
  top: -10px;
  margin-right: 3px;
  float: left;
  user-select: none;
}

.list__card-footer p {
  padding-top: 3px;
  user-select: none;
}

.hovered {
  background-color: #d1e2d2;
}

.hovered_no {
  background-color: #e2d1d1;
}
</style>