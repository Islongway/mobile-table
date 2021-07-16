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
