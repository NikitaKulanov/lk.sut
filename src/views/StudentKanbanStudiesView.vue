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
import KanbanHeader from "@/components/Kanban/Header";
import Kanban from "@/components/Kanban/Kanban";
import LeftMenu from "@/components/LeftMenu";

export default {
  name: 'StudentKanbanStudiesView',
  inject: ['api', 'errHandler'],
  components: {
    LeftMenu,
    Kanban,
    KanbanHeader,
    Header
  },

  data(){
    return {
      payloadForKanban: null,
      payloadForKanbanHeader: null,
      payloadForHeader: null,
    }
  },

  created(){
    this.setDataForHeader(this.$store.getters.getUser)
    this.setDataForKanban()
    this.setDataForKanbanHeader([
      {
        title: 'Все доски'
      },
      {
        title: 'Главная доска'
      }
    ], 'Главная доска')
  },

  methods: {
    setDataForHeader(user) {
      this.payloadForHeader = {
        user: user,
      }
    },
    setDataForKanban() {
        this.api.kanban.getTasksForStudent()
            .then((response) => {
              if(response.data.length !== 0){
                console.log('Информация, для студента по задачам, получена!')
                this.payloadForKanban = response.data
                this.payloadForKanban.payloadForDashboard = {
                  buttons: [
                    {
                      title: 'Дисциплины',
                      actionId: 1,
                      list: {
                        isPeople: false,
                        items:[]
                      },
                      active: false
                    }
                  ]
                }
                // Данные для payloadForKanban.dataForDashboard[0].list
                this.payloadForKanban.rows.forEach((raw) => {
                  this.payloadForKanban.payloadForDashboard.buttons[0].list.items.push({
                    secondTitle: raw.first_title,
                    firstTitle: raw.second_title
                  })
                })
                // Данные о том какие поля с информации будут в модальном окне для задачи
                this.payloadForKanban.modalTaskOptions = [1, 2, 3, 4, 5, 6]
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
