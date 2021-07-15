<!--
 * @Description: 
 * @Autor: islongwayzzm
 * @Date: 2021-07-15 14:24:34
 * @LastEditors: islongwayzzm
 * @LastEditTime: 2021-07-15 14:53:45
-->
<template>
  <div id="app">
    <JMtable></JMtable>
  </div>
</template>

<script>
import JMtable from './components/table/index.vue';
export default {
  name: 'app',
  components: {
    JMtable,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
