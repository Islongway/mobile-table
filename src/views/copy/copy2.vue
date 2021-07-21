<!--
 * @Description: JMtable
 * @Autor: islongwayzzm
 * @Date: 2021-07-15 14:39:56
 * @LastEditors: islongwayzzm
 * @LastEditTime: 2021-07-16 11:09:40
-->
<template>
  <div class="JMtable">
    <table width="100%" cellspacing="1" cellpadding="2" class="JMtable-table">
      <tr class="JMtable-table_tr">
        <th
          v-for="(item, index) in retColunm"
          :key="item.dataIndex"
          :style="{
            ...retStyle(item, false),
          }"
        >
          {{ index }}
          {{ item.dataIndex }}
        </th>
      </tr>
      <tr
        class="JMtable-table_tr"
        v-for="(item, index) in tableData"
        :key="index"
      >
        <td
          v-for="item2 in retColunm"
          :key="item2.dataIndex"
          :style="{ ...retStyle(item2) }"
        >
          {{ item[item2.dataIndex || ''] }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
/* 获取不同分辨率下跟750的比例 */
const toRem = ((document.documentElement.clientWidth / 100) * 13.3) / 100;

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
  computed: {
    retColunm() {
      let retData = [],
        aLeft = [],
        aCenter = [],
        aRight = [];
      this.colunm.forEach((val) => {
        val.fixed
          ? val.fixed === 'left'
            ? aLeft.push(val)
            : aRight.push(val)
          : '';

        !val.fixed ? aCenter.push(val) : '';
      });
      retData = [...aLeft, ...aCenter, ...aRight];
      retData.map((val, index) => {
        let _this = this;
        val.fixed
          ? (function() {
              val.style =
                val.fixed === 'left'
                  ? {
                      position: 'sticky',
                      left:
                        index !== 0 ? _this.gtLeftWt(index) : `${1 * toRem}px`,
                      ' background-color': 'lightblue',
                    }
                  : {
                      position: 'sticky',
                      right: `${1.5 * toRem}px`,
                      'border-left': '0.1px solid #ccc',
                    };
            })()
          : '';
      });
      return retData;
    },
  },
  methods: {
    gtLeftWt(index) {
      let ltWt = 0;
      this.colunm.some((val, index2) => {
        ltWt += val.width;
        if (index2 === index - 1) {
          return true;
        }
      });
      return `${(ltWt + 10 * index) * toRem}px`;
    },
    retStyle(item, type = true) {
      let retObj = type
        ? { 'text-align': item.align ? item.align : 'center' }
        : { width: `${item.width * toRem}px` };
      let stObj = {};
      stObj = item.style ? item.style : false;
      if (stObj) {
        if (type) {
          retObj = { ...retObj, ...stObj };
        } else {
          retObj = {
            ...retObj,
            ...stObj,
            ...{ 'z-index': 2, ' background-color': 'lightblue' },
          };
        }
      }
      return retObj;
    },
  },
};
</script>

<style lang="scss" scoped>
.JMtable {
  font-size: 0.3rem;
  background-color: #ccc;
  height: 3rem;
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
        top: 0.009rem;
      }
    }
  }
}
</style>
