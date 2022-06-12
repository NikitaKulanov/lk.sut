<template>
  <Header v-if="payloadForHeader" :payload="payloadForHeader"></Header>
  <main>
    <LeftMenu></LeftMenu>
    <div id="content" ref="content" class="content-passive">
      <BoardHeader v-if="payloadForBoardHeader" :payload="payloadForBoardHeader"></BoardHeader>
      <BoardGroupsDisciplines v-if="payloadForBoard" :payload="payloadForBoard"></BoardGroupsDisciplines>
    </div>
  </main>
</template>

<script>
import Header from "@/components/Header";
import LeftMenu from "@/components/LeftMenu";
import BoardHeader from "@/components/Kanban/Header";
import BoardGroupsDisciplines from "@/components/BoardGroupsDisciplines";

export default {
  name: "ProfessorBoardGroupsDisciplinesView",
  inject: ['api', 'errHandler'],
  components: {
    Header,
    LeftMenu,
    BoardHeader,
    BoardGroupsDisciplines
  },
  data(){
    return {
      payloadForBoard: null,
      payloadForBoardHeader: null,
      payloadForHeader: null,
    }
  },

  created(){
    this.setDataForHeader(this.$store.getters.getUser)
    this.setDataForBoard()
    this.setDataForBoardHeader([
      {
        title: 'Группы'
      },
      {
        title: 'Ваши группы'
      }
    ], 'Ваши группы')
  },

  methods: {
    setDataForHeader(user) {
      this.payloadForHeader = {
        user: user,
      }
    },
    setDataForBoard() {
      this.api.kanban.getGroupsForProfessor()
          .then((response) => {
            if(response.data.length !== 0){
              console.log('Информация, для преподавателя по группам, получена!')
              this.payloadForBoard = response.data
            } else {
              console.log('Запрос, для получения групп для преподавателя, выполнен успешно, но данных нет!')
            }
          }).catch(error => {
        alert(error.response.data.message)
        console.log('Информация, для преподавателя по группам, не получена!')
        console.log(error)
      })
    },
    setDataForBoardHeader(paths, title) {
      this.payloadForBoardHeader = {
        paths: paths,
        title: title
      }
    },
  }
}
</script>

<style scoped>

</style>