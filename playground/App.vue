<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import LoaderTest from './components/LoaderTest.vue';
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <LoaderTest />
</template>

<style>
@import 'nprogress/nprogress';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.loading {
  width: 200px;
  height: 30px;
  background: #35495e;
  color: #fff;
  position: fixed;
  bottom: 0;
  left: calc(50% - 100px);
  text-align: center;
  padding-top: 10px;
  z-index: 9998;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#nprogress .bar {
  background: #41b883;
  height: 3px;
}

#nprogress .peg {
  box-shadow: 0 0 10px #41b883, 0 0 5px #41b883;
}

#nprogress .spinner-icon {
  border-top-color: #41b883;
  border-left-color: #41b883;
}
</style>
