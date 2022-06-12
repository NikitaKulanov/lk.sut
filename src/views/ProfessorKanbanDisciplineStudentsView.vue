<template>
  <Header v-if="payloadForHeader" :payload="payloadForHeader"></Header>
  <main>
    <LeftMenu></LeftMenu>
    <div id="content" ref="content" class="content-passive">
      <KanbanHeader v-if="payloadForKanbanHeader" :payload="payloadForKanbanHeader"></KanbanHeader>
      <Kanban v-if="payloadForKanban" :payload="payloadForKanban"></Kanban>
    </div>
  </main>
</template>

<script>
import Header from "@/components/Header";
import LeftMenu from "@/components/LeftMenu";
import KanbanHeader from "@/components/Kanban/Header";
import Kanban from "@/components/Kanban/Kanban";
export default {
  name: "ProfessorKanbanDisciplineStudentsView",
  props: ['disciplineId', 'disciplineAbbreviation', 'disciplineTitle', 'groupTitle', 'groupId'],
  inject: ['api', 'errHandler'],
  components: {
    Header,
    LeftMenu,
    KanbanHeader,
    Kanban
  },
  data(){
    return {
      payloadForKanban: null,
      payloadForKanbanHeader: null,
      payloadForHeader: null,
    }
  },
  created(){
    if(!this.disciplineId) {
      this.$router.push({name: 'user.board.groups.disciplines'})
    } else {
      this.setDataForHeader(this.$store.getters.getUser)
      this.setDataForKanban()
      this.setDataForKanbanHeader([
        {
          title: 'Ваши группы'
        },
        {
          title: this.groupTitle
        }
      ], this.disciplineTitle)
    }
  },
  methods: {
    setDataForHeader(user) {
      this.payloadForHeader = {
        user: user,
      }
    },

    setDataForKanban() {
      this.api.kanban.getStudentsForProfessor(this.disciplineId, this.groupId)
          .then((response) => {
            if(response.data.length !== 0){
              console.log('Информация, для преподавателя по группам, получена!')
              this.payloadForKanban = response.data
              this.payloadForKanban.disciplineId = this.disciplineId
              this.payloadForKanban.payloadForDashboard = {
                buttons: [
                  {
                    title: 'Студенты',
                    actionId: 1,
                    list: {
                      isPeople: true,
                      items:[]
                    },
                    active: false
                  },
                  {
                    title: 'Добавить задание',
                    actionId: 2,
                    list: null,
                    active: false
                  }
                ],
                payloadForModalAddTask: {
                  modalOptions: [8, 9, 10],
                  groupTitle: this.groupTitle ,
                  groupId: Number(this.groupId),
                  disciplineId: Number(this.disciplineId),
                  disciplineAbbreviation: this.disciplineAbbreviation,
                  disciplineTitle: this.disciplineTitle
                }
              }
              console.log('payloadForModalAddTask', this.payloadForKanban.payloadForDashboard.payloadForModalAddTask)
              // Данные для payloadForKanban.dataForDashboard[0].list
              this.payloadForKanban.rows.forEach((raw) => {
                this.payloadForKanban.payloadForDashboard.buttons[0].list.items.push({
                  secondTitle: raw.first_title,
                  firstTitle: raw.second_title
                })
              })
              // Данные о том какие поля с информации будут в модальном окне для задачи
              this.payloadForKanban.modalTaskOptions = [1, 2, 3, 4, 5, 7]
            } else {
              console.log('Запрос, для получения задач для студента, выполнен успешно, но данных нет!')
            }
          }).catch(error => {
        alert(error.response.data.message)
        console.log('Информация, для студента по задачам, не получена!')
        console.log(error)
      })
    },

    setDataForKanbanHeader(paths, title) {
      this.payloadForKanbanHeader = {
        paths: paths,
        title: title
      }
    },
  }
}
</script>

<style scoped>

</style>