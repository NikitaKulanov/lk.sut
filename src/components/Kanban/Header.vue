<template>
  <div id="header-for-kanban">
    <div id="block_nav">
      <nav class="path_board">
        <span v-for="path in paths">
<!--          @click.prevent="goPath(index, item.pathTitle)-->
          <span class="path" ref="path">
            {{path.title}}
          </span > /
        </span>
      </nav>
      <div id="kanban_title">{{ title }}</div>
    </div>
    <div class="block_message">
      <div class="message_day">
        <h3>Пушкинская карта — твой пропуск в мир культурных событий страны</h3>
        <span class="message">
                        Пушкинская карта – это субсидия от государства на покупку билетов в учреждения культуры. Благодаря программе молодые люди в возрасте от 14 до 22 лет смогут за счет государства посещать мероприятия по всей стране.
            <a href="#">
                Читать далее
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-eye" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"></path>
                    <path fill-rule="evenodd" d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
                </svg>
            </a>
            </span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "KanbanHeader",
  props: ['payload'],
  data(){
    return {
      title: this.payload.title,
      paths: this.payload.paths
    }
  },
  mounted() {
    this.$refs.path[this.paths.length - 1].style.color = '#000';
    this.$refs.path[this.paths.length - 1].style.cursor = 'no-drop';
    // this.payload.paths.forEach(() => {
    //
    // })
  }
}
</script>

<style scoped>
#header-for-kanban {
  position: relative;
  width: 100%;
  height: 160px;
  display: flex;
  /*border: 2px solid #1a202c;*/
}

#block_nav {
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
}

.path_board .path {
  cursor: pointer;
  color: #6b778c;
  text-decoration: none;
}

.path_board .path:hover {
  color: #333;
  text-decoration: underline;
}

.path_board .path:active {
  color: #8c826b;
}

.path_board {
  font-size: 20px;
  font-weight: 600;
  padding-top: 30px;
}

.path-no-active {
  color: #000;
}

#kanban_title {
  color: #333;
  font-size: 35px;
  font-weight: 600;
  margin-top: 17px;
  min-width: 275px;
  max-width: 500px;
  height: 80px;
  overflow-x: hidden;
}

.block_message {
  flex-basis: 70%;
}

.message_day {
  padding: 7px;
  display: inline-block;
  width: 600px;
  height: 137px;
  margin-top: 12px;
  /*margin-left: 80px;*/
  border: 2px solid #857c73;
  border-radius: 15px;
  background-color: #dedede;
  overflow-x: hidden;
}

.message_day a {
  color: #bd7420;
  text-decoration: none;
}

.message_day svg {
  vertical-align: middle;
}
</style>