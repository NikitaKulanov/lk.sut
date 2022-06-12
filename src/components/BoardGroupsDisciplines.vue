<template>
    <div id="menu-group-teacher">
        <div id="menu-group-content">
            <div class="block-headlines">
                <ul class="event_columns">
                    <li class="list__caption">1 КУРС</li>
                    <li class="list__caption">2 КУРС</li>
                    <li class="list__caption">3 КУРС</li>
                    <li class="list__caption">4 КУРС</li>
                </ul>
            </div>
            <div class="block-main-content">
                <div v-if="groups" v-for="(item, index) in groups" class="column-group">
                    <ul class="ul-group">
                        <li v-for="(item_group, index) in item.groups" class="item-group">
                            <div class="title-group">
                                {{item_group.title}}
                            </div>
                            <ul class="ul-title-disciplines">
                                <li v-for="(item_discipline, index) in item_group.disciplines"
                                    class="item-discipline">
                                    &bull; <router-link :key="item_discipline.id" class="item-discipline"
                                                        :to="{name: 'user.board.discipline.students', params:
                                                        {
                                                          disciplineId : item_discipline.id,
                                                          disciplineAbbreviation : item_discipline.abbreviation,
                                                          disciplineTitle : item_discipline.title,
                                                          groupTitle : item_group.title,
                                                          groupId : item_group.id
                                                        }
                                    }">{{item_discipline.title}}</router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

export default {
  name: "BoardGroupsDisciplines",
  props: ['payload'],

  data() {
    return {
      groups: this.payload
    }
  },
  mounted() {
    console.log(this.payload, 90);
  }
}
</script>

<style scoped>
#menu-group-teacher {
    /*padding-top: 20px;*/
    width: 100%;
    height: calc(100% - 160px);
}

#menu-group-content {
    max-width: 1520px;
    height: 100%;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
}

.block-headlines {
    width: 1485px;
    flex-basis: 58px;
}

.block-main-content {
    flex-basis: calc(100% - 58px);
    overflow-x: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 1485px;
}

.column-group {
    width: 330px;
}

.ul-group {
    border-radius: 10px;
    background-color: #f0ede9;
    display: inline-block;
    width: 330px;
    padding: 20px 20px 00px 20px;
    min-height: 150px;
    list-style-type: none;
}

.item-group {
    display: flex;
    position: relative;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    border-radius: 10px;
    margin-bottom: 20px;
    background-color: #F9F0DA;
    flex-direction: column;
}

.title-group {
    border-radius: 10px 10px 0 0;
    font-weight: bold;
    padding: 12px 20px;
    background-color: #69665e;
    color: white;
}


.ul-title-disciplines {
    padding-right: 7px;
    padding-left: 7px;
    padding-bottom: 7px;
}

.item-discipline {
    margin-top: 4px;
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: 600;
    color: #585e69;
    cursor: pointer;
}

.item-discipline:hover {
    color: #000;
}

.event_columns {
  /*position: relative;*/
  background-color: #d1c6b8;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.list__caption {
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
</style>
