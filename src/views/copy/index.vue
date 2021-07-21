<!--
 * @Description: JMtable
 * @Autor: islongwayzzm
 * @Date: 2021-07-15 14:39:56
 * @LastEditors: islongwayzzm
 * @LastEditTime: 2021-07-19 15:02:00
-->

<script>
import { RenderScope, throttle, deepClone } from './renderScope.js';
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
    check: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: 'auto',
    },
  },
  data() {
    return {
      toRem: toRem,
      allCheck: false,
      firstCheck: true,
      exist: {},
      sliceTable: [],
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
      this.rlColunm.forEach((val) => {
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
      this.rlColunm.some((val, index2) => {
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
      this.retTableData[index].checked = !this.retTableData[index].checked;
      let selectData = [];
      selectData = this.retTableData.filter((val) => val.checked);
      this.$emit(
        'retCheck',
        this.retTableData[index].checked,
        selectData,
        index,
        item
      );
    },
    retAllCheck() {
      // 全选;
      if (!this.firstCheck) {
        this.allCheck = !this.allCheck;
      }
      this.zftable.map((val) => {
        val.checked = this.firstCheck ? true : !this.allCheck;
        return val;
      });
      this.firstCheck = false;
      this.retTableData = [...this.zftable];
      const allCheck = [];
      this.retTableData.forEach((val) => {
        val.checked ? allCheck.push(val) : '';
      });
      let selectData = [];
      if (!this.allCheck) {
        selectData = deepClone(this.retTableData);
        selectData.forEach((val) => delete val.checked);
      }
      this.$emit('retAllCheck', !this.allCheck, selectData);
    },
  },
  created() {
    this.rlColunm = this.check
      ? [
          {
            title: '多选框',
            dataIndex: 'checkbox',
            fixed: 'left',
            width: 50,
          },
        ].concat(this.colunm)
      : this.colunm;

    function resizeRem() {
      toRem = ((document.documentElement.clientWidth / 100) * 13.3) / 100;
      this.toRem = toRem;
    }
    window.addEventListener('resize', throttle(resizeRem, 500));
  },
  mounted() {
    const box = document.getElementsByClassName('JMtable')[0];
    let lastMax = 0;
    const rtlength = this.retTableData.length;
    const dpRetTable = deepClone(this.retTableData);
    this.sliceTable = dpRetTable.slice(0, rtlength > 20 ? 20 : rtlength - 1);
    console.log('dff', this.sliceTable);
    let maxTop = 0;
    box.addEventListener('scroll', (a) => {
      // console.log('ddd', a.target);
      // const { clientHeight, scrollHeight, scrollTop } = a.target;
      const { scrollTop } = a.target;
      if (maxTop <= scrollTop) {
        maxTop = scrollTop;
      }
      if (
        maxTop <= scrollTop &&
        this.sliceTable.length < rtlength &&
        scrollTop - lastMax >= 200
      ) {
        const stlength =
          this.sliceTable.length + 20 > rtlength
            ? rtlength - 1
            : this.sliceTable.length + 20;
        this.sliceTable = this.sliceTable.concat(
          dpRetTable.slice(this.sliceTable.length, stlength)
        );
        console.log('触发', this.sliceTable);
        lastMax = lastMax + 200;
      }
    });
  },
  render() {
    const _this = this;
    return (
      <div
        class={'JMtable'}
        style={{
          'font-size': `${30 * this.toRem}px`,
          width: this.width,
          height: this.height,
        }}
      >
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
                  <th
                    style={{
                      ..._this.retStyle(item, false),
                      ...{ top: `${0.8 * this.toRem}px` },
                    }}
                    key={index}
                  >
                    {item.dataIndex !== 'checkbox' ? (
                      item.title
                    ) : (
                      <label>
                        <input
                          type='checkbox'
                          checked={_this.allCheck}
                          onTouchstart={_this.retAllCheck.bind(_this)}
                        />
                      </label>
                    )}
                  </th>
                );
              })}
            </tr>
            {_this.sliceTable.map((item, index) => {
              return (
                <tr class={'JMtable-table_tr'} key={index}>
                  {this.check ? (
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
                  ) : (
                    ''
                  )}

                  {_this.retColunm
                    .slice(this.check ? 1 : 0)
                    .map((item2, index2) => {
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
  background-color: #fff;
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
      }
    }
  }
}
</style>
