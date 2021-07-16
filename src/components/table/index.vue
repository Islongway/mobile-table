<!--
 * @Description: JMtable
 * @Autor: islongwayzzm
 * @Date: 2021-07-15 14:39:56
 * @LastEditors: islongwayzzm
 * @LastEditTime: 2021-07-16 17:31:07
-->

<script>
import { RenderScope, throttle } from './renderScope.js';
/* 获取不同分辨率下跟750的比例 */
let toRem = ((document.documentElement.clientWidth / 100) * 13.3) / 100;

export default {
  name: 'JMtable',
  props: {
    colunm: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      toRem: toRem,
      allCheck: false,
      firstCheck: true,
      exist: {},
      zftable: this.tableData.map((val) => {
        val.checked = this.allCheck;
        return val;
      }),
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
    retTableData: {
      get() {
        return this.zftable || [];
      },
      set(val) {
        this.zftable = val;
      },
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
      return `${(ltWt + 10 * index) * this.toRem}px`;
    },
    retStyle(item, type = true) {
      let retObj = type
        ? { 'text-align': item.align ? item.align : 'center' }
        : { width: `${item.width * this.toRem}px` };
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
    retCheck(item, index) {
      //单选
      if (this.exist[index]) {
        this.zftable[index].checked = !item.checked;
      }
      this.retTableData = [...this.zftable];
      const allCheck = [];
      this.retTableData.forEach((val, index2) => {
        if (index2 === index) {
          if (!this.exist[index]) {
            !this.allCheck && !val.checked ? allCheck.push(val) : '';
          } else {
            val.checked ? allCheck.push(val) : '';
          }
          // console.log('dd', !this.exist[index] && !this.allCheck);
          // !(!this.exist[index] && this.allCheck) ? allCheck.push(val) : '';
        } else {
          val.checked ? allCheck.push(val) : '';
        }
      });
      this.exist[index] = true;
      console.log('rechekck', item, index, allCheck);
    },
    retAllCheck() {
      //全选;
      if (!this.firstCheck) {
        this.allCheck = !this.allCheck;
      }
      this.zftable.map((val) => {
        val.checked = this.firstCheck ? true : !this.retTableData;
        return val;
      });
      this.firstCheck = false;
      this.retTableData = [...this.zftable];
      const allCheck = [];
      this.retTableData.forEach((val) => {
        val.checked ? allCheck.push(val) : '';
      });
      console.log('all', allCheck);
    },
  },
  created() {
    function resizeRem() {
      toRem = ((document.documentElement.clientWidth / 100) * 13.3) / 100;
      this.toRem = toRem;
    }
    window.addEventListener('resize', throttle(resizeRem, 500));
  },
  render() {
    const _this = this;
    return (
      <div class={'JMtable'}>
        <form>
          <table
            width={'100%'}
            cellspacing={'1'}
            cellpadding={'2'}
            class={'JMtable-table'}
          >
            <tr class={'JMtable-table_tr'}>
              {_this.retColunm.map((item, index) => {
                return (
                  <th style={{ ..._this.retStyle(item, false) }} key={index}>
                    {item.dataIndex !== 'checkbox' ? (
                      item.title
                    ) : (
                      <label>
                        <input
                          type='checkbox'
                          checked={_this.allCheck}
                          onTouchstart={() => {
                            _this.retAllCheck();
                          }}
                        />
                      </label>
                    )}
                  </th>
                );
              })}
            </tr>
            {_this.retTableData.map((item, index) => {
              return (
                <tr class={'JMtable-table_tr'} key={index}>
                  <td style={_this.retStyle(_this.retColunm[0])}>
                    <label>
                      <input
                        type='checkbox'
                        checked={item.checked}
                        onTouchstart={() => {
                          _this.retCheck(item, index);
                        }}
                      />
                    </label>
                  </td>
                  {_this.retColunm.slice(1).map((item2, index2) => {
                    return (
                      <td
                        style={{ ..._this.retStyle(item2) }}
                        key={item2.dataIndex}
                      >
                        <RenderScope
                          props={{
                            scope: {
                              colunm: item,
                              title: item[item2.dataIndex] || '',
                              index: index,
                              index2: index2,
                            },
                            customRender: item2.customRender || false,
                          }}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </table>
        </form>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.JMtable {
  font-size: 0.3rem;
  background-color: #fff;
  height: 3rem;
  // border: 0.01rem solid rgb(107, 40, 240);
  width: 100%;
  overflow: auto;
  &-table {
    table-layout: fixed;
    background-color: #ccc;
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
