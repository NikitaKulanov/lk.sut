<template>
  <div id="dashboard-kanban">
          <div class="button-block" ref="buttonBlock" v-for="(button, indexButton) in buttons">
            <button @click.prevent="performAction(button, indexButton)" :class="[button.active ? 'nav-active' : '', 'dashboard-button']" class="dashboard-button">
              <svg v-if="button.actionId === actionsId.showOrHideList" width="24" height="24" viewBox="0 0 24 24">
                <path d="M8.292 10.293a1.009 1.009 0 000 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 000-1.419.987.987 0 00-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 00-1.406 0z" fill="currentColor" fill-rule="evenodd"></path>
              </svg>
              <svg v-if="button.actionId === actionsId.addTask" data-v-3bfcf9e4="" id="add-task" width="20" height="20" viewBox="0 0 24 24">
                <path data-v-3bfcf9e4="" d="M13 11V3.993A.997.997 0 0012 3c-.556 0-1 .445-1 .993V11H3.993A.997.997 0 003 12c0 .557.445 1 .993 1H11v7.007c0 .548.448.993 1 .993.556 0 1-.445 1-.993V13h7.007A.997.997 0 0021 12c0-.556-.445-1-.993-1H13z" fill="currentColor" fill-rule="evenodd"></path>
              </svg>
              <span class="block-title">{{button.title}}</span>
            </button>
            <div class="nav-content" v-if="button.list && button.active">
              <ul class="nav-ul">
                <li v-for="element in button.list.items">
                  &#183; <a :href="'#' + element.firstTitle">{{element.firstTitle}} {{button.list.isPeople ? element.secondTitle: '(' + element.secondTitle + ')'}}</a>
                </li>
              </ul>
            </div>
          </div>
    <ModalAddTask v-if="payloadModalAddTask" :payload="payloadModalAddTask" ref="modalAddTask"></ModalAddTask>
  </div>
</template>
<script>
import ModalAddTask from "@/components/Kanban/Modal/ModalAddTask";
export default {
  name: "Dashboard",
  components: {
    ModalAddTask
  },
  props: ['payload'],
  data(){
    return {
      buttons: this.payload.buttons,
      actionsId: {
        showOrHideList : 1,
        addTask : 2,
      },
      payloadModalAddTask: null
    }
  },

  mounted() {
    console.log('Dashboard', this.payload)
    window.onclick = (event) => {
      if ( !(event.target.className === 'dashboard-button' || event.target.closest('.dashboard-button'))) {
        if ( !(event.target.className === 'nav-content' || event.target.closest('.nav-content'))) {
          this.buttons.forEach( (button) => {
            button.active = false
          })
        }
      }
    }
  },

  methods: {
    setPayloadModalAddTask(payload) {
      this.payloadModalAddTask = payload
    },
    async performAction(button, indexButton) {
      this.buttons.forEach((button, index) => {
        if (index === indexButton && indexButton !== 1) {
          button.active = !button.active
        } else {
          button.active = false
        }
      })
      switch (button.actionId) {
        case this.actionsId.showOrHideList:
          break
        case this.actionsId.addTask:
          await this.setPayloadModalAddTask(this.payload.payloadForModalAddTask)
          this.$refs.modalAddTask.openModel()
          // ...
          //   [break]
          //
          // default:
          // ...
          //   [break]
      }
    },
    closeModal() {
      this.payloadModalAddTask = null
    },
  }
}
</script>

<style scoped>
#dashboard-kanban {
  flex-basis: 45px;
  display: flex;
}

.nav-content {
  position: absolute;
  box-shadow: rgb(9 30 66 / 25%) 00px 4px 8px -2px, rgb(9 30 66 / 31%) 00px 00px 1px;
  padding: 5px;
  z-index: 99;
  min-width: 300px;
  background-color: #F9F0DA;
  border-radius: 7px;
  top: 00px;
  left: 00px;
  transform: translate3d(00px, 40px, 0px);
}

.button-block {
  position: relative;
  margin-left: 7px;
}

.dashboard-button {
  position: relative;
  cursor: pointer;
  background-color: #f0ede9;
  border: 1px solid #f0ede9;
  border-radius: 7px;
  padding: 5px 5px 5px 1px;
  font-size: 18px;
  font-weight: 600;
  height: 33px;
}

.dashboard-button span {
  position: relative;
  padding-left: 30px;
  padding-right: 10px;

}

.dashboard-button svg {
  position: absolute;
  top: 4px;
  left: 6px;
}

.dashboard-button:hover {
  background: #F9F0DA;
}

.nav-ul li {
  white-space: nowrap;
  font-size: 20px;
  font-weight: 600;
  list-style-type: none;
}

.nav-ul a {
  margin-bottom: 5px;
  color: #6b778c;
  text-decoration: none;
}

.nav-ul a:hover{
  color: #333;
  text-decoration: underline;
}

.nav-active {
  background: #fd9c2d;
  color: white;
}
.nav-active:hover {
  background: #fd9c2d;
}
</style>