<template>
  <div class="menu" ref="leftMenu">
    <a href="#" @click.prevent="openOrCloseMenu" class="menu-btn"><img src="../assets/images/leftMenu/navigation_menu.png" alt="Боковая панель навигации"></a>
    <nav class="menu-list" ref="listMenu">
      <div class="point-menu">Личное</div><div class="decor-menu"></div>
      <a href="#">Сообщения</a>
      <a href="#">Мой профиль</a>
      <a href="#">Настройки</a>
      <a href="#">Резюме</a>
      <div class="point-menu">Учёба</div><div class="decor-menu"></div>
      <a href="#">Расписание</a>
      <a href="#">Все доски</a>
      <a href="#">Зачетка</a>
    </nav>
  </div>
</template>

<script>
export default {
  name: "LeftMenu",

  methods: {
    openOrCloseMenu(){
      this.$refs.leftMenu.classList.toggle('menu-active');
      this.$refs.listMenu.classList.toggle('menu-list-display-flex');
      this.$parent.$refs.content.classList.toggle('content-active');
    }
  }
}
</script>

<style scoped>
.menu {
  border-right: 2pt solid #fd9c2d;
  z-index: 98;
  position: fixed;
  left: 0;top: 0;
  width: 15%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /*background-color: #454545;*/
  background-color: #545454;
  transition: 0.5s;
  transform: translateX(-85%);
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
.menu-active {
  transform: translateX(0%);
}
.menu-list {
  width: 90%;
  display: none;
  /*justify-content: space-around;*/
  align-items: center;
  height: 50%;
  flex-direction: column;
}

.menu-list-display-flex {
  display: flex;
}

.menu-list a {
  color: #a0aec0;
}

.menu-list a:hover {
  color: white;
}

.menu-list a {
  text-align: center;
  width: 100%;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  flex-basis: 50px;
  /*line-height: 50px;*/
}
.menu-btn {
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 25px;
  z-index: 97;
  position: absolute;
  right: -21px;
  top: 120px;
  box-shadow: 0 0 7px rgba(0,0,0,0.5);
}
.menu-btn img {
  position: absolute;
  top: 5px;
  left: 5px;
}
.menu-btn:hover {
  transform: scale(1.1);
  transition: transform .2s;
}

.point-menu {
  /*line-height:30px;*/
  cursor: default;
  display: inline-block;
  /*background-color: #545454;*/
  z-index: 99;
  text-transform: uppercase;
  font-weight: 800;
  color: white;
  flex-basis: 30px;
  width: 100%;
  text-align: center;
}

.decor-menu {
  z-index: 98;
  bottom: 0;
  width: 100%;
  background-color: white;
  height: 3px;
  margin-bottom: 15px;
}
</style>