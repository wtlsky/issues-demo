import axios from 'axios'
import { toast, confirm, alert } from 'amis';
import copy from 'copy-to-clipboard';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTg5MDg2ODgsInBheWxvYWQiOiJ7XCJjb3JwaWRcIjpcInd3ZDA3NGYzOTY4ZjU2ZGNiMFwiLFwiaWRcIjo0NDU0OTk5MDAwNzQxNzYsXCJ1c2VySWRcIjpcImFkbWluX2JqanhcIixcImlzQWRtaW5cIjoxLFwiZGVwYXJ0bWVudElkc1wiOm51bGwsXCJtYW5hZ2VEZXB0c1wiOlwiW11cIixcImRldmljZVwiOlwid2ViXCIsXCJuYW1lXCI6XCJhZG1pblwiLFwidmFndWVcIjowLFwiX2xlYWRlclwiOnRydWV9IiwiZXhwIjoxNjU5MDgxNDg4fQ.37qpMThB_xZaNrctDsNhpnKTxS-M6VB8U4QLOlSsOEk'

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = token
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  const { data: { data, code, message } } = response
  const result = {}
  if (typeof data !== 'undefined') {
    Object.assign(result, {
      status: code,
      msg: message,
      data: data
    })
  } else {
    Object.assign(result, {
      status: 0,
      msg: 'ok',
      data: response.data
    })
  }

  response.data = result
  return response
}, function (error) {
  return Promise.reject(error)
})

export const env = {
  // 下面三个接口必须实现
  fetcher: ({
    url, // 接口地址
    method = 'get', // 请求方法 get、post、put、delete
    data, // 请求数据
    responseType,
    config, // 其他配置
    headers // 请求头
  }) => {
    config = config || {};
    config.withCredentials = true;
    responseType && (config.responseType = responseType);

    if (config.cancelExecutor) {
      config.cancelToken = new (axios).CancelToken(
        config.cancelExecutor
      );
    }

    config.headers = headers || {};

    if (method !== 'post' && method !== 'put' && method !== 'patch') {
      if (data) {
        config.params = data;
      }
      return (axios)[method](url, config);
    } else if (data && data instanceof FormData) {
      config.headers = config.headers || {};
      config.headers['Content-Type'] = 'multipart/form-data';
    } else if (
      data &&
      typeof data !== 'string' &&
      !(data instanceof Blob) &&
      !(data instanceof ArrayBuffer)
    ) {
      data = JSON.stringify(data);
      config.headers = config.headers || {};
      config.headers['Content-Type'] = 'application/json';
    }

    return (axios)[method](url, data, config);
  },
  isCancel: (value) => (axios).isCancel(value),
  copy: (content) => {
    copy(content)
    toast.success('内容已复制到粘贴板');
  },

  // 后面这些接口可以不用实现

  // 默认是地址跳转
  // jumpTo: (
  //   location: string /*目标地址*/,
  //   action: any /* action对象*/
  // ) => {
  //   // 用来实现页面跳转, actionType:link、url 都会进来。
  // },

  // updateLocation: (
  //   location: string /*目标地址*/,
  //   replace: boolean /*是replace，还是push？*/
  // ) => {
  //   // 地址替换，跟 jumpTo 类似
  // },

  // isCurrentUrl: (
  //   url: string /*url地址*/,
  // ) => {
  //   // 用来判断是否目标地址当前地址
  // },

  notify: (type = 'error', msg) => {
    toast[type]
      ? toast[type](msg, type === 'error' ? '系统错误' : '系统消息')
      : console.warn('[Notify]', type, msg);
  },
  alert,
  confirm,
};
