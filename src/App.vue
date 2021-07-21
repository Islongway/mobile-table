<!--
 * @Description: 
 * @Autor: islongwayzzm
 * @Date: 2021-07-15 14:24:34
 * @LastEditors: islongwayzzm
 * @LastEditTime: 2021-07-21 10:19:06
-->
<template>
  <div id="app">
    <JMtable
      :colunm="colunm"
      check
      height="6rem"
      :tableData="ctableData"
      @retCheck="retCheck"
      @retAllCheck="retAllCheck"
    />
  </div>
</template>

<script>
import JMtable from './components/table/index.vue';
// import { deepClone } from './components/table/renderScope';
export default {
  name: 'app',
  components: {
    JMtable,
  },
  data() {
    return {
      colunm: [
        {
          title: 'Header1',
          dataIndex: 'name',
          fixed: 'left', //固定
          width: 150,
          align: 'left', //字体位置
          customRender: (h, text, record, index, index2) => {
            // console.log(text, record, index, index2, h);
            return (
              <div
                onTouchstart={() => {
                  alert(`${text}--${index}-${index2}`);
                }}
                style={{ color: 'blue', 'text-align': 'center' }}
              >
                touch
              </div>
            );
          },
        },
        {
          title: 'Header2',
          dataIndex: 'name2',
          // fixed: 'left',
          width: 150,
        },
        {
          title: 'Header3',
          dataIndex: 'name3',
          // fixed: 'left',
          width: 150,
        },
        {
          title: 'Header4',
          dataIndex: 'name4',
          width: 150,
        },
        {
          title: 'Header5',
          dataIndex: 'name5',
          width: 150,
        },
        {
          title: 'Header6',
          dataIndex: 'name6',
          width: 150,
          fixed: 'right',
          align: 'right',
        },
      ],
      ctableData: [],
    };
  },
  methods: {
    //单选点击触发的事件
    retCheck(select, selectData, index, item) {
      console.log('retCheck', select, selectData, index, item);
    },
    // 全选触发事件
    retAllCheck(select, selectData) {
      console.log('retAllChekc', select, selectData);
    },
  },
  created() {
    for (let i = 0; i < 1000; i++) {
      this.ctableData.push({
        name: `1-${i}`,
        name2: `2-${i}`,
        name3: `3-${i}`,
        name4: `4-${i}`,
        name5: `5-${i}`,
        name6: `6-${i}`,
      });
    }
  },
};
</script>

<style lang="scss" scoped></style>
