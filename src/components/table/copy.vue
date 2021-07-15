<!--
 * @Description: 
 * @Autor: islongwayzzm
 * @Date: 2021-07-15 16:22:29
 * @LastEditors: islongwayzzm
 * @LastEditTime: 2021-07-15 16:22:37
-->
<style>
.main {
  width: 500px;
  overflow: auto;
  height: 208px; /* 设置固定高度 */
}
td,
th {
  /* 设置td,th宽度高度 */
  border: 1px solid gray;
  width: 100px;
  height: 30px;
}
th {
  background-color: lightblue;
}
table {
  table-layout: fixed;
  width: 200px; /* 固定宽度 */
}
td:first-child,
th:first-child {
  position: sticky;
  left: 0; /* 首行永远固定在左侧 */
  z-index: 1;
  background-color: lightpink;
}
thead tr th {
  position: sticky;
  top: 0; /* 列首永远固定在头部  */
}
th:first-child {
  z-index: 2;
  background-color: lightblue;
}
</style>
<template>
  <div id="app">
    <div class="main">
      <table cellspacing="0">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in 30" :key="index">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
