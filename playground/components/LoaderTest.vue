<script setup lang="ts">
import { load } from '@playground/loader'
import axios from 'axios'
import NProgress from 'nprogress'

const createRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

const request = () => axios.get(`https://jsonplaceholder.typicode.com/todos/${createRandomNumber(1, 10)}`)

const fireRequest = () => {
  load(request).then((res) => {
    console.log(res.data)
  })
}

const fireRequestWithoutLoader = () => {
  NProgress.start()
  request().then((res) => {
    console.log(res.data)
    NProgress.done()
  })
}

const fireMultiple = (withLoader: boolean) => {
  let timesRun = 0
  const intervalID = setInterval(() => {
    timesRun += 1
    withLoader ? fireRequest() : fireRequestWithoutLoader()
    if (timesRun === 24) {
      clearInterval(intervalID)
    }
  }, 250)
}
</script>

<template>
  <div>
    <p>
      <strong>Without loader:</strong>
    </p>
    <p style="margin-top: 10px">
      Without using the loader you will notice that the loading indicator resets its progress causing a flicker.
    </p>
    <p>
      <a href="javascript:;" @click="fireRequestWithoutLoader">Click me quickly multiple times</a>
      or
      <a href="javascript:;" @click="fireMultiple(false)">Simulate multiple clicks</a>
    </p>
    <hr />
    <p>
      <strong>With loader:</strong>
    </p>
    <p>
      Click on the link below multiple times <strong>fast</strong> and you'll notice that the loading bar does not reset its
      progress.
    </p>
    <p>
      <a href="javascript:;" @click="fireRequest">Click me quickly multiple times</a>
      or
      <a href="javascript:;" @click="fireMultiple(true)">Simulate multiple clicks</a>
    </p>
  </div>
</template>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
hr {
  border-bottom: none;
  border-top: 1px solid #ccc;
  margin: 30px 0px 30px 0px;
}
</style>
