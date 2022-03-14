//执行捕获异常错误
export const asyncHandler = function (fn) {
  return function (...args) {
    Promise.resolve(fn(...args)).catch(args[2]);
  };
};
