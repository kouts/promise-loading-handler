<template>
  <div>
    <p>
      <strong>Without loader:</strong>
    </p>
    <p style="margin-top: 10px">
      Without using the loader you will notice that the loading indicator resets
      its progress causing a flicker.
    </p>
    <p>
      <a href="javascript:;" @click="fireRequestWithoutLoader"
        >Click me quickly multiple times</a
      >
      or
      <a href="javascript:;" @click="fireMultiple(false)"
        >Simulate multiple clicks</a
      >
    </p>
    <hr />
    <p>
      <strong>With loader:</strong>
    </p>
    <p>
      Click on the link below multiple times <strong>fast</strong> and you'll
      notice that the loading bar does not reset its progress.
    </p>
    <p>
      <a href="javascript:;" @click="fireRequest"
        >Click me quickly multiple times</a
      >
      or
      <a href="javascript:;" @click="fireMultiple(true)"
        >Simulate multiple clicks</a
      >
    </p>
  </div>
</template>

<script>
import { load } from '../loader';
import axios from 'axios';
import NProgress from 'nprogress';

const createRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export default {
  name: 'LoaderTest',
  setup() {
    const request = () =>
      axios.get(
        `https://jsonplaceholder.typicode.com/todos/${createRandomNumber(
          1,
          10
        )}`
      );

    const fireRequest = () => {
      load(request).then((res) => {
        console.log(res.data);
      });
    };

    const fireRequestWithoutLoader = () => {
      NProgress.start();
      request().then((res) => {
        console.log(res.data);
        NProgress.done();
      });
    };

    const fireMultiple = (withLoader) => {
      let timesRun = 0;
      let intervalID = setInterval(() => {
        timesRun += 1;
        withLoader ? fireRequest() : fireRequestWithoutLoader();
        if (timesRun === 24) {
          clearInterval(intervalID);
        }
      }, 250);
    };

    return {
      fireRequest,
      fireRequestWithoutLoader,
      fireMultiple,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
