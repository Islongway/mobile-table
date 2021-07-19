export const RenderScope = {
  functional: true,
  render: (h, { props }) => {
    const { customRender, scope } = props;
    const { colunm, title, index, index2 } = scope;
    if (typeof customRender === 'function') {
      return customRender(h, title, colunm, index, index2);
    }
    return <div>{title}</div>;
  },
};
//节流
export function throttle(func, wait) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}
//深拷贝
export function deepClone(obj) {
  var newobj = obj.constructor === Array ? [] : {};
  if (typeof obj !== 'object') {
    return;
  }
  for (var i in obj) {
    newobj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i];
  }
  return newobj;
}
