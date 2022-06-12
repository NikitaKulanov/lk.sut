<template>
  <router-view/>
</template>

<style>
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

*::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #e9e6de;
}

*::-webkit-scrollbar-thumb {
  /*border-radius: 3px;*/
  background-color: #e6b58a;
}

*::-webkit-scrollbar-track {
  background-color: rgba(198, 140, 61, 0);
}

*::-webkit-scrollbar-thumb:hover {
  background: #fd9c2d;
}

html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

a {
  text-decoration: none;
}

li {
  text-decoration: none;
  list-style: none;
}

#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

#particle{
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
}

#content-for-role-null {
  width: 100%;
  height: 100%;
  background-color: #d1c6b8;
}

.role-null {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 17%;
  overflow: auto;
  text-align: center;
  line-height: 1.5;
  font-size: 50px;
}

.transparent-button {
  width: 50px;
  height: 50px;
  padding: 7px;
  border:none;
  background:transparent;
}

.transparent-button:hover {
  cursor: pointer;
  border: 3px solid white;
  border-radius: 30px;
}

main {
  z-index: 96;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #d1c6b8;
}

#content {
  height: 100%;
  padding-top: 70px;
  background-color: #d1c6b8;
  transition: 0.5s;
  position: relative;
  /*justify-content: center;*/
  /*align-items: center;*/
  /*display: flex;*/
  /*height: 100vh;*/
}

.content-passive {
  padding-left: 5%;
}

.content-active {
  transform: translateX(15%);
  padding-left: 3%;
}
</style>
