<!--
 * @Description: JMtable
 * @Autor: islongwayzzm
 * @Date: 2021-07-15 14:39:56
 * @LastEditors: islongwayzzm
 * @LastEditTime: 2021-07-15 17:50:07
-->
<template>
  <div class="JMtable">
    <table width="100%" cellspacing="1" cellpadding="2" class="JMtable-table">
      <tr class="JMtable-table_tr">
        <th
          v-for="item in colunm"
          :key="item.dataIndex"
          :style="{
            width: `${item.width / 100}rem`,
          }"
        >
          {{ item.dataIndex }}
        </th>
      </tr>
      <tr
        class="JMtable-table_tr"
        v-for="(item, index) in tableData"
        :key="index"
      >
        <td
          v-for="item2 in colunm"
          :key="item2.dataIndex"
          :style="{ 'text-align': item2.align || 'center' }"
        >
          {{ item[item2.dataIndex || ''] }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'JMtable',
  data() {
    return {
      colunm: [
        {
          title: 'Header1',
          dataIndex: 'name',
          fixed: 'left',
          width: 150,
          align: 'left',
        },
        {
          title: 'Header2',
          dataIndex: 'name2',
          width: 150,
          align: 'center',
        },
        {
          title: 'Header3',
          dataIndex: 'name3',
          width: 150,
          align: 'right',
        },
        {
          title: 'Header4',
          dataIndex: 'name4',
          width: 150,
          align: 'right',
        },
        {
          title: 'Header5',
          dataIndex: 'name5',
          width: 150,
          align: 'right',
        },
        {
          title: 'Header6',
          dataIndex: 'name6',
          width: 150,
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
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.JMtable {
  font-size: 0.3rem;
  background-color: #ccc;
  height: 2rem;
  width: 100%;
  overflow: auto;
  &-table {
    table-layout: fixed;
    &_tr {
      td {
        background: #fff;
      }
      th {
        background: #fff;
      }
      th {
        position: sticky;
        top: 0;
      }
      /* 固定列 */
      td:last-child,
      th:last-child {
        position: sticky;
        right: 0;
        border-left: 1px solid rgba(211, 208, 208, 0.5);
      }
      td:first-child,
      th:first-child {
        position: sticky;
        left: 0.01rem;
        border-right: 1px solid rgba(211, 208, 208, 0.5);
      }
      th:nth-child(2),
      td:nth-child(2) {
        position: sticky;
        left: 1.625rem;
      }

      /* 固定表头 */
      th {
        position: sticky;
        top: 0;
      }
      &:first-child,
      th:first-child {
        z-index: 2;
        background-color: lightblue;
      }

      &:last-child,
      th:last-child {
        z-index: 2;
        background-color: lightblue;
      }

      &:nth-child(2),
      th:nth-child(2) {
        z-index: 2;
        background-color: lightblue;
      }
    }
  }
}
</style>
