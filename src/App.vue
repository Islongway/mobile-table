<!--
 * @Description: 
 * @Autor: islongwayzzm
 * @Date: 2021-07-15 14:24:34
 * @LastEditors: islongwayzzm
 * @LastEditTime: 2021-07-16 15:50:17
-->
<template>
  <div id="app">
    <JMtable :colunm="colunm" :tableData="tableData" />
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
    return {
      colunm: [
        {
          title: '多选框',
          dataIndex: 'checkbox',
          fixed: 'left',
          width: 50,
        },
        {
          title: 'Header1',
          dataIndex: 'name',
          fixed: 'left',
          width: 150,
          align: 'left',
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
      tableData: [
        {
          name: '1111',
          name2: '1222',
          name3: '333',
          name4: '1111',
          name5: '1222',
          name6: '333',
        },
        {
          name: '1111',
          name2: '1222',
          name3: '333',
          name4: '1111',
          name5: '1222',
          name6: '333',
        },
        {
          name: '1111',
          name2: '1222',
          name3: '333',
          name4: '1111',
          name5: '1222',
          name6: '333',
        },
        {
          name: '1111',
          name2: '1222',
          name3: '333',
          name4: '1111',
          name5: '1222',
          name6: '333',
        },
        {
          name: '1111',
          name2: '1222',
          name3: '333',
          name4: '1111',
          name5: '1222',
          name6: '333',
        },
        {
          name: '1111',
          name2: '1222',
          name3: '333',
          name4: '1111',
          name5: '1222',
          name6: '333',
        },
        {
          name: '1111',
          name2: '1222',
          name3: '333',
          name4: '1111',
          name5: '1222',
          name6: '333',
        },
        {
          name: '1111',
          name2: '1222',
          name3: '333',
          name4: '1111',
          name5: '1222',
          name6: '333',
        },
        {
          name: '1111',
          name2: '1222',
          name3: '333',
          name4: '1111',
          name5: '1222',
          name6: '333',
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
